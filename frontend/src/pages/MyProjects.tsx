import React, { useEffect, useState } from "react";
import { useProject } from "../hooks/useProjects";
import ProjectStrips from "../components/ProjectStrips";
import Loading from "../components/Loading";
import { useFarmer } from "../hooks/useFarmer";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const MyProjects: React.FC = () => {
	const { farmer, loading: farmerLoading } = useFarmer();
	const { projects, loading: projectsLoading } = useProject();

	const navigate = useNavigate();

	// State to hold the first 3 farmers
	const [limitedFarmers, setLimitedFarmers] = useState(farmer.slice(0, 1));

	useEffect(() => {
		if (farmer.length > 0) {
			setLimitedFarmers(farmer.slice(0, 1));
		}
	}, [farmer]);

	// Combined loading state to handle both farmer and projects loading
	const loading = farmerLoading || projectsLoading;

	return (
		<div className="flex flex-col overflow-x-hidden min-h-screen">
			<Navbar />
			<div className="flex-1 bg-gray-100 p-6 mt-20">
				<div className="bg-green-600 text-white p-4 rounded-lg shadow-md mb-6 text-center">
					<h1 className="text-3xl font-bold">Projects</h1>
				</div>
				{loading ? (
					<Loading />
				) : (
					<div className="flex flex-col space-y-4">
						{projects.length > 0 && limitedFarmers ? (
							projects.map((project, index) => {
								const projectFarmer = limitedFarmers.find(
									(f) => f.id === project.farmerId
								);
								return projectFarmer ? (
									<ProjectStrips
										key={index}
										projectId={project.id}
										farmer={projectFarmer}
									/>
								) : null;
							})
						) : (
							<p className="text-center text-gray-700">
								No projects available.
							</p>
						)}
					</div>
				)}
			</div>
			<button
				onClick={() => navigate("/create-project")}
				className="fixed bottom-6 left-6 bg-green-600 text-white py-3 px-6 rounded-full shadow-lg hover:bg-green-700 transition-colors"
			>
				Add A Farmer
			</button>
			<Footer />
		</div>
	);
};

export default MyProjects;
