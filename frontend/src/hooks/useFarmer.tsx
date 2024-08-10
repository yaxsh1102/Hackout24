import axios from "axios";
import { useEffect, useState } from "react";
import { z } from "zod";

export const farmerInput = z.object({
	id: z.string(),
	employeeId: z.string(),
	name: z.string().min(1, { message: "Name should not be empty" }),
	area: z.string().min(1, { message: "Area cannot be empty" }),
	city: z.string().min(1, { message: "City cannot be empty" }),
	state: z.string().min(1, { message: "State cannot be empty" }),
	number: z.string().regex(/^\d{10,}$/, {
		message: "Number should be at least 10 digits long",
	}),
	location: z.string().regex(/^-?\d+(\.\d+)?(,-?\d+(\.\d+)?){9}$/, {
		message: "String must contain exactly 10 numbers separated by commas",
	}),
});

export type farmerInputType = z.infer<typeof farmerInput>;

export const useFarmer = () => {
	const [farmer, setFarmer] = useState<farmerInputType[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const BACKEND_URL = import.meta.env.VITE_DATABASE_URL;

	useEffect(() => {
		axios
			.get(`${BACKEND_URL}/api/v1/farmer/getFarmers`, {
				headers: {
					Authorization: localStorage.getItem("token"),
				},
			})
			.then((response) => {
				setLoading(false);
				setFarmer(response.data.farmer);
			})
			.catch((error) => {
				setLoading(false);
				console.error("Error fetching farmer data:", error);
			});
	}, []);

	return {
		farmer,
		loading,
	};
};
