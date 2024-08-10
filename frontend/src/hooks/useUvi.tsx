import { useEffect, useState } from "react";
import axios from "axios";

export const useUvi = (polyID: string) => {
	const headers = {
		"Content-Type": "application/json",
	};
	const [uvIndex, setUvIndex] = useState(0);
	const apiKey = import.meta.env.VITE_API_KEY;
	useEffect(() => {
		axios
			.get(
				`http://api.agromonitoring.com/agro/1.0/uvi?polyid=${polyID}&appid=${apiKey}`,
				{
					headers: headers,
				}
			)
			.then((response) => {
				console.log("in uvindex");
				console.log(response);
				setUvIndex(response.data.uvi);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	return {
		uvIndex,
	};
};
