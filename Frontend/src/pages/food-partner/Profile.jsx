import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
    const { id } = useParams();
    const [business, setBusiness] = useState(null);
    const [videos, setVideos] = useState([]);
    const [isFoodPartner, setIsFoodPartner] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();

    async function handleLogout() {
        const response = await axios.get("http://localhost:3000/api/auth/food-partner/logout")

        console.log(response);

        navigate('/user/login');
    }

    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/food-partner/${id}`, {
                withCredentials: true,
            })
            .then((response) => {
                setBusiness(response.data.foodPartner);
                setVideos(response.data.foodPartner.foodItems);
            });

        axios
            .get("http://localhost:3000/api/auth/user", { withCredentials: true })
            .then((response) => {
                setIsFoodPartner(response.data.user.role === "food-partner");
            });
    }, [id]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
            {/* Header Section */}
            <div className="p-6 flex items-center gap-6 border-b border-white/10">
                {/* Profile Picture */}
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/20 shadow-lg">
                    <img
                        src="https://avatar.iran.liara.run/public"
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Info */}
                <div className="flex-1">
                    <h1 className="text-2xl font-bold">{business?.businessName}</h1>
                    <p className="text-gray-400 text-sm">{business?.address}</p>

                    {/* Stats Row */}
                    <div className="flex gap-6 mt-3">
                        <div>
                            <p className="text-lg font-semibold">{business?.totalMeals}</p>
                            <p className="text-gray-400 text-xs">Meals</p>
                        </div>
                        <div>
                            <p className="text-lg font-semibold">{business?.customersServed}</p>
                            <p className="text-gray-400 text-xs">Customers</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid of Videos */}
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                {videos?.map((video, index) => (
                    <div
                        key={index}
                        className="relative overflow-hidden rounded-xl shadow-md group bg-black"
                        style={{ height: "18em" }} // Ensure all cards are the same size
                    >
                        {/* Video */}
                        <video
                            src={video.video}
                            className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            muted
                        />

                        {/* Dish Name and Stats */}
                        <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-black to-transparent text-white p-4">
                            <div className="absolute bottom-5">
                                <h2 className="text-xl font-serif font-bold mb-2">
                                    {video.name}
                                </h2>
                                <div className="flex justify-items-start gap-5 text-sm text-gray-300">
                                    <span>{video.likeCount} Likes</span>
                                    <span>{video.saveCount} Saves</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="fixed bottom-6 w-full px-7 flex justify-between">
                {/* Menu Button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="h-12 w-12 flex justify-center items-center bg-black/30 backdrop-blur-lg rounded-full"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7">
                        <path
                            fillRule="evenodd"
                            d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>

                {isFoodPartner && (
                    <Link
                        to="/add-item"
                        className="h-12 w-12 flex justify-center items-center bg-black/30 backdrop-blur-lg rounded-full shadow-lg transition-transform"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7">
                            <path
                                fillRule="evenodd"
                                d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </Link>
                )}
            </div>

            {/* Dropdown Menu */}
            {menuOpen && (
                <div className="absolute bottom-20 left-7 bg-black/50 backdrop-blur-lg rounded-lg shadow-lg p-4">
                    {isFoodPartner && (
                        <Link
                            to="/edit-profile"
                            className="block text-white hover:text-gray-300 mb-2"
                        >
                            Edit Profile
                        </Link>
                    )}
                    {!isFoodPartner && (
                        <Link
                            to="/saved"
                            className="block text-white hover:text-gray-300 mb-2"
                        >
                            Saved
                        </Link>
                    )}
                    <button
                        onClick={handleLogout}
                        className="block text-white hover:text-gray-300"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default Profile;