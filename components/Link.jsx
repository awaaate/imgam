import NextLink from "next/link";

export const Link = ({ children, className, ...props }) => (
    <NextLink {...props}>
        <a className={className}>{children}</a>
    </NextLink>
);
