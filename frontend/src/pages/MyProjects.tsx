import React from "react";
import { useProject } from "../hooks/useProjects";
import ProjectStrips from "../components/ProjectStrips";
import Loading from "../components/Loading";
import { useFarmer } from "../hooks/useFarmer";
import Navbar from "../components/Navbar";

const MyProjects: React.FC = () => {
	const { farmer } = useFarmer();
	const { projects, loading } = useProject();

	return (
		<div className="flex flex-col overflow-x-hidden ">
			<Navbar />
			<div className="min-h-screen bg-gray-100 p-6 mt-20">
				<div className="bg-green-600 text-white p-4 rounded-lg shadow-md mb-6 text-center">
					<h1 className="text-3xl font-bold">Projects</h1>
				</div>
				{loading ? (
					<Loading />
				) : (
					<div className="flex flex-col space-y-4">
						{projects.length > 0 ? (
							projects.map((project, index) => (
								<ProjectStrips
									key={index}
									projectId={project.id}
									farmer={farmer[index]}
								/>
							))
						) : (
							<p className="text-center text-gray-700">
								No projects available.
							</p>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default MyProjects;
