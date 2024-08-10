import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { verify } from "hono/jwt";
import { z } from "zod";

export const signUpInput = z.object({
	name: z.string().min(1, { message: "Name cannot be empty" }),
	email: z.string().email({ message: "Invalid email type" }),
	password: z
		.string()
		.min(8, { message: "Password should atleast be of 8 characters" }),
	age: z.string().refine(
		(val) => {
			const age = Number(val);
			return age >= 18;
		},
		{ message: "Age should be at least 18" }
	),
	area: z.string().min(1, { message: "Area Cannot be empty" }),
	city: z.string().min(1, { message: "City Cannot be empty" }),
	state: z.string().min(1, { message: "State Cannot be empty" }),
	country: z.string().min(1, { message: "Country Cannot be empty" }),
});

export type signUpType = z.infer<typeof signUpInput>;

export const signInInput = z.object({
	email: z.string().email({ message: "Invalid email type" }),
	password: z
		.string()
		.min(8, { message: "Password should atleast be of 8 characters" }),
});

export type signInType = z.infer<typeof signInInput>;

export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
	Variables: {
		userId: string;
	};
}>();

userRouter.post("/signup", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
	const body = await c.req.json();
	const result = signUpInput.safeParse(body);

	if (result.success) {
		try {
			try {
				const user = await prisma.employee.findUnique({
					where: {
						email: body.email,
					},
				});
				if (user) {
					return c.json({
						status: 403,
						message: "This email is already in use, please login",
					});
				}
			} catch (error) {}
			const user = await prisma.employee.create({
				data: {
					name: body.name,
					email: body.email,
					password: body.password,
					age: body.age,
					area: body.area,
					city: body.city,
					state: body.state,
					country: body.country,
				},
			});
			const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
			return c.json({
				jwt: jwt,
			});
		} catch (error) {
			console.log(error);
			return c.json({
				error: error,
				message: "error while creating userrrrr",
			});
		}
	} else {
		return c.json({
			status: 406,
			message: result.error.issues[0].message,
		});
	}
});

userRouter.post("/signin", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const body = await c.req.json();
		const result = signInInput.safeParse(body);

		if (!result.success) {
			return c.json({
				status: 406,
				message: result.error.issues[0].message,
			});
		}

		const user = await prisma.employee.findUnique({
			where: {
				email: body.email,
			},
		});

		if (!user) {
			return c.json({
				status: 401,
				message: "Invalid email, please signUp if you haven't",
			});
		}

		if (!(body.password == user.password)) {
			return c.json({
				status: 401,
				message: "Invalid password",
			});
		}

		const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.json({
			name: user.name,
			jwt: jwt,
		});
	} catch (error) {
		return c.json({
			status: 500,
			message: "Internal server error",
			error: error,
		});
	}
});

userRouter.get("/getUser", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const authHeader = c.req.header("Authorization");
	if (!authHeader) {
		return c.json({
			message: null,
		});
	}
	const user = await verify(authHeader, c.env.JWT_SECRET);
	c.set("userId", "" + user.id);
	try {
		const res = await prisma.employee.findUnique({
			where: {
				id: c.get("userId"),
			},
		});
		if (res) {
			const data = res;
			return c.json(data);
		} else {
			return c.json({
				message: null,
			});
		}
	} catch (error) {
		c.json({
			message: null,
		});
	}
});
