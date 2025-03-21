import { createContext } from "react";
export const AppContext = createContext()

const AppContextProvider = (props) =>{
    const months = ["","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currencySymbol = "₹";
    const slotDateFormate = (slotDate) =>{
      const dateArray = slotDate.split('_')
      return dateArray[0]+" "+months[Number(dateArray[1])]+" "+dateArray[2]
    }
    const value = {
        slotDateFormate,
        currencySymbol
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;