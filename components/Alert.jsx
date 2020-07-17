import React, { useState, useEffect } from "react";

export const Alert = ({ message, show }) => {
    return (
        <div
            className={`bg-red-500 transition-opacity duration-500  absolute top-0 p-3 m-4 right-0  rounded-sm  font-semibold text-white ${
                show ? "opacity-100" : "opacity-0"
            }`}
        >
            {message}
        </div>
    );
};
