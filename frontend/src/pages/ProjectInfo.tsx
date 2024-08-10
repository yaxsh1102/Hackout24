import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { usePoly } from "../hooks/usePoly";
import { useUvi } from "../hooks/useUvi";
import { useSoil } from "../hooks/useSoil";
import { useWeather } from "../hooks/useWeather";

const ProjectInfo: React.FC = () => {
	const [generatedText, setGeneratedText] = useState<string>("");

	const { projectId } = useParams();
	const genAI = new GoogleGenerativeAI(
		"AIzaSyCNsQkeai39OfYFfMRYaaAWEmwHyhDrb5Q"
	);

	const run = async () => {
		// For text-only input, use the gemini-pro model
		const model = genAI.getGenerativeModel({ model: "gemini-pro" });

		const prompt = `hi gemeini ai how are you`;

		try {
			const result = await model.generateContent(prompt);
			const response = await result.response;
			const text = await response.text();
			setGeneratedText(text);
			console.log(text);
		} catch (error) {
			console.error("Error:", error);
		}
	};

	// run();
	const [poly, setpoly] = useState<string>("");
	const [uvIndex, setUvIndex] = useState<number>(0);
	const [soil, setSoil] = useState({
		t10: 0,
		moisture: 0,
		t0: 0,
	});
	const [weather, setWeather] = useState({
		wgroup: "",
		description: "",
		atmtemp: 0,
		pressure: 0,
		humidity: 0,
	});
	if (projectId) {
		const polyId = usePoly(projectId);
		setpoly(polyId.id);
	}
	if (poly) {
		const uviData = useUvi(poly);
		if (uviData) {
			setUvIndex(uviData.uvIndex);
		}
		const soilData = useSoil(poly);
		if (soilData) {
			setSoil(soil);
		}
		const weatherData = useWeather(poly);
		if (weatherData) {
			setWeather(weatherData);
		}
	}

	return <div className=" text-black">{projectId}</div>;
};

export default ProjectInfo;
