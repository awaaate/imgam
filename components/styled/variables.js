import { css } from "styled-components";

export const activeEffect = css`
    transition: box-shadow 0.2s;
    &:focus,
    &:active {
        outline: 0;
        box-shadow: inset 0 0 1px 1px ${(props) => props.theme.accent};
    }
`;
export const borderBottom = css`
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
`;
