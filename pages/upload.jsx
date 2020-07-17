import { useContext, useState, useEffect } from "react";

import { Button } from "../components/styled/Button";
import { UploadInput } from "../components/UploadInput";
import { FormInput } from "../components/FormInput";

import { UserContext } from "../lib/UserContext";
import { postImage } from "../lib/firebase";

import Router from "next/router";

const Upload = () => {
    const { user } = useContext(UserContext);
    const [caption, setCaption] = useState("");
    const [image, setImage] = useState("");
    const [imageBlob, setImageBlob] = useState("");
    useEffect(() => {
        setCaption(imageBlob.name || "");
    }, [imageBlob]);
    const onCaptionChangeHandler = (event) => {
        const caption = event.target.value;
        setCaption(caption);
    };
    const onImageChangeHandler = (image, blob) => {
        setImage(image);
        setImageBlob(blob);
    };
    const formSubmitHandler = (event) => {
        event.preventDefault();
        postImage(user.id, {
            userName: user.userName,
            image: imageBlob,
            caption,
        });
        Router.push("/");
    };
    return (
        <form
            className="w-full max-w-screen-sm m-auto flex  flex-col mt-5 bg-white rounded-sm p-5 shadow-md"
            onSubmit={formSubmitHandler}
        >
            <UploadInput onChange={onImageChangeHandler} image={image} />
            <FormInput
                placeholder="Caption"
                onChange={onCaptionChangeHandler}
                value={caption}
            />
            <Button fill type="submit" style={{ padding: 20 }}>
                Upload
            </Button>
        </form>
    );
};

export default Upload;
