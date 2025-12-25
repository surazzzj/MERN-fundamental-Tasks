import { Children, createContext } from "react"

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    return (
        <AppContext.Provider value={{backendUrl}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider