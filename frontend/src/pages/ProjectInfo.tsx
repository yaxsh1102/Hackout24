import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { useContext, useEffect, useState } from "react";
import { AppContext, Context } from "../context/AppContext";
import { Card, CardHeader } from "@nextui-org/card";
import {
	FaTemperatureHigh,
	FaTint,
	FaSun,
	FaCloud,
	FaTachometerAlt,
	FaWater,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Spinner } from "@nextui-org/react"; // Import Spinner component from NextUI

// Define the type for the tips object
interface TipsObject {
	[key: string]: string[];
}

const ProjectInfo: React.FC = () => {
	const [generatedText, setGeneratedText] = useState<string>("");
	const [array, setArray] = useState<string[]>();
	const [dataLoaded, setDataLoaded] = useState<boolean>(false); // Added state to track data load
	const [loading, setLoading] = useState<boolean>(false); // State for loading indicator

	const { uvi, soilData, weatherData } = useContext(AppContext) as Context;
	const genAI = new GoogleGenerativeAI(
		"AIzaSyCNsQkeai39OfYFfMRYaaAWEmwHyhDrb5Q"
	);

	const run = async () => {
		const model = genAI.getGenerativeModel({ model: "gemini-pro" });

		const prompt = `Given the following data:
- The temperature within 10cm of my soil is ${soilData.t10}°C.
- The moisture content of the soil is ${soilData.moisture}%.
- The overall temperature of my region is ${soilData.t0}°C.
- The ultraviolet (UV) rays affecting the crops are ${uvi}.
- The weather group for the past few days is ${weatherData.wgroup} and the description is ${weatherData.description}.
- The atmospheric temperature is ${weatherData.atmtemp}°C.
- The atmospheric pressure is ${weatherData.pressure} hPa.
- The humidity is ${weatherData.humidity}%.

As an agricultural expert, provide actionable recommendations to enhance crop productivity based on this data. Structure your response in JSON format with the following requirements:
1. **JSON Structure**: The JSON object should have at least 10 distinct fields, each representing an area for improvement. Each field should contain exactly 3 points.
2. **Formatting**: Ensure that the JSON response is a single JSON object with at least 10 distinct fields.
3. **Detailing**: Include scientific reasons and logical explanations for each recommendation.

Example of expected JSON format:
{
  "Field1": ["Tip1", "Tip2", "Tip3"],
  "Field2": ["Tip1", "Tip2", "Tip3"],
  ...
}

The output should help in identifying precise actions to take for improving crop productivity based on the provided data.
`;

		try {
			setLoading(true); // Set loading to true when starting data fetch
			const result = await model.generateContent(prompt);
			const response = await result.response;
			const text = await response.text();
			setGeneratedText(text);
			setDataLoaded(true); // Set dataLoaded to true once data is processed
			setLoading(false); // Set loading to false once data is fetched
		} catch (error) {
			console.error("Error:", error);
			setLoading(false); // Ensure loading is set to false on error
		}
	};

	useEffect(() => {
		if (!dataLoaded) {
			// Only run if data is not already loaded
			run();
		}

		if (generatedText) {
			console.log(generatedText);

			// Remove extraneous characters before and after the JSON object
			const cleanedText = generatedText.replace(/^```json\s*|\s*```$/g, "");

			try {
				const jsonData = JSON.parse(cleanedText);
				const formattedArray = Object.entries(jsonData).map(([key, tips]) =>
					JSON.stringify({ [key]: tips })
				);
				setArray(formattedArray);
			} catch (error) {
				console.error("JSON Parsing Error:", error);
			}
		}
	}, [generatedText, dataLoaded]);

	return (
		<div className="text-black flex flex-col overflow-x-hidden mx-3">
			<Navbar />
			<h1 className="text-3xl font-bold mb-24 text-center">Status</h1>

			<div className="flex flex-wrap justify-center gap-6">
				{/* Soil 10cm Temperature */}
				<Card className="shadow-lg rounded-lg hover:shadow-xl transition-shadow p-6 bg-gray-800 text-white w-64 flex flex-col items-center">
					<h2 className="text-lg font-semibold">Soil 10cm Temperature</h2>
					<CardHeader className="text-center">
						<FaTemperatureHigh className="text-5xl mb-2 text-red-500 mx-auto" />
					</CardHeader>
					<p className="text-xl font-bold text-blue-400 mt-4 text-center">
						{soilData.t10}°C
					</p>
				</Card>

				{/* Soil Moisture */}
				<Card className="shadow-lg rounded-lg hover:shadow-xl transition-shadow p-6 bg-gray-800 text-white w-64 flex flex-col items-center">
					<h2 className="text-lg font-semibold">Soil Moisture</h2>
					<CardHeader className="text-center">
						<FaTint className="text-5xl mb-2 text-blue-500 mx-auto" />
					</CardHeader>
					<p className="text-xl font-bold text-blue-400 mt-4 text-center">
						{soilData.moisture}%
					</p>
				</Card>

				{/* UV Rays */}
				<Card className="shadow-lg rounded-lg hover:shadow-xl transition-shadow p-6 bg-gray-800 text-white w-64 flex flex-col items-center">
					<h2 className="text-lg font-semibold">UV Rays</h2>
					<CardHeader className="text-center">
						<FaSun className="text-5xl mb-2 text-yellow-500 mx-auto" />
					</CardHeader>
					<p className="text-xl font-bold text-blue-400 mt-4 text-center">
						{uvi}
					</p>
				</Card>

				{/* Weather Group */}
				<Card className="shadow-lg rounded-lg hover:shadow-xl transition-shadow p-6 bg-gray-800 text-white w-64 flex flex-col items-center">
					<h2 className="text-lg font-semibold">Weather Group</h2>
					<CardHeader className="text-center">
						<FaCloud className="text-5xl mb-2 text-gray-500 mx-auto" />
					</CardHeader>
					<p className="text-xl font-bold text-blue-400 mt-4 text-center">
						{weatherData.wgroup}
					</p>
				</Card>

				{/* Weather Pressure */}
				<Card className="shadow-lg rounded-lg hover:shadow-xl transition-shadow p-6 bg-gray-800 text-white w-64 flex flex-col items-center">
					<h2 className="text-lg font-semibold">Weather Pressure</h2>
					<CardHeader className="text-center">
						<FaTachometerAlt className="text-5xl mb-2 text-green-500 mx-auto" />
					</CardHeader>
					<p className="text-xl font-bold text-blue-400 mt-4 text-center">
						{weatherData.pressure}hPa
					</p>
				</Card>

				{/* Weather Humidity */}
				<Card className="shadow-lg rounded-lg hover:shadow-xl transition-shadow p-6 bg-gray-800 text-white w-64 flex flex-col items-center">
					<h2 className="text-lg font-semibold">Weather Humidity</h2>
					<CardHeader className="text-center">
						<FaWater className="text-5xl mb-2 text-cyan-500 mx-auto" />
					</CardHeader>
					<p className="text-xl font-bold text-blue-400 mt-4 text-center">
						{weatherData.humidity}%
					</p>
				</Card>

				{/* Weather Temperature */}
				<Card className="shadow-lg rounded-lg hover:shadow-xl transition-shadow p-6 bg-gray-800 text-white w-64 flex flex-col items-center">
					<h2 className="text-lg font-semibold">Weather Temperature</h2>
					<CardHeader className="text-center">
						<FaTemperatureHigh className="text-5xl mb-2 text-red-500 mx-auto" />
					</CardHeader>
					<p className="text-xl font-bold text-blue-400 mt-4 text-center">
						{weatherData.atmtemp}°C
					</p>
				</Card>
			</div>

			<div className="mt-8">
				<h2 className="text-2xl font-bold mb-4 text-center">
					Tips To Improve Your Farming
				</h2>

				{loading ? (
					<div className="flex justify-center items-center h-32">
						<Spinner />
						<p className="ml-4 text-lg">Fetching tips, please wait...</p>
					</div>
				) : (
					<div>
						{array?.map((val, index) => {
							const obj: TipsObject = JSON.parse(val);
							return (
								<div
									key={index}
									className="mb-4 p-4 bg-green-100 border border-green-300 rounded-lg shadow-md"
								>
									<h3 className="text-xl font-semibold mb-2">Tips</h3>
									<ul className="list-disc pl-5">
										{Object.entries(obj).map(([key, tips], i) => (
											<li key={i} className="mb-2">
												<strong>{key}:</strong>
												<ul className="list-disc pl-5">
													{tips.map((tip, j) => (
														<li key={j}>{tip}</li>
													))}
												</ul>
											</li>
										))}
									</ul>
								</div>
							);
						})}
					</div>
				)}
			</div>

			<Footer />
		</div>
	);
};

export default ProjectInfo;
