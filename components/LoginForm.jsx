import React from "react";

import { FormInput } from "./FormInput";
import { Button } from "./styled/Button";
import { auth, signInWithGoogle } from "../lib/firebase";
import { useState } from "react";
import Router from "next/router";
import { Link } from "./Link";
import { FaGoogle } from "react-icons/fa";

export const LoginForm = ({ className, completed }) => {
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const [valid, setValid] = useState({
        is: true,
        message: "Complete the form",
    });

    const onChangeHandler = (event) => {
        const { value, name } = event.target;
        setData((state) => ({ ...state, [name]: value }));
    };
    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (!checkForm()) return;
        try {
            await auth.signInWithEmailAndPassword(data.email, data.password);
            Router.push("/");
        } catch (error) {
            if (error.message) {
                setValid({ is: false, message: error.message });
            }
        }
    };
    const checkForm = () => {
        if (!data.email || !data.password) {
            setValid({ is: false, message: "Complete the form" });
            return false;
        }
        setValid({ is: true });
        return true;
    };
    const signInWithGoogleHandler = async () => {
        try {
            await signInWithGoogle();
            completed();
        } catch (error) {
            if (error.message) {
                setValid({ is: false, message: error.message });
            }
        }
    };
    return (
        <form onSubmit={onSubmitHandler} className={className}>
            <FormInput
                label="Email"
                name="email"
                type="email"
                value={data.email}
                onChange={onChangeHandler}
            />
            <FormInput
                label="Password"
                name="password"
                value={data.password}
                onChange={onChangeHandler}
            />
            <div
                className="message"
                style={{ color: "crimson", textAlign: "center" }}
            >
                {!valid.is ? <p>{valid.message}</p> : null}
            </div>

            <button
                type="submit"
                className="bg-primary text-white px-5 py-3 rounded font-bold text-center flex items-center justify-center cursor-pointer hover:bg-dark outline-none"
            >
                Login
            </button>
            <button
                type="button"
                className="bg-accent text-white px-5 py-3 rounded font-bold text-center flex items-center justify-center cursor-pointer hover:opacity-75 outline-none mt-3"
                onClick={signInWithGoogleHandler}
            >
                <FaGoogle className="mr-5" /> Login with google
            </button>
            <p className="mt-2 text-gray-700">
                Don't have an account?{" "}
                <Link href="/register" className="text-accent">
                    register
                </Link>
            </p>
        </form>
    );
};
