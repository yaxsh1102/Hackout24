import React from "react";
import { farmerInputType } from "../pages/CreateProject";
import { useNavigate } from "react-router-dom";

const ProjectStrips = ({
	farmer,
	projectId,
}: {
	farmer: farmerInputType;
	projectId: string;
}) => {
	const navigate = useNavigate();

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
				{/* Placeholder for additional content, like an image or icon */}
				<span className="text-gray-600 text-lg">More Info</span>
			</div>
		</div>
	);
};

export default ProjectStrips;
