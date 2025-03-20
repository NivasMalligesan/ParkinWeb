import { createContext } from "react";
export const ParkingContext = createContext()

const ParkingContextProvider = (props) =>{
    
    const value = {

    }

    return (
        <ParkingContext.Provider value={value}>
            {props.children}
        </ParkingContext.Provider>
    )
}

export default ParkingContextProvider;