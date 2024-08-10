import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge";
import { sign } from "hono/jwt";
import { verify } from "hono/jwt";
import { number, z } from "zod";

export const farmerInput = z.object({
	name: z.string().min(1, { message: "Name should not be empty" }),
	area: z.string().min(1, { message: "area cannot be empty" }),
	city: z.string().min(1, { message: "city cannot be empty" }),
	state: z.string().min(1, { message: "state cannot be empty" }),
	number: z.string().regex(/^\d{10,}$/, {
		message: "Number should be at least 10 digits long",
	}),
	location: z.string().regex(/^-?\d+(\.\d+)?(,-?\d+(\.\d+)?){9}$/, {
		message: "String must contain exactly 10 numbers separated by commas",
	}),
});

export const farmerRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
	Variables: {
		userId: string;
	};
}>();

farmerRouter.post("/createFarmer", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
	const body = await c.req.json();

	const authHeader = c.req.header("Authorization");
	if (!authHeader) {
		return c.json({
			message: null,
		});
	}
	const user = await verify(authHeader, c.env.JWT_SECRET);
	c.set("userId", "" + user.id);

	const result = farmerInput.safeParse(body);
	if (result.success) {
		try {
			const farmer = await prisma.farmer.create({
				data: {
					employeeId: c.get("userId"),
					name: body.name,
					area: body.area,
					city: body.city,
					state: body.state,
					number: body.number,
					location: body.location,
				},
			});
			c.status(200);
			return c.json({
				farmer: farmer,
				message: "Farmer created successfully",
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
