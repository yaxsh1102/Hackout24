import React from "react";
import { useNavigate } from "react-router-dom";

const Hero: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div className="w-screen h-screen bg-[url('https://thumbs.wbm.im/pw/medium/e0a8bf2099861254af1dc34ac38f0934.avif')] bg-cover bg-opacity-30 flex justify-center font-sans overflow-x-hidden">
			<div className="w-full h-full flex items-center flex-col gap-y-8 justify-center text-white px-4 md:px-0 overflow-x-hidden">
				<p className="text-xl md:text-2xl text-center">
					Empowering Farmers, Growing the Future
				</p>

				<p className="text-xl md:text-4xl font-semibold text-center">
					"Bridging Agriculture and People."
				</p>

				<p className="text-xl md:text-5xl w-full md:w-[50rem] text-center">
					Empowering employees and farmers with tools for growth and
					collaboration
				</p>

				<div className="w-full flex justify-center gap-x-6 mt-4">
					<button className="w-[12rem] h-[3rem] bg-[#2d6930] text-lg font-semibold rounded-lg hover:bg-green-900 hover:border-2 hover:border-white transition-all duration-300">
						Get Started
					</button>
					<button
						className="w-[14rem] h-[3rem] bg-[#2d6930] font-semibold  text-lg rounded-lg hover:bg-green-900 hover:border-2 hover:border-white transition-all duration-300"
						onClick={() => navigate("/virtual-tour")}
					>
						Take A Virtual Tour
					</button>
				</div>
			</div>
		</div>
	);
};

export default Hero;
