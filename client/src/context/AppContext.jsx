import { createContext } from "react";
import { parking } from "../assets/assets";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const currencySymbol = '₹'
    const value = {
        parking,
        currencySymbol
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
