/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export interface Context {
	
}
export const AppContext = createContext<Context | null>(null);

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
