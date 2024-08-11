import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import image from "../assets/auth.avif"; // Use the same image as in Signup
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useContext } from "react";
import { AppContext, Context } from "../context/AppContext";
import { z } from "zod";

export const signInInput = z.object({
	email: z.string().email({ message: "Invalid email type" }),
	password: z
		.string()
		.min(8, { message: "Password should be at least 8 characters long" }),
});

export type signInType = z.infer<typeof signInInput>;

const Signin: React.FC = () => {
	const { setLoggedIn, } = useContext(AppContext) as Context;
	const BACKEND_URL = import.meta.env.VITE_DATABASE_URL;
	const navigate = useNavigate();
	const [show, setShow] = useState<boolean>(false);
	const [userInput, setUserInput] = useState<signInType>({
		email: "",
		password: "",
	});

	function handleChange(
		e: React.ChangeEvent<HTMLInputElement>,
		field: "email" | "password"
	) {
		setUserInput({
			...userInput,
			[field]: e.target.value,
		});
	}

	useEffect(() => {
		if (localStorage.getItem("loggedIn") === "true") navigate("/");
	}, []);

	async function sendRequest() {
		try {
			const res = await axios.post(
				`${BACKEND_URL}/api/v1/user/signin`,
				userInput
			);
			if (res.data.status === 406 || res.data.status === 401) {
				toast((t) => (
					<div className="flex justify-between bg-red-700 text-white p-4 rounded-md shadow-lg -mx-5 -my-3">
						<span className="font-bold">{res.data.message}</span>
						<button
							className="ml-2 text-red-500"
							onClick={() => {
								toast.dismiss(t.id);
							}}
						>
							❌
						</button>
					</div>
				));
			} else if (res.data.jwt) {
				const jwt = res.data.jwt;
				localStorage.setItem("token", jwt);
				toast("YOU HAVE SUCCESSFULLY LOGGED IN!", {
					icon: "✅",
					style: {
						borderRadius: "10px",
						background: "#333",
						color: "#fff",
					},
				});
				setTimeout(() => {
					setLoggedIn(true);
					window.location.reload();
					localStorage.setItem("loggedIn", "" + true);
					navigate("/");
				}, 1000);
			} else {
				alert(res.data.message);
			}
		} catch (error) {
			console.log(error)
			alert("Error while sending request");
		}
	}

	return (
		<div className="min-w-screen min-h-screen flex items-center justify-center bg-gray-100">
			<Toaster />
			<div className="relative w-full max-w-6xl h-auto bg-white shadow-2xl flex flex-col md:flex-row rounded-lg overflow-hidden">
				<RxCross2
					className="absolute top-5 left-5 text-green-600 text-3xl hover:cursor-pointer"
					onClick={() => navigate("/")}
				/>
				<div className="w-full flex flex-col justify-evenly items-center md:w-1/2 bg-white p-8">
					<h2 className="text-4xl font-semibold text-green-800 mb-6">
						Sign In
					</h2>
					<form
						onSubmit={(e) => e.preventDefault()}
						className="flex flex-col justify-center items-center gap-6 w-[60%]"
					>
						<div className="w-full flex flex-col gap-4">
							<LablledInput
								lable="Enter Your Email:"
								placeholder="example@gmail.com"
								value="email"
								onchange={(e) => handleChange(e, "email")}
							/>
							<div className="relative">
								<LablledInput
									lable="Enter Your Password:"
									placeholder="YourPassword123"
									value="password"
									onchange={(e) => handleChange(e, "password")}
									type={`${show ? "text" : "password"}`}
								/>
								{show ? (
									<LuEye
										className="absolute text-2xl top-10 right-3 text-green-600 hover:cursor-pointer"
										onClick={() => setShow(!show)}
									/>
								) : (
									<LuEyeOff
										className="absolute text-2xl top-10 right-3 text-green-600 hover:cursor-pointer"
										onClick={() => setShow(!show)}
									/>
								)}
							</div>
							<button
								className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-full shadow-md transform transition duration-200 hover:scale-105"
								onClick={sendRequest}
							>
								Sign In
							</button>
						</div>
						<p className="text-gray-700 text-center mt-4">
							Don't have an account?{" "}
							<span
								onClick={() => navigate("/signup")}
								className="text-green-600 hover:underline hover:cursor-pointer"
							>
								Sign up here
							</span>
						</p>
					</form>
				</div>
				<div
					className="w-full md:w-1/2 md:h-auto bg-cover bg-center hidden md:block"
					style={{ backgroundImage: `url(${image})` }}
				></div>
			</div>
		</div>
	);
};

interface LablledInput {
	lable: string;
	placeholder: string;
	onchange: (e: ChangeEvent<HTMLInputElement>) => void;
	value: string;
	type?: string;
}

const LablledInput = ({
	lable,
	placeholder,
	onchange,
	value,
	type = "text",
}: LablledInput) => {
	return (
		<div className="flex flex-col mb-4">
			<label
				className="mb-2 text-sm font-medium text-green-800"
				htmlFor={value}
			>
				{lable}
			</label>
			<input
				placeholder={placeholder}
				type={type}
				id={value}
				onChange={onchange}
				className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-700 placeholder-gray-500"
			/>
		</div>
	);
};

export default Signin;
