import React, { createContext, useContext, useEffect, useState } from "react";
import { 
    createUserWithEmailAndPassword, 
    updateProfile, 
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail
} from "firebase/auth";
import { auth } from "../data/firebase.config";

const UserContext = createContext({})

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({children}) => {
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState();
    const [error, setError] = useState("");
    const [uid, setUid] = useState();

    useEffect(() => {
        setLoading(true);
        const unsubscribe = onAuthStateChanged(auth, (res) => {
            res ? setUser(res) : setUser(null);
            setError("");
            setLoading(false);
            setUid(res.uid);
        });
        return unsubscribe;
    }, [])

    const registerUser = (email, name, password) => {
        ///
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then(()=> {
                return updateProfile(auth.currentUser, {
                    displayName: name,
                })
            })
            .then(res => console.log(res))
            .catch((err) => console.log(err.message))
            .finally(() => setLoading(false));
    }

    const signInUser = (email, password) => {
        ///
        setLoading(true);
        console.log(auth.currentUser);
        signInWithEmailAndPassword(auth, email, password)
            .then(res => console.log(res))
            .catch((err) => console.log(err.message))
            .finally(() => setLoading(false));
    }

    const logoutUser = () => {
        //
        signOut(auth);
    }

    const forgotPassword = (email) => {
        //
        return sendPasswordResetEmail(auth, email);
    }

    const contextValue = {
        user,
        uid,
        loading,
        error,
        registerUser,
        signInUser,
        logoutUser,
        forgotPassword,
    };

    return (
        <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
    )
}