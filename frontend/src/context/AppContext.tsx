import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

type User = {
	name: string;
	email: string;
	age: string;
	area: string;
	city: string;
	state: string;
	country: string;
};

type Soil = { t10: number; moisture: number; t0: number };

type Weather = {
	wgroup: String;
	description: String;
	atmtemp: number;
	pressure: number;
	humidity: number;
};

export interface Context {
	user: User;
	setUser: React.Dispatch<React.SetStateAction<User>>;
	loggedIn: boolean;
	setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
	sidebar: boolean;
	setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
	loading: boolean;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	status: number;
	setStatus: React.Dispatch<React.SetStateAction<number>>;
	soilData: Soil;
	setSoilData: React.Dispatch<React.SetStateAction<Soil>>;
	uvi: number;
	setUvi: React.Dispatch<React.SetStateAction<number>>;
	weatherData: Weather;
	setWeatherData: React.Dispatch<
		React.SetStateAction<{
			wgroup: string;
			description: string;
			atmtemp: number;
			pressure: number;
			humidity: number;
		}>
	>;
}
export const AppContext = createContext<Context | null>(null);

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const BACKEND_URL = import.meta.env.VITE_DATABASE_URL;
	const [user, setUser] = useState<User>({
		name: "",
		email: "",
		age: "",
		area: "",
		city: "",
		state: "",
		country: "",
	});
	const [loggedIn, setLoggedIn] = useState<boolean>(false);
	const [sidebar, setSidebar] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [status, setStatus] = useState(411);
	const [soilData, setSoilData] = useState({
		t10: 281.96,
		moisture: 0.175,
		t0: 279.02,
	});
	const [uvi, setUvi] = useState<number>(3.84);
	const [weatherData, setWeatherData] = useState({
		wgroup: "Clouds",
		description: "overcast clouds",
		atmtemp: 293.11,
		pressure: 997,
		humidity: 84,
	});

	async function sendRequest() {
		const res = await axios.get(`${BACKEND_URL}/api/v1/user/getUser`, {
			headers: {
				Authorization: localStorage.getItem("token"),
			},
		});
		if (res) {
			setUser(res.data);
			setStatus(200);
			setLoading(false);
			setLoggedIn(true);
		} else setStatus(403);
	}

	useEffect(() => {
		if (localStorage.getItem("token")) {
			sendRequest();
		}
	}, []);

	return (
		<AppContext.Provider
			value={{
				loading,
				status,
				setStatus,
				setLoading,
				user,
				setUser,
				loggedIn,
				setLoggedIn,
				sidebar,
				setSidebar,
				uvi,
				setUvi,
				soilData,
				setSoilData,
				weatherData,
				setWeatherData,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppContextProvider;
