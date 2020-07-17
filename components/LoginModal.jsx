import React from "react";
import { Modal } from "./Modal";
import { LoginForm } from "./LoginForm";
import { useLoginModalContext } from "../lib/LoginModalContext";

export const LoginModal = () => {
    const { isOpen, close } = useLoginModalContext();
    return (
        <Modal
            header="login"
            closeModal={close}
            isOpen={isOpen}
            className="w-375 m-auto"
        >
            <LoginForm className="flex flex-col px-3 my-10" completed={close} />
        </Modal>
    );
};
