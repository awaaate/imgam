import React, { useContext } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import styled from "styled-components";
import moment from "moment";
import { likePost, unlikePost, postImage } from "../../lib/firebase.js";
import { UserContext } from "../../lib/UserContext";
import Router from "next/router";
import { Button } from "../styled/Button.jsx";
import { useLoginModalContext } from "../../lib/LoginModalContext.js";

const Wrapper = styled.div`
    max-width: 720px;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    margin: auto;
`;
const Caption = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    .overlay {
        background: ${(props) => props.theme.accent};
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0.6;
        z-index: 0;
    }
    .caption {
        font-weight: 600;
        font-size: 1.6rem;
        color: white;
        z-index: 1;
    }
    .likes {
        z-index: 1;

        display: flex;
        align-items: center;
        margin-top: 10px;
        svg {
            fill: ${(props) => props.theme.dark};
            font-size: 40px;
            margin-right: 7px;
        }
        color: white;
        font-size: 1.2rem;
    }
    opacity: 0;
    &:hover {
        transition: opacity 0.3s;
        opacity: 1;
    }
`;
const ImageContainer = styled.div`
    cursor: pointer;
    position: relative;
    img {
        width: 100%;
        border-radius: 2px;
    }
`;
const Meta = styled.div`
    z-index: 1;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 20px;
    width: 100%;
    color: #fff;
    opacity: 0.6;
    font-weight: 500;

    .likes {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        font-size: 1.2rem;

        svg {
            fill: ${(props) => props.theme.dark};
            font-size: 1.2rem;
        }
    }
`;

const CardItem = ({ id, image, caption, likes, createdAt, userName }) => {
    const { user } = useContext(UserContext);
    const { open } = useLoginModalContext();
    const postActions = () => {
        if (user) {
            if (likes.includes(user.id)) {
                unlikePost(id, user.id);
            } else {
                likePost(id, user.id);
            }
        } else {
            open()
        }
    };

    return (
        <div className="w-full max-w-screen-md shadow-sm m-auto rounded-sm overflow-hidden bg-accent">
            <div
                className="cursor-pointer relative pb-2"
                onDoubleClick={postActions}
            >
                <div className="absolute flex items-center justify-center bg-accent w-full h-full top-0 left-0 bg-opacity-75 opacity-0 hover:opacity-100">
                    <h3 className="font-bold text-white text-2xl text-center">
                        {caption}
                    </h3>
                    <div className="overlay"></div>
                </div>
                <img src={image} alt={caption} />
            </div>

            <div className="flex justify-between items-center text-white px-3 py-1">
                <div className="flex items-center font-semibold">
                    <span className="mr-2 cursor-pointer" onClick={postActions}>
                        {likes && user && likes.includes(user.id) ? (
                            <FaHeart />
                        ) : (
                            <FaRegHeart />
                        )}
                    </span>

                    {likes.length}
                </div>
                <div className="font-semibold flex items-center">
                    <span className="mr-5 opacity-75">
                        {moment(createdAt).fromNow()}
                    </span>

                    <span className="cursor-pointer bg-primary text-white px-2 py-1 rounded-md flex items-center hover:bg-dark">
                        {userName}
                    </span>
                </div>
            </div>
        </div>
    );
};
export default CardItem;
