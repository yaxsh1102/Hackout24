import { useEffect, useState } from "react";
import axios from "axios";

export const usePoly = (coordinates: string) => {
	const [id, setId] = useState("");
	const apiKey = import.meta.env.VITE_API_KEY;
	const coords = coordinates.split(",");
	const lat = [
		parseFloat(coords[1]),
		parseFloat(coords[3]),
		parseFloat(coords[5]),
		parseFloat(coords[7]),
		parseFloat(coords[9]),
	];
	const lon = [
		parseFloat(coords[0]),
		parseFloat(coords[2]),
		parseFloat(coords[4]),
		parseFloat(coords[6]),
		parseFloat(coords[8]),
	];
	const headers = {
		"Content-Type": "application/json",
	};
	const body = {
		name: "Polygon Sample",
		geo_json: {
			type: "Feature",
			properties: {},
			geometry: {
				type: "Polygon",
				coordinates: [
					[
						[lat[0], lon[0]],
						[lat[1], lon[1]],
						[lat[2], lon[2]],
						[lat[3], lon[3]],
						[lat[4], lon[4]],
					],
				],
			},
		},
	};

	useEffect(() => {
		axios
			.post(
				`http://api.agromonitoring.com/agro/1.0/polygons?appid=${apiKey}&duplicated=true`,
				body,
				{
					headers: headers,
				}
			)
			.then((response) => {
				setId(response.data.id);
				console.log(response.data.id);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	return {
		id,
	};
};
