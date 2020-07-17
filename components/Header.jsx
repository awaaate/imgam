import React from "react";
import { Button } from "./styled/Button";
import { MdExitToApp } from "react-icons/md";

import { Link } from "./Link";
import { useContext } from "react";
import { UserContext } from "../lib/UserContext";
import { auth } from "../lib/firebase";
import { HeaderSearch } from "./HeaderSearch";

export const Header = () => {
    const { user } = useContext(UserContext);
    return (
        <div className="w-full border-b-2 bg-white border-gray-300 py-3 px-5">
            <div className="flex justify-between m-auto w-full max-w-screen-lg h-12">
                <Link
                    href="/"
                    className="font-normal text-gray-400 text-xl self-center"
                >
                    img<span className="font-bold text-accent">Am</span>
                </Link>
                <HeaderSearch />
                <div className="flex justify-evenly h-full">
                    {user ? (
                        <React.Fragment>
                            <Button className="mr-5">
                                <Link href={"/upload"}>Upload</Link>
                            </Button>
                            <button
                                className="bg-transparent border-primary rounded border-2 flex justify-center items-center px-4 py-1 hover:bg-gray-300"
                                onClick={() => auth.signOut()}
                            >
                                <span style={{ marginRight: 5 }}>Log out</span>
                                <MdExitToApp />
                            </button>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Link href="/login" className="text-primary self-center mr-5 font-semibold hover:text-gray-800">
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="bg-primary text-white px-4 py-1 rounded font-bold text-center flex items-center justify-center cursor-pointer hover:bg-dark outline-none"
                            >
                                Register
                            </Link>
                        </React.Fragment>
                    )}
                </div>
            </div>
        </div>
    );
};
