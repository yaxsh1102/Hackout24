import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { farmerInputType } from "../hooks/useFarmer";
import { usePoly } from "../hooks/usePoly";
import { useUvi } from "../hooks/useUvi";
import { useSoil } from "../hooks/useSoil";
import { useWeather } from "../hooks/useWeather";
import { AppContext, Context } from "../context/AppContext";

const ProjectStrips = ({
	farmer,
	projectId,
}: {
	farmer: farmerInputType;
	projectId: string;
}) => {
	const navigate = useNavigate();
	const { uvi, setUvi, soilData, setSoilData, weatherData, setWeatherData } =
		useContext(AppContext) as Context;
	const [polygonId, setPolygonId] = useState<string>("");

	const polyId = usePoly(farmer.location);

	useEffect(() => {
		if (polyId) {
			setPolygonId(polyId.id);
		}
	}, [polyId]);

	if (polygonId == undefined) {
		return <div>Loading...</div>;
	}
	console.log("the poy id ", polygonId);
	const { uvIndex } = useUvi(polygonId + "");
	const { t10, moisture, t0 } = useSoil(polygonId + "");
	const { wgroup, description, atmtemp, pressure, humidity } = useWeather(
		farmer.location
	);

	useEffect(() => {
		console.log("in strips");
		console.log("uvi");
		console.log(uvi);
		console.log("soil data");
		console.log(soilData);
		console.log("weather data");
		console.log(weatherData);
		setSoilData({ t10, moisture, t0 });
		setUvi(uvIndex);
		setWeatherData({ wgroup, description, atmtemp, pressure, humidity });
	}, [
		t10,
		moisture,
		t0,
		uvIndex,
		wgroup,
		description,
		atmtemp,
		pressure,
		humidity,
	]);

	return (
		<div className="w-full mb-4 p-4 bg-white border border-yellow-300 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-between">
			<div className="flex-1 space-y-3">
				<h1 className="text-2xl font-bold text-green-800">
					{farmer?.name || "No Name Available"}
				</h1>
				<p className="text-gray-800 text-lg">
					<strong>Area:</strong> {farmer?.area || "No Area Available"}
				</p>
				<p className="text-gray-800 text-lg">
					<strong>City:</strong> {farmer?.city || "No City Available"}
				</p>
				<p className="text-gray-800 text-lg">
					<strong>State:</strong> {farmer?.state || "No State Available"}
				</p>
				<p className="text-gray-800 text-lg">
					<strong>Contact:</strong> {farmer?.number || "No Number Available"}
				</p>
			</div>
			<div
				className="w-1/4 h-20 bg-yellow-200 rounded-lg flex items-center justify-center hover:cursor-pointer hover:scale-105 hover:bg-yellow-400 transition-all duration-75"
				onClick={() => navigate(`/myprojects/${projectId}`)}
			>
				<span className="text-gray-600 text-lg">More Info</span>
			</div>
		</div>
	);
};

export default ProjectStrips;
