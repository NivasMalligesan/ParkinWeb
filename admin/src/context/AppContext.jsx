import { createContext } from "react";
export const AppContext = createContext()

const AppContextProvider = (props) =>{
    const months = ["","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currencySymbol = "₹";
        const backendUrl = import.meta.env.VITE_BACKENDURL; // Ensure consistency
    const slotDateFormate = (slotDate) =>{
      const dateArray = slotDate.split('_')
      return dateArray[0]+" "+months[Number(dateArray[1])]+" "+dateArray[2]
    }
    const value = {
        slotDateFormate,
        currencySymbol,
        backendUrl
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;