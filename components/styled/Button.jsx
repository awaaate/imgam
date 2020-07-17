import React from "react";
import styled, { css } from "styled-components";
import { activeEffect } from "./variables";

export const Button = ({ children, className, ...props }) => (
    <button
        className={`bg-primary text-white px-4 py-1 rounded font-bold text-center flex items-center justify-center cursor-pointer hover:bg-dark outline-none ${className}`}
        {...props}
    >
        {children}
    </button>
);
