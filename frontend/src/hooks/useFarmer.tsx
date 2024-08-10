import axios from "axios";
import { useEffect, useState } from "react";
import { farmerInputType } from "../pages/CreateProject";

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
