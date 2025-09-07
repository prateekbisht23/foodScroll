import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';

const Profile = () => {

    const { id } = useParams();
    const [business, setBusiness] = useState(null)
    const [videos, setVideos] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3000/api/food-partner/${id}`,
            {
                withCredentials: true
            }
        )
            .then(response => {
                setBusiness(response.data.foodPartner)
                setVideos(response.data.foodPartner.foodItems)
            })
    }, [id])

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
            <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {videos?.map((video, index) => (
                    <div
                        key={index}
                        className="relative overflow-hidden rounded-xl shadow-md group"
                    >
                        <video
                            src={video.video}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            muted
                        />
                    </div>
                ))}
            </div>

            {/* Floating Action Button */}
            <Link to="/add-item" className="fixed bottom-6 right-6 h-12 w-12 flex justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-4xl text-center font-thin rounded-full shadow-lg transition-transform">
                +
            </Link>
        </div>
    );
};

export default Profile;
