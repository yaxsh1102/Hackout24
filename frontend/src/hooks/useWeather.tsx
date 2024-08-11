import { useEffect, useState } from "react";
import axios from "axios";

export const useWeather = (coordinates: string) => {
	const headers = {
		"Content-Type": "application/json",
	};
	const coords = coordinates.split(",");
	const lat = parseFloat(coords[1]); // Use parseFloat for latitude and longitude
	const lon = parseFloat(coords[0]); // Use parseFloat for latitude and longitude
	const [wgroup, setWgroup] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [atmtemp, setAtmtemp] = useState<number>(0);
	const [pressure, setPressure] = useState<number>(0);
	const [humidity, setHumidity] = useState<number>(0);
	const apiKey = import.meta.env.VITE_API_KEY;

	useEffect(() => {
		const fetchWeather = async () => {
			try {
				const response = await axios.get(
					`https://api.agromonitoring.com/agro/1.0/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`,
					{
						headers: headers,
					}
				);
				console.log("Weather data:", response.data);
				setWgroup(response.data.weather[0].main);
				setDescription(response.data.weather[0].description);
				setAtmtemp(response.data.main.temp);
				setPressure(response.data.main.pressure);
				setHumidity(response.data.main.humidity);
			} catch (error) {
				console.log("Error fetching weather data:", error);
			}
		};

		fetchWeather();
	}, [apiKey]);

	return {
		wgroup,
		description,
		atmtemp,
		pressure,
		humidity,
	};
};
