import React, { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import image from "../assets/auth.avif";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useContext } from "react";
import { AppContext, Context } from "../context/AppContext";
import { z } from "zod";

export const signUpInput = z.object({
	name: z.string().min(1, { message: "Name cannot be empty" }),
	email: z.string().email({ message: "Invalid email type" }),
	password: z
		.string()
		.min(8, { message: "Password should be at least 8 characters" }),
	age: z.string().min(2, { message: "Age should be at least 18" }),
	area: z.string().min(1, { message: "Area cannot be empty" }),
	city: z.string().min(1, { message: "City cannot be empty" }),
	state: z.string().min(1, { message: "State cannot be empty" }),
	country: z.string().min(1, { message: "Country cannot be empty" }),
});

export type signUpType = z.infer<typeof signUpInput>;

const Signup: React.FC = () => {
	const { setUser, setLoggedIn } = useContext(AppContext) as Context;
	const BACKEND_URL = import.meta.env.VITE_DATABASE_URL;
	const navigate = useNavigate();
	const [show, setShow] = useState<boolean>(false);
	const [userInput, setUserInput] = useState<signUpType>({
		name: "",
		email: "",
		password: "",
		age: "",
		area: "",
		city: "",
		state: "",
		country: "",
	});

	useEffect(() => {
		if (localStorage.getItem("loggedIn") === "true") navigate("/");
	}, []);

	async function sendRequest() {
		try {
			console.log(userInput);
			const res = await axios.post(
				`${BACKEND_URL}/api/v1/user/signup`,
				userInput
			);
			if (res.data.status === 406 || res.data.status === 403) {
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
				toast("YOU HAVE SUCCESSFULLY SIGNED UP!", {
					icon: "✅",
					style: {
						borderRadius: "10px",
						background: "#333",
						color: "#fff",
					},
				});
				setTimeout(() => {
					setLoggedIn(true);
					setUser(userInput);
					localStorage.setItem("loggedIn", "" + true);
					navigate("/");
				}, 1000);
			} else {
				alert(res.data.message);
			}
		} catch (error) {
			console.log(error);
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
						Sign Up
					</h2>
					<form
						onSubmit={(e) => e.preventDefault()}
						className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
					>
						<LablledInput
							lable="Enter Your Name:"
							placeholder="Naruto Uzumaki"
							value="name"
							onchange={(e) =>
								setUserInput({
									...userInput,
									name: e.target.value,
								})
							}
						/>
						<LablledInput
							lable="Enter Your Email:"
							placeholder="NarutoUzumaki@gmail.com"
							value="email"
							onchange={(e) =>
								setUserInput({
									...userInput,
									email: e.target.value,
								})
							}
						/>
						<LablledInput
							lable="Enter Your Age:"
							placeholder="20"
							value="age"
							type="number"
							onchange={(e) =>
								setUserInput({
									...userInput,
									age: e.target.value,
								})
							}
						/>
						<LablledInput
							lable="Enter Your Area:"
							placeholder="Konoha Village"
							value="area"
							onchange={(e) =>
								setUserInput({
									...userInput,
									area: e.target.value,
								})
							}
						/>
						<LablledInput
							lable="Enter Your City:"
							placeholder="Tokyo"
							value="city"
							onchange={(e) =>
								setUserInput({
									...userInput,
									city: e.target.value,
								})
							}
						/>
						<LablledInput
							lable="Enter Your State:"
							placeholder="Kanto"
							value="state"
							onchange={(e) =>
								setUserInput({
									...userInput,
									state: e.target.value,
								})
							}
						/>
						<LablledInput
							lable="Enter Your Country:"
							placeholder="Japan"
							value="country"
							onchange={(e) =>
								setUserInput({
									...userInput,
									country: e.target.value,
								})
							}
						/>
						<div className="relative col-span-1 md:col-span-2">
							<LablledInput
								lable="Enter Your Password:"
								placeholder="NarutoUzumaki123"
								value="password"
								onchange={(e) =>
									setUserInput({
										...userInput,
										password: e.target.value,
									})
								}
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
							className="col-span-1 md:col-span-2 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-full shadow-md transform transition duration-200 hover:scale-105"
							onClick={sendRequest}
						>
							Sign Up
						</button>
					</form>
					<p className="text-gray-700 text-center mt-4 w-full">
						Already signed in?{" "}
						<span
							onClick={() => navigate("/signin")}
							className="text-green-600 hover:underline hover:cursor-pointer"
						>
							Sign in here
						</span>
					</p>
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
		<div className="flex flex-col mb-1">
			<label
				className="mb-1 text-sm font-medium text-green-800"
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

export default Signup;
