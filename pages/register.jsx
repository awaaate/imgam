import { Input } from "../components/styled/Input";
import styled from "styled-components";
import { FormInput } from "../components/FormInput";
import { Button } from "../components/styled/Button";
import { useState, useCallback } from "react";

import { auth, createUserProfileDocument } from "../lib/firebase";
import Router from "next/router";
import { Link } from "../components/Link";
import { Alert } from "../components/Alert";

const Container = styled.div`
    width: 500px;
    border-radius: 2px;
    margin: auto;
    margin-top: 10px;

    h1 {
        text-align: center;
    }
`;
const Form = styled.form`
    width: 100%;
    height: 100%;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.12);
    padding: 20px;
`;
let timeout = null;
const Resgiter = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        userName: "",
    });
    const [valid, setValid] = useState({
        is: true,
        message: "Complete the form",
    });
    const seInvalid = (message) => {
        setValid({ message, is: false });

        if (timeout === null) {
            timeout = setTimeout(() => {
                setValid({ ...valid, is: true });
                clearTimeout(timeout);
                timeout = null;
            }, 2000);
            return;
        }
    };
    const onChangeHandler = (event) => {
        const { value, name } = event.target;
        setData((state) => ({ ...state, [name]: value }));
    };
    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (!checkForm()) return;
        try {
            const userAuth = await auth.createUserWithEmailAndPassword(
                data.email,
                data.password
            );
            createUserProfileDocument(userAuth.user, {
                userName: data.userName,
            });
            Router.push("/");
        } catch (error) {
            if (error.message) {
                seInvalid(error.message);
            }
        }
    };
    const checkForm = () => {
        if (!data.email || !data.userName || !data.password) {
            seInvalid("Complete the form");
            return false;
        }
        setValid({ is: true });
        return true;
    };
    return (
        <div className="flex max-w-screen-md m-auto mt-8  relative shadow-sm rounded-sm overflow-hidden">
            <div className="w-2/3 z-10 bg-white py-8 pb-16 px-4">
                <h1 className="font-bold text-accent text-3xl text-center mb-2">
                    Register
                </h1>
                <form onSubmit={onSubmitHandler} className="flex flex-col">
                    <FormInput
                        label="User Name"
                        value={data.userName}
                        name="userName"
                        placeholder="User"
                        onChange={onChangeHandler}
                    />
                    <FormInput
                        label="Email"
                        value={data.email}
                        name="email"
                        placeholder="youremail@gmail.com"
                        onChange={onChangeHandler}
                    />
                    <FormInput
                        label="Password"
                        type="password"
                        value={data.password}
                        name="password"
                        placeholder="password"
                        onChange={onChangeHandler}
                    />
                    <Alert show={!valid.is} message={valid.message} />
                    <button
                        type="submit"
                        className="bg-primary text-white px-5 py-3 rounded font-bold text-center flex items-center justify-center cursor-pointer hover:bg-dark outline-none"
                    >
                        Create Account
                    </button>
                    <p className="mt-2 text-gray-700">
                        Don you have an account?
                        <Link href="/login" className="text-accent">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
            <div
                className="relative w-full bg-cover bg-center flex items-center justify-center"
                style={{
                    backgroundImage: `url(login-bg.jpg)`,
                }}
            >
                <span className="z-10 relative text-white text-3xl font-bold text-center p-3">
                    Share your photos with the world
                </span>
                <div className="absolute bg-accent w-full h-full opacity-75 top-0 left-0 "></div>
            </div>
        </div>
    );
};

export default Resgiter;
