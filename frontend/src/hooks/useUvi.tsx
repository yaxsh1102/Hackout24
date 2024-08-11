import { useEffect, useState } from "react";
import axios from "axios";

export const useUvi = (polyID: string) => {
	const [uvIndex, setUvIndex] = useState<number>(0);
	const apiKey = import.meta.env.VITE_API_KEY;

	// Debugging: Log the API key to verify it's being loaded correctly
	console.log("Loaded API Key in useUvi:", apiKey);

	useEffect(() => {
		const fetchUvi = async () => {
			try {
				const response = await axios.get(
					`http://api.agromonitoring.com/agro/1.0/uvi?polyid=${polyID}&appid=${apiKey}`
				);

				// Log the response data for debugging
				console.log("UV Index data fetched:", response.data);

				// Update state with the fetched UV index
				setUvIndex(response.data.uvi);
			} catch (error) {
				// Log the error for debugging
				console.error("Error fetching UV index data:", error);
			}
		};

		// Fetch UV index data when polyID or apiKey changes
		fetchUvi();
	}, [polyID, apiKey]);

	return {
		uvIndex,
	};
};
