import React from "react";
import ReactDOM from "react-dom";
import ReactModal from "react-modal";
import { FaWindowClose } from "react-icons/fa";
import { LoginForm } from "./LoginForm";

ReactModal.setAppElement("#modal-root");
export const Modal = ({ isOpen, closeModal, header, children, className }) => {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={closeModal}
            className={`inset-40 outline-none absolute border-gray-300  border-2 bg-white rounded-sm overflow-hidden max-w-screen-sm ${className}`}
        >
            <div className="bg-gray-300 w-full py-3 px-5 flex justify-between  ">
                <h2>{header}</h2>
                <span
                    className="font-bold cursor-pointer "
                    onClick={closeModal}
                >
                    &#128473;
                </span>
            </div>
            <div>{children}</div>
        </ReactModal>
    );
};
