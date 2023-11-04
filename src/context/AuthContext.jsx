/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import { useContext, createContext } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut,onAuthStateChanged, getAuth } from "firebase/auth";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider);
        
    
    }
    return (
        <AuthContext.Provider value={{googleSignIn}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}