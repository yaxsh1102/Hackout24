import { useEffect, useState } from "react";
import axios from "axios";

export const useSoil = (polyID: string) => {
	const [t10, setT10] = useState(0);
	const [moisture, setMoisture] = useState(0);
	const [t0, setT0] = useState(0);
	const apiKey = import.meta.env.VITE_API_KEY;

	// Debugging: Log the API key to verify it's being loaded correctly
	console.log("Loaded API Key in useSoil:", apiKey);

	useEffect(() => {
		const fetchSoilData = async () => {
			try {
				const response = await axios.get(
					`http://api.agromonitoring.com/agro/1.0/soil?polyid=${polyID}&appid=${apiKey}`,
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				// Log the response data for debugging
				console.log("Soil data fetched:", response.data);

				// Update state with fetched data
				setT10(response.data.t10);
				setMoisture(response.data.moisture);
				setT0(response.data.t0);
			} catch (error) {
				// Log the error for debugging
				console.error("Error fetching soil data:", error);
			}
		};

		// Fetch soil data when polyID or apiKey changes
		fetchSoilData();
	}, [polyID, apiKey]);

	return {
		t10,
		moisture,
		t0,
	};
};
