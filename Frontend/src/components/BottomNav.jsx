import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaBookmark, FaBars } from "react-icons/fa";

const BottomNav = ({ role }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="fixed bottom-0 left-0 w-full flex justify-center items-center bg-transparent">
            <div className="bg-white/10 backdrop-blur-xl rounded-t-2xl shadow-lg w-full max-w-md flex items-center justify-between px-8 py-4">

                {role === "user" ? (
                    <>
                        {/* Home Button */}
                        <Link
                            to="/home"
                            className="flex flex-col items-center text-white hover:text-purple-400 transition"
                        >
                            <FaHome size={24} />
                            <span className="text-xs mt-1">Home</span>
                        </Link>

                        {/* Saved Button */}
                        <Link
                            to="/saved"
                            className="flex flex-col items-center text-white hover:text-purple-400 transition"
                        >
                            <FaBookmark size={24} />
                            <span className="text-xs mt-1">Saved</span>
                        </Link>
                    </>
                ) : (
                    <>
                        {/* Menu Button for Food Partner */}
                        <div className="flex justify-center w-full">
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
                            >
                                <FaBars size={20} />
                            </button>
                        </div>

                        {/* Menu Options */}
                        {menuOpen && (
                            <div className="absolute bottom-20 bg-white/10 backdrop-blur-xl p-4 rounded-xl shadow-xl flex flex-col gap-3">
                                <Link
                                    to="/login-user"
                                    className="text-white hover:text-purple-400 transition"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Login as User
                                </Link>
                                <Link
                                    to="/edit-profile"
                                    className="text-white hover:text-purple-400 transition"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Edit Profile
                                </Link>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default BottomNav;
