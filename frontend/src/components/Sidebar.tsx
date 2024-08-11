import React from "react";
import { useContext } from "react";
import { AppContext, Context } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { RiCloseCircleLine } from "react-icons/ri";
import { BiLogOutCircle } from "react-icons/bi";

const Sidebar: React.FC = () => {
	const navigate = useNavigate();
	const { setSidebar, loggedIn, setLoggedIn, setUser, user } = useContext(
		AppContext
	) as Context;

	return (
		<aside className="fixed top-0 border-r-2 min-h-screen flex flex-col border-dark-green shadow-xl left-0 z-50 md:w-64 w-screen h-screen transition-transform translate-x-0 bg-white text-dark-green">
			<div className="h-full px-3 py-4 overflow-y-auto">
				<div className="w-full border-b-dark-green border-b-2 p-4 font-playwrite text-2xl font-extrabold">
					AgroQuality
				</div>
				<ul className="space-y-2 mt-8 font-medium">
					<li>
						<button
							onClick={() => {
								navigate("/");
								setSidebar(false);
							}}
							className="flex w-full items-center p-2 rounded-lg text-dark-green hover:bg-green-300 group"
						>
							<IoHome className="w-5 h-5 text-dark-green group-hover:text-dark-green" />
							<span className="ms-3">Home</span>
						</button>
					</li>
					<li>
						<button
							onClick={() => {
								if (loggedIn) navigate("/profile");
								else navigate("/signup");
								setSidebar(false);
							}}
							className="flex w-full items-center p-2 rounded-lg text-dark-green hover:bg-green-300 group"
						>
							<svg
								className="w-5 h-5 text-dark-green group-hover:text-dark-green"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 22 21"
							>
								<path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
								<path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
							</svg>
							<span className="ms-3">Profile</span>
						</button>
					</li>
					<li>
						<button
							onClick={() => {
								setSidebar(false);
								if (loggedIn && user.type) navigate("/myprojects");
								else if (!user.type) navigate("/pricing");
								else navigate("/signup");
							}}
							className="flex w-full items-center p-2 rounded-lg text-dark-green hover:bg-green-300 group"
						>
							<svg
								className="flex-shrink-0 w-5 h-5 text-dark-green group-hover:text-dark-green"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 18 20"
							>
								<path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
							</svg>
							<span className="ms-3 whitespace-nowrap">Projects</span>
						</button>
					</li>
					<li>
						<button
							onClick={() => {
								if (loggedIn && !user.type) navigate("/pricing");
								else if (user.type) navigate("/my-purchase");
								else navigate("/signup");
								setSidebar(false);
							}}
							className="flex w-full items-center p-2 rounded-lg text-dark-green hover:bg-green-300 group"
						>
							<svg
								className="flex-shrink-0 w-5 h-5 text-dark-green group-hover:text-dark-green"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM7 16V4h12v12H7zm0-14c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H7z" />
							</svg>
							<span className="ms-3 whitespace-nowrap">My Purchases</span>
						</button>
					</li>

					{loggedIn ? (
						<li>
							<button
								onClick={() => {
									localStorage.clear();
									setLoggedIn(false);
									setUser({
										name: "",
										email: "",
										area: "",
										city: "",
										country: "",
										state: "",
										age: "",
										type: "",
									});
									navigate("/");
									setSidebar(false);
								}}
								className="flex w-full items-center p-2 rounded-lg text-dark-green hover:bg-green-300 group"
							>
								<BiLogOutCircle className="w-6 h-6 ml-[-0.3rem] text-dark-green group-hover:text-dark-green" />
								<span className="ms-3 whitespace-nowrap">Log Out</span>
							</button>
						</li>
					) : (
						<>
							<li>
								<button
									onClick={() => {
										navigate("/signin");
										setSidebar(false);
									}}
									className="flex w-full items-center p-2 rounded-lg text-dark-green hover:bg-green-300 group"
								>
									<svg
										className="flex-shrink-0 w-5 h-5 text-dark-green group-hover:text-dark-green"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 18 16"
									>
										<path
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
										/>
									</svg>
									<span className=" ms-3 whitespace-nowrap">Sign In</span>
								</button>
							</li>
							<li>
								<button
									onClick={() => {
										navigate("/signup");
										setSidebar(false);
									}}
									className="flex w-full items-center p-2 rounded-lg text-dark-green hover:bg-green-300 group"
								>
									<svg
										className="flex-shrink-0 w-5 h-5 text-dark-green group-hover:text-dark-green"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
										<path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
										<path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
									</svg>
									<span className=" ms-3 whitespace-nowrap">Sign Up</span>
								</button>
							</li>
						</>
					)}
				</ul>
				<ul className="pt-4 mt-4 space-y-2 font-medium border-t  border-black">
					<li>
						<button
							onClick={() => {
								setSidebar(false);
								navigate("/");
							}}
							className="flex w-full items-center p-2 rounded-lg text-dark-green hover:bg-green-300 group"
						>
							<svg
								className="flex-shrink-0 w-5 h-5 text-dark-green group-hover:text-dark-green"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 16 20"
							>
								<path d="M16 14V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 0 0 0-2h-1v-2a2 2 0 0 0 2-2ZM4 2h2v12H4V2Zm8 16H3a1 1 0 0 1 0-2h9v2Z" />
							</svg>
							<span className="ms-3">About</span>
						</button>
					</li>
					<li>
						<button
							onClick={() => {
								setSidebar(false);
								navigate("/");
							}}
							className="flex w-full items-center p-2 rounded-lg text-dark-green hover:bg-green-300 group"
						>
							<svg
								className="flex-shrink-0 w-5 h-5 text-dark-green group-hover:text-dark-green"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 21 21"
							>
								<path d="m5.4 2.736 3.429 3.429A5.046 5.046 0 0 1 10.134 6c.356.01.71.06 1.056.147l3.41-3.412c.136-.133.287-.248.45-.344A9.889 9.889 0 0 0 10.269 1c-1.87-.041-3.713.44-5.322 1.392a2.3 2.3 0 0 1 .454.344Zm11.45 1.54-.126-.127a.5.5 0 0 0-.706 0l-2.932 2.932c.029.023.049.054.078.077.236.194.454.41.65.645.034.038.078.067.11.107l2.927-2.927a.5.5 0 0 0 0-.707Zm-2.931 9.81c-.024.03-.057.052-.081.082a4.963 4.963 0 0 1-.633.639c-.041.036-.072.083-.115.117l2.927 2.927a.5.5 0 0 0 .707 0l.127-.127a.5.5 0 0 0 0-.707l-2.932-2.931Zm-1.442-4.763a3.036 3.036 0 0 0-1.383-1.1l-.012-.007a2.955 2.955 0 0 0-1-.213H10a2.964 2.964 0 0 0-2.122.893c-.285.29-.509.634-.657 1.013l-.01.016a2.96 2.96 0 0 0-.21 1 2.99 2.99 0 0 0 .489 1.716c.009.014.022.026.032.04a3.04 3.04 0 0 0 1.384 1.1l.012.007c.318.129.657.2 1 .213.392.015.784-.05 1.15-.192.012-.005.02-.013.033-.018a3.011 3.011 0 0 0 1.676-1.7v-.007a2.89 2.89 0 0 0 0-2.207 2.868 2.868 0 0 0-.27-.515c-.007-.012-.02-.025-.03-.039Zm6.137-3.373a2.53 2.53 0 0 1-.35.447L14.84 9.823c.112.428.166.869.16 1.311-.01.356-.06.709-.147 1.054l3.413 3.412c.132.134.249.283.347.444A9.88 9.88 0 0 0 20 11.269a9.912 9.912 0 0 0-1.386-5.319ZM14.6 19.264l-3.421-3.421c-.385.1-.781.152-1.18.157h-.134c-.356-.01-.71-.06-1.056-.147l-3.41 3.412a2.503 2.503 0 0 1-.443.347A9.884 9.884 0 0 0 9.732 21H10a9.9 9.9 0 0 0 5.044-1.388 2.519 2.519 0 0 1-.444-.348ZM1.735 15.6l3.426-3.426a4.608 4.608 0 0 1-.013-2.367L1.735 6.4a2.507 2.507 0 0 1-.35-.447 9.889 9.889 0 0 0 0 10.1c.1-.164.217-.316.35-.453Zm5.101-.758a4.957 4.957 0 0 1-.651-.645c-.033-.038-.077-.067-.11-.107L3.15 17.017a.5.5 0 0 0 0 .707l.127.127a.5.5 0 0 0 .706 0l2.932-2.933c-.03-.018-.05-.053-.078-.076ZM6.08 7.914c.03-.037.07-.063.1-.1.183-.22.384-.423.6-.609.047-.04.082-.092.129-.13L3.983 4.149a.5.5 0 0 0-.707 0l-.127.127a.5.5 0 0 0 0 .707L6.08 7.914Z" />
							</svg>
							<span className="ms-3">Help</span>
						</button>
					</li>
				</ul>
			</div>
			<button
				onClick={() => setSidebar(false)}
				className="w-full py-2 border-t-2 border-t-black flex justify-center items-center hover:bg-green-300"
			>
				<RiCloseCircleLine size={30} fill="black" />
			</button>
		</aside>
	);
};

export default Sidebar;
