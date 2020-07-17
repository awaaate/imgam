import { Header } from "../components/Header";

import { ThemeProvider } from "styled-components";
import { UserContextProvider } from "../lib/UserContext";
import NextNprogress from "nextjs-progressbar";

import "../styles/main.css";
import { SearchContextProvider } from "../lib/SearchContext";
const App = ({ Component, pageProps }) => {
    const theme = {
        accent: "#3366ff",
        dark: "#15172a",
        light: "#c0cbdf",
        primary: "#2e3a58",
    };
    return (
        <ThemeProvider theme={theme}>
            <NextNprogress
                color="#3366ff"
                startPosition="0.3"
                stopDelayMs="200"
                height="3"
            />
            <SearchContextProvider>
                <UserContextProvider>
                    <Header></Header>
                    <Component {...pageProps} />
                </UserContextProvider>
            </SearchContextProvider>
        </ThemeProvider>
    );
};

export default App;
