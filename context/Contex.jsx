import AsyncStorage from "@react-native-async-storage/async-storage";
import { signOut,getAuth,signInWithEmailAndPassword } from "firebase/auth";
import React, { createContext, useState } from "react";


export const myContext = createContext()

export default function Handling({ children,Navigation }) {
    const [log, setLog] = useState('')
    const [lightMode, setLightMode] = useState(false)

    const handlingTheme = () => {
        // return(
        setLightMode(!lightMode)
        // )
    }
        
    return (
        <myContext.Provider value={{

            log,
            setLog,
            lightMode,
            setLightMode,
            handlingTheme,
            
        }}>
            {children}
        </myContext.Provider>
    )
}