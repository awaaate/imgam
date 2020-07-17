import React, { useContext } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import moment from "moment";

import { likePost, unlikePost} from "../../lib/firebase.js";
import { UserContext } from "../../lib/UserContext";
import { useLoginModalContext } from "../../lib/LoginModalContext.js";

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
