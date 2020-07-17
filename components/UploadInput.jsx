import React, { useState, useRef, useEffect, useMemo } from "react";
import styled from "styled-components";
import { MdFileUpload } from "react-icons/md";
import { FaUpload, FaCloudDownloadAlt } from "react-icons/fa";

const DropArea = styled.div`
    height: 100%;
    width: 100%;
    border: 2px solid rgba(0, 0, 0, 0.6);
    background: ${(props) => props.theme.light};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    &.active {
        border: 2px dotted rgba(0, 0, 0, 0.6);
    }
`;
const Container = styled.div`
    width: 100%;
    height: 300px;
    position: relative;
`;
const PreviewImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;
const FileInput = styled.input`
    opacity: 0;
    top: 0;
    left: 0;
    position: absolute;
`;
let dragCounter = 0;
export const UploadInput = ({ onChange, image }) => {
    const [reader, setReader] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        setReader(new FileReader());
    }, []);
    const handleDrag = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };
    const handleDragIn = (event) => {
        event.preventDefault();
        event.stopPropagation();

        dragCounter += 1;
        if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
            setIsDragging(true);
        }
    };
    const handleDragOut = (event) => {
        event.preventDefault();
        event.stopPropagation();

        dragCounter -= 1;
        if (dragCounter > 0) return;

        setIsDragging(false);
    };
    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragging(false);

        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            event.dataTransfer.clearData();
            dragCounter = 0;

            const file = event.dataTransfer.files[0];
            readImage(file);
        }
    };
    const onFileInputChangeHandler = (event) => {
        const file = event.target.files[0];
        readImage(file);
    };
    const handleDropAreaClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const readImage = (file) => {
        reader.readAsDataURL(file);
        reader.onloadend = (event) => {
            if (event.target) {
                onChange(event.target.result, file);
            }
        };
    };

    return (
        <div className="w-full h-64 relative">
            {isDragging ? (
                <div className="bg-light w-full h-full absolute flex justify-center items-center pointer-events-none ">
                    <FaCloudDownloadAlt className="text-5xl text-accent" />
                </div>
            ) : (
                ""
            )}
            {image ? (
                <PreviewImage src={image} onClick={handleDropAreaClick} />
            ) : (
                <div
                    onDragEnter={handleDragIn}
                    onDragLeave={handleDragOut}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    dragging={isDragging}
                    onClick={handleDropAreaClick}
                    className="border-2 border-dashed w-full h-full border-gray-400 flex justify-center items-center"
                >
                    <MdFileUpload />
                    {isDragging
                        ? "Drop your image here"
                        : "Drag and drop an Image"}
                </div>
            )}
            <FileInput
                ref={fileInputRef}
                type="file"
                onChange={onFileInputChangeHandler}
            />
        </div>
    );
};
