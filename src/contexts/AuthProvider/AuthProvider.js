import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import app from '../../firebase/firebase.config';
 
export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [looding, setLooding] = useState(true);

    const createUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password)
    };
    const logIn = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password)
    };

useEffect(()=>{
   const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
        console.log(currentUser);
        setUser(currentUser);
    });
    return () =>{
        return unsubscribe();
    }
},[])

    const authInfo = {
        user,
        looding,
        createUser,
        logIn,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;