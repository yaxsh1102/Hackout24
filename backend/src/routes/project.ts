import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge";
import { sign } from "hono/jwt";
import { verify } from "hono/jwt";
import { z } from "zod";

export const projectInput = z.object({
	temperature10: z.string().optional(),
	moisture: z.string().optional(),
	temperature: z.string().optional(),
	ultravioletIndex: z.string().optional(),
	weatherGroup: z.string().optional(),
	weatherDescription: z.string().optional(),
	atmosphericTemprature: z.string().optional(),
	pressure: z.string().optional(),
	humidity: z.string().optional(),
	cloudiness: z.string().optional(),
	rainVolume3hrs: z.string().optional(),
	snowVolume3hrs: z.string().optional(),
});

export const projectRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
	Variables: {
		userId: string;
	};
}>();

projectRouter.post("/createProject", async (c) => {
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

	const result = projectInput.safeParse(body);
	if (result.success) {
		try {
			const project = await prisma.project.create({
				data: {
					employeeId: c.get("userId"),
					farmerId: body.farmerId,
				},
			});
			c.status(200);
			return c.json({
				project: project,
				message: "Project created successfully",
			});
		} catch (error) {
			console.log(error);
			c.status(500);
			return c.json({
				error: error,
				message: "error while creating project",
			});
		}
	} else {
		return c.json({
			status: 406,
			message: result.error.issues[0].message,
		});
	}
});
