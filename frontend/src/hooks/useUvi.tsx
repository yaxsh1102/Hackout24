import { useEffect, useState } from "react";
import axios from "axios";

export const useUvi = (polyID: string) => {
	const [uvIndex, setUvIndex] = useState<number>(0);
	const apiKey = import.meta.env.VITE_API_KEY;

	useEffect(() => {
		const fetchUvi = async () => {
			try {
				const response = await axios.get(
					`http://api.agromonitoring.com/agro/1.0/uvi?polyid=${polyID}&appid=${apiKey}`
				);
				console.log("UV Index data:", response);
				setUvIndex(response.data.uvi);
			} catch (error) {
				console.error("Error fetching UV index data:", error);
			}
		};

		fetchUvi();
	}, [polyID, apiKey]); // Run effect when polyID or apiKey changes

	return {
		uvIndex,
	};
};
