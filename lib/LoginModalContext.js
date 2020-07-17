import React, { createContext, useState, useContext } from "react";

const LoginModalContext = createContext({
    isOpen: false,
    open: () => {},
    close: () => {},
});

export const LoginModalContextProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState("");

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);
    return (
        <LoginModalContext.Provider value={{ isOpen, open, close }}>
            {children}
        </LoginModalContext.Provider>
    );
};
export const useLoginModalContext = () => useContext(LoginModalContext);
