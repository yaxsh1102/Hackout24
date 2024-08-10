import React from "react";
import { useParams } from "react-router-dom";

const ProjectInfo: React.FC = () => {
	const { projectId } = useParams();

	return <div className=" text-black">{projectId}</div>;
};

export default ProjectInfo;
