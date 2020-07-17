import { Input } from "../components/styled/Input";
import styled from "styled-components";
import { FormInput } from "../components/FormInput";
import { Button } from "../components/styled/Button";
import { auth } from "../lib/firebase";
import { useState } from "react";
import Router from "next/router";
import { LoginForm } from "../components/LoginForm";
import { Link } from "../components/Link";

const Container = styled.div`
    width: 500px;
    border-radius: 2px;
    margin: auto;
    margin-top: 10px;

    h1 {
        text-align: center;
    }
`;

const Login = () => {
    return (
        <div className="flex max-w-screen-sm m-auto mt-8 relative shadow-sm rounded-sm overflow-hidden">
            <div className="w-full bg-white py-8 pb-16 px-4">
                <h1 className="font-bold text-accent text-3xl text-center mb-4">
                    Login
                </h1>

                <LoginForm className="flex flex-col" p="20" />
            </div>
        </div>
    );
};

export default Login;
