import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export interface Context {
	loggedIn: boolean;
	setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}
export const AppContext = createContext<Context | null>(null);

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const BACKEND_URL = import.meta.env.VITE_DATABASE_URL;

	const [loggedIn, setLoggedIn] = useState<boolean>(false);

	return (
		<AppContext.Provider value={{ loggedIn, setLoggedIn }}>
			{children}
		</AppContext.Provider>
	);
};

export default AppContextProvider;
