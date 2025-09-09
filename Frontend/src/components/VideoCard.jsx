import React, { useState } from "react";
import { Link } from "react-router-dom";
import SmoothDescription from "./SmoothDescription";
import axios from "axios";

const VideoCard = ({
    item,
    setVideoRef,
    defaultLiked = false,
    defaultSaved = false,
}) => {
    const [liked, setLiked] = useState(defaultLiked);
    const [saved, setSaved] = useState(defaultSaved);

    async function handleLike() {
        try {
            const response = await axios.post(
                "http://localhost:3000/api/food/like",
                { foodId: item._id },
                { withCredentials: true }
            );

            if (response.status === 201 || response.status === 200) {
                setLiked(!liked);
            }
        } catch (error) {
            console.error("Error liking the item:", error);
        }
    }

    async function handleSave() {
        try {
            const response = await axios.post(
                "http://localhost:3000/api/food/save",
                { foodId: item._id },
                { withCredentials: true }
            );

            if (response.status === 201 || response.status === 200) {
                setSaved(!saved);
            }
        } catch (error) {
            console.error("Error saving the item:", error);
        }
    }

    return (
        <div
            key={item._id}
            className="h-screen w-full relative snap-start flex items-center justify-center bg-black"
        >
            {/* Video */}
            <video
                ref={setVideoRef(item._id)}
                src={item.video}
                loop
                muted
                playsInline
                preload="metadata"
                className="absolute top-0 left-0 w-full h-full object-cover"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/60"></div>

            {/* Top-left dish name */}
            <div className="absolute top-6 left-6 text-white text-2xl font-bold">
                {item.name}
            </div>

            {/* Bottom content */}
            <div className="absolute bottom-10 w-full flex flex-col items-baseline px-6">
                <div className="flex justify-between w-full">
                    <Link
                        to={`/food-partner/${item.foodPartner}`}
                        className="bg-white/10 backdrop-blur-lg text-white text-lg font-medium px-8 py-3 rounded-full hover:bg-white/20 transition"
                    >
                        Visit Store
                    </Link>
                    <div className="flex gap-2">
                        {/* Like Button */}
                        <button
                            onClick={handleLike}
                            className="bg-white/10 backdrop-blur-lg text-white text-lg font-medium px-2 flex justify-center items-center rounded-full hover:bg-white/20 transition"
                        >
                            {liked ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="size-7"
                                >
                                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-7"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                                    />
                                </svg>
                            )}
                        </button>

                        {/* Save Button */}
                        <button
                            onClick={handleSave}
                            className="bg-white/10 backdrop-blur-lg text-gray-200 text-lg font-thin px-2 flex justify-center items-center rounded-full hover:bg-white/20 transition"
                        >
                            {saved ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="size-7"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-7"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
                <SmoothDescription description={item.description} />
            </div>
        </div>
    );
};

export default VideoCard;