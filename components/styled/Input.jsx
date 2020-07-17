import React from "react";

export const Input = ({ className, ...props }) => (
    <input
        className={`outline-none rounded-sm border-gray-300 border-2 px-2 py-1 focus:border-gray-400 ${className}`}
        {...props}
    />
);
