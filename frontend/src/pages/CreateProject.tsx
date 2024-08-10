import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { RxCross2 } from "react-icons/rx";
import image from "../assets/auth.avif";

export const farmerInput = z.object({
	name: z.string().min(1, { message: "Name should not be empty" }),
	area: z.string().min(1, { message: "Area cannot be empty" }),
	city: z.string().min(1, { message: "City cannot be empty" }),
	state: z.string().min(1, { message: "State cannot be empty" }),
	number: z.string().regex(/^\d{10,}$/, {
		message: "Number should be at least 10 digits long",
	}),
	location: z.string().regex(/^-?\d+(\.\d+)?(,-?\d+(\.\d+)?){9}$/, {
		message: "String must contain exactly 10 numbers separated by commas",
	}),
});

export type farmerInputType = z.infer<typeof farmerInput>;

const CreateProject: React.FC = () => {
	const BACKEND_URL = import.meta.env.VITE_DATABASE_URL;
	const navigate = useNavigate();
	const [farmerInput, setFarmerInput] = useState<farmerInputType>({
		name: "",
		area: "",
		city: "",
		state: "",
		number: "",
		location: "",
	});

	const [coordinates, setCoordinates] = useState({
		longitude1: "",
		latitude1: "",
		longitude2: "",
		latitude2: "",
		longitude3: "",
		latitude3: "",
		longitude4: "",
		latitude4: "",
		longitude5: "",
		latitude5: "",
	});

	const handleCoordinateChange = (
		e: ChangeEvent<HTMLInputElement>,
		field: string
	) => {
		setCoordinates({ ...coordinates, [field]: e.target.value });
	};

	const concatenateCoordinates = () => {
		return `${coordinates.longitude1},${coordinates.latitude1},${coordinates.longitude2},${coordinates.latitude2},${coordinates.longitude3},${coordinates.latitude3},${coordinates.longitude4},${coordinates.latitude4},${coordinates.longitude5},${coordinates.latitude5}`;
	};

	async function sendRequest() {
		try {
			const concatenatedLocation = concatenateCoordinates();
			setFarmerInput({ ...farmerInput, location: concatenatedLocation });
			console.log(farmerInput);
			const res = await axios.post(
				`${BACKEND_URL}/api/v1/farmer/createFarmer`,
				farmerInput,
				{
					headers: {
						Authorization: localStorage.getItem("token"),
					},
				}
			);

			if (res.data.status === 406 || res.data.status === 403) {
				toast.dismiss();
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
				return;
			}

			if (res.data.farmer) {
				toast.dismiss();
				console.log(res.data.farmer.id);
				try {
					const resp = await axios.post(
						`${BACKEND_URL}/api/v1/project/createProject`,
						{
							farmerId: res.data.farmer.id,
						},
						{
							headers: {
								Authorization: localStorage.getItem("token"),
							},
						}
					);
					toast("YOU HAVE SUCCESSFULLY REGISTERED THE FARMER!", {
						icon: "✅",
						style: {
							borderRadius: "10px",
							background: "#333",
							color: "#fff",
						},
					});
					setTimeout(() => {
						navigate("/myprojects"); // Redirect to a success page or dashboard
					}, 1000);
					return;
				} catch (error) {
					alert("alert while creating project");
				}
			}
			alert(res.data.message);
		} catch (error) {
			console.error(error);
			alert("Error while sending request");
		}
	}

	return (
		<div className="min-w-screen min-h-screen flex items-center justify-center bg-gray-100 p-4">
			<Toaster />
			<div className="relative w-full max-w-6xl h-auto bg-white shadow-2xl flex flex-col md:flex-row rounded-lg overflow-hidden">
				<RxCross2
					className="absolute top-5 left-5 text-green-600 text-3xl hover:cursor-pointer"
					onClick={() => navigate("/")}
				/>
				<div className="w-full flex flex-col justify-evenly items-center md:w-1/2 bg-white p-6 sm:p-8">
					<h2 className="text-3xl sm:text-4xl font-semibold text-green-800 mb-4 sm:mb-6">
						Enter Farmer Details
					</h2>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							sendRequest();
						}}
						className="grid grid-cols-2 md:grid-cols-2 gap-4 sm:gap-6 w-full"
					>
						<LablledInput
							lable="Enter Farmer Name:"
							placeholder="Khedut"
							onchange={(e) =>
								setFarmerInput({
									...farmerInput,
									name: e.target.value,
								})
							}
						/>
						<LablledInput
							lable="Enter Area:"
							placeholder="puttar"
							onchange={(e) =>
								setFarmerInput({
									...farmerInput,
									area: e.target.value,
								})
							}
						/>
						<LablledInput
							lable="Enter City:"
							placeholder="Ludhiyana"
							onchange={(e) =>
								setFarmerInput({
									...farmerInput,
									city: e.target.value,
								})
							}
						/>
						<LablledInput
							lable="Enter State:"
							placeholder="Punjab"
							onchange={(e) =>
								setFarmerInput({
									...farmerInput,
									state: e.target.value,
								})
							}
						/>
						<LablledInput
							lable="Enter Phone Number:"
							placeholder="1234567890"
							type="tel"
							onchange={(e) =>
								setFarmerInput({
									...farmerInput,
									number: e.target.value,
								})
							}
						/>

						<h3 className="col-span-2 text-lg font-medium text-green-800">
							Enter Location Coordinates:
						</h3>

						<LablledInput
							lable="Longitude 1:"
							placeholder="-121.1958"
							onchange={(e) => handleCoordinateChange(e, "longitude1")}
						/>
						<LablledInput
							lable="Latitude 1:"
							placeholder="37.6683"
							onchange={(e) => handleCoordinateChange(e, "latitude1")}
						/>
						<LablledInput
							lable="Longitude 2:"
							placeholder="-121.1779"
							onchange={(e) => handleCoordinateChange(e, "longitude2")}
						/>
						<LablledInput
							lable="Latitude 2:"
							placeholder="37.6687"
							onchange={(e) => handleCoordinateChange(e, "latitude2")}
						/>
						<LablledInput
							lable="Longitude 3:"
							placeholder="-121.1773"
							onchange={(e) => handleCoordinateChange(e, "longitude3")}
						/>
						<LablledInput
							lable="Latitude 3:"
							placeholder="37.6792"
							onchange={(e) => handleCoordinateChange(e, "latitude3")}
						/>
						<LablledInput
							lable="Longitude 4:"
							placeholder="-121.1958"
							onchange={(e) => handleCoordinateChange(e, "longitude4")}
						/>
						<LablledInput
							lable="Latitude 4:"
							placeholder="37.6792"
							onchange={(e) => handleCoordinateChange(e, "latitude4")}
						/>
						<LablledInput
							lable="Longitude 5:"
							placeholder="-121.1958"
							onchange={(e) => handleCoordinateChange(e, "longitude5")}
						/>
						<LablledInput
							lable="Latitude 5:"
							placeholder="37.6792"
							onchange={(e) => handleCoordinateChange(e, "latitude5")}
						/>

						<button
							type="submit"
							className="col-span-2 text-lg font-semibold bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg shadow-md transition-all duration-300"
						>
							Create Project
						</button>
					</form>
				</div>
				<div className="hidden md:flex md:w-1/2 bg-gray-200">
					<img src={image} alt="auth" className="w-full h-full object-cover" />
				</div>
			</div>
		</div>
	);
};

interface LablledInputProps {
	lable: string;
	placeholder: string;
	type?: string;
	onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LablledInput: React.FC<LablledInputProps> = ({
	lable,
	placeholder,
	type = "text",
	onchange,
}) => {
	return (
		<div className="flex flex-col mb-2">
			<label className="text-sm font-medium text-green-800 mb-1">{lable}</label>
			<input
				type={type}
				placeholder={placeholder}
				className="px-3 py-2 border rounded-md text-green-800 focus:outline-none focus:ring-2 focus:ring-green-600"
				onChange={onchange}
			/>
		</div>
	);
};

export default CreateProject;
