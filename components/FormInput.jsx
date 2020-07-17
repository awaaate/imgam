import React from "react";
import { Input } from "./styled/Input";

export const FormInput = ({ label, ...otherProps }) => {
    return (
        <div className="flex flex-col my-2">
            <label className="text-gray-600 font-semibold">{label}</label>
            <input
                className="outline-none rounded-sm border-gray-300 border-2 px-4 py-3 focus:border-gray-400"
                {...otherProps}
            />
        </div>
    );
};
