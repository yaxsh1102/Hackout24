import { useEffect, useState } from "react";
import axios from "axios";

export const useWeather = (coordinates: string) => {
	const headers = {
		"Content-Type": "application/json",
	};

	// Parse the latitude and longitude from the coordinates string
	const coords = coordinates.split(",");
	const lat = parseFloat(coords[1]);
	const lon = parseFloat(coords[0]);

	// Define state variables for weather data
	const [wgroup, setWgroup] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [atmtemp, setAtmtemp] = useState<number>(0);
	const [pressure, setPressure] = useState<number>(0);
	const [humidity, setHumidity] = useState<number>(0);
	const apiKey = import.meta.env.VITE_API_KEY;

	// Debugging: Log the API key to verify it's being loaded correctly
	console.log("Loaded API Key in useWeather:", apiKey);

	useEffect(() => {
		const fetchWeather = async () => {
			try {
				// Make an API request to fetch weather data
				const response = await axios.get(
					`https://api.agromonitoring.com/agro/1.0/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`,
					{
						headers: headers,
					}
				);

				// Log the response data for debugging
				console.log("Weather data fetched:", response.data);

				// Update state with the fetched weather data
				setWgroup(response.data.weather[0].main);
				setDescription(response.data.weather[0].description);
				setAtmtemp(response.data.main.temp);
				setPressure(response.data.main.pressure);
				setHumidity(response.data.main.humidity);
			} catch (error) {
				// Log the error for debugging
				console.error("Error fetching weather data:", error);
			}
		};

		// Fetch weather data when the component mounts or the API key changes
		fetchWeather();
	}, [apiKey, lat, lon]);

	return {
		wgroup,
		description,
		atmtemp,
		pressure,
		humidity,
	};
};
