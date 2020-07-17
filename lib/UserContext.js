import React, { createContext, useEffect, useState } from "react";
import { auth, createUserProfileDocument } from "./firebase";

export const UserContext = createContext({ user: {} });

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    let unsubscribeFromAuth = null;
    useEffect(() => {
        unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot((snapshot) => {
                    console.log(snapshot.data());
                    setUser({
                        id: snapshot.id,
                        ...snapshot.data(),
                    });
                });
            } else {
                setUser(userAuth);
            }
        });
        return () => {
            unsubscribeFromAuth();
        };
    }, []);
    return (
        <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
    );
};
