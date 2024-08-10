import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const VirtualTour: React.FC = () => {
	return (
		<div className="flex flex-col overflow-x-hidden ">
			<Navbar />
			<div className="w-full space-y-28 flex flex-col items-center justify-center mt-28">
				<div className="text-3xl font-bold w-1/2 text-center">
					Why AgroQuality? Master your finances, unlock opportunity
				</div>

				<div className="flex flex-wrap w-11/12 gap-5 items-start justify-evenly">
					{[
						{
							title: "Intuitive Interface",
							description:
								"The AgroQuality website offers a user-friendly interface, making it easy for freelancers to navigate and access the platform's comprehensive features.",
						},
						{
							title: "Comprehensive Assessments",
							description:
								"Freelancers can input detailed information about their client's farm details, and the platform provides thorough assessments of their farm's quality, productivity, and sustainability.",
						},
						{
							title: "Personalized Recommendations",
							description:
								"Based on the assessment results, AgroQuality offers customized recommendations to help farmers improve their practices and maximize their farm's potential.",
						},
						{
							title: "Efficiency",
							description:
								"AgroQuality streamlines farm quality assessments and service creating processes, saving farmers and freelancers valuable time and resources.",
						},
						{
							title: "Precision",
							description:
								"The platform's advanced analytics and data-driven insights enable freelancers to provide guidance to farmers so that they can make informed decisions and optimize their operations.",
						},
						{
							title: "Sustainability",
							description:
								"By promoting best practices and creating employment opportunities, AgroQuality contributes to the long-term sustainability of the agricultural sector.",
						},
					].map((item, index) => (
						<div
							key={index}
							className="w-[300px] h-[200px] flex flex-col items-start space-y-2"
						>
							<div className="flex items-center space-x-3">
								<div className="bg-[#036a38] rounded-full p-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										version="1.1"
										width="50"
										height="50"
										viewBox="0 0 256 256"
									>
										<g
											style={{
												stroke: "none",
												strokeWidth: 0,
												fill: "none",
												opacity: 1,
											}}
											transform="translate(1.4066 1.4066) scale(2.5 2.5)"
										>
											<path
												d="M 10.487 79.1 H 0 V 51.537 h 10.487 c 1.849 0 3.348 1.499 3.348 3.348 v 20.868 C 13.835 77.601 12.336 79.1 10.487 79.1 z"
												style={{
													stroke: "none",
													fill: "white",
													opacity: 1,
												}}
												transform="matrix(1 0 0 1 0 0)"
												strokeLinecap="round"
											/>
											<path
												d="M 51.875 41.91 c -0.553 0 -1 -0.448 -1 -1 V 23.95 c 0 -0.552 0.447 -1 1 -1 s 1 0.448 1 1 V 40.91 C 52.875 41.462 52.428 41.91 51.875 41.91 z"
												style={{
													stroke: "none",
													fill: "white",
													opacity: 1,
												}}
												transform="matrix(1 0 0 1 0 0)"
												strokeLinecap="round"
											/>
											<path
												d="M 76.094 59.139 c 0 9.119 -11.792 14.793 -24.219 14.793 s -24.219 -5.674 -24.219 -14.793 S 39.448 40.91 51.875 40.91 S 76.094 50.02 76.094 59.139 z"
												style={{
													stroke: "none",
													fill: "white",
													opacity: 1,
												}}
												transform="matrix(1 0 0 1 0 0)"
												strokeLinecap="round"
											/>
											<path
												d="M 89.809 59.305 c -0.644 -2.104 -2.75 -3.396 -4.916 -3.011 c -6.489 1.155 -14.337 3.556 -21.743 5.298 c -0.037 -0.019 -0.074 -0.038 -0.111 -0.057 c -0.416 -4.181 -3.861 -7.418 -8.069 -7.56 l -1.923 -0.065 c -6.278 0 -13.109 -4.564 -18.921 -4.564 c -5.109 0 -10.042 1.11 -15.472 5.854 c -0.687 0.6 -1.57 0.94 -2.482 0.933 l -2.337 -0.107 v 18.019 h 5.947 c 1.725 0 3.445 0.189 5.129 0.565 l 14.729 3.284 c 1.33 0.297 2.69 0.436 4.052 0.416 l 8.151 -0.119 c 2.284 -0.033 4.54 -0.515 6.639 -1.417 l 28.883 -12.198 C 89.406 63.701 90.459 61.428 89.809 59.305 z"
												style={{
													stroke: "none",
													fill: "white",
													opacity: 1,
												}}
												transform="matrix(1 0 0 1 0 0)"
												strokeLinecap="round"
											/>
											<path
												d="M 48.427 64.62 c -3.835 0 -7.18 -0.752 -9.434 -2.819 c -0.407 -0.374 -0.435 -1.006 -0.061 -1.413 c 0.372 -0.407 1.005 -0.435 1.413 -0.062 c 4.102 3.763 13.197 2.258 21.554 0.293 c 0.529 -0.122 1.075 0.206 1.202 0.745 c 0.126 0.537 -0.207 1.075 -0.745 1.202 C 57.665 63.67 52.736 64.62 48.427 64.62 z"
												style={{
													stroke: "none",
													fill: "white",
													opacity: 1,
												}}
												transform="matrix(1 0 0 1 0 0)"
												strokeLinecap="round"
											/>
											<ellipse
												cx="41.276"
												cy="29.197"
												rx="6.786"
												ry="13.287"
												style={{
													stroke: "none",
													fill: "white",
													opacity: 1,
												}}
												transform="matrix(0.4946 -0.8691 0.8691 0.4946 -4.5148 50.6277)"
											/>
											<ellipse
												cx="62.517"
												cy="19.386"
												rx="13.287"
												ry="6.786"
												style={{
													stroke: "none",
													fill: "white",
													opacity: 1,
												}}
												transform="matrix(0.8691 -0.4946 0.4946 0.8691 -1.4059 33.4574)"
											/>
										</g>
									</svg>
								</div>
								<div className="text-[#2d2d2d] text-xl text-left font-semibold font-sans">
									{item.title}
								</div>
							</div>
							<div className="text-[#6d6d6d] font-medium text-start">
								{item.description}
							</div>
						</div>
					))}
				</div>

				<div className="w-screen h-[300px] bg-[#f1f1f1] flex items-center justify-center">
					<button className="p-5 w-[300px] h-[80px] text-white rounded-lg text-2xl bg-[#036a38] hover:bg-[#039750] transition-all">
						TAKE ME TO PRICING
					</button>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default VirtualTour;
