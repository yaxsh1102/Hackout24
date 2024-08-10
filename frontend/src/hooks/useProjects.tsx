import axios from "axios";
import { useEffect, useState } from "react";
import { z } from "zod";

export const projectInput = z.object({
	id: z.string(),
	farmerId: z.string(),
	employeeId: z.string(),
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

export type projectInputType = z.infer<typeof projectInput>;

export const useProject = () => {
	const [projects, setProjects] = useState<projectInputType[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const BACKEND_URL = import.meta.env.VITE_DATABASE_URL;

	useEffect(() => {
		axios
			.get(`${BACKEND_URL}/api/v1/user/allProjects`, {
				headers: {
					Authorization: localStorage.getItem("token"),
				},
			})
			.then((response) => {
				setProjects(response.data);
				setLoading(false);
			});
	}, []);

	return {
		projects,
		loading,
	};
};
