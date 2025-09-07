import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function PartnerLogin() {

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const navigate = useNavigate();

    const handleSubmit = async () => {

        try {
            
            const response = await axios.post("http://localhost:3000/api/auth/food-partner/login",
                {
                    email,
                    password
                },
                {
                    withCredentials: true
                }
            )

            console.log(response)

            navigate("/add-item")

        } catch (err) {
            console.error(err)
        }

    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_center,_#284c72,_#2d4a6a,_#151c24)]">
            <div className="max-w-md w-full bg-[#1c2733] rounded-xl p-8 shadow-xl">

                <div className="flex flex-col justify-center items-center">
                    <h2 className="text-3xl font-bold text-gray-200 mb-1">Partner login</h2>
                    <p className="text-gray-400 font-thin text-sm mb-4">
                        Access your business dashboard.
                    </p>

                    <p className="text-sm text-gray-400 font-light mb-6 flex gap-2">
                        Switch: <Link to="/user/register" className="hover:text-blue-400">User</Link>|
                        <Link to="/partner/register" className="text-blue-500">Partner</Link>
                    </p>
                </div>

                <div className="space-y-5">
                    <input
                        type="email"
                        name={email}
                        onChange={(e) => {setEmail(e.target.value)}}
                        placeholder="business@example.com"
                        className="w-full p-3 bg-[#2C3745] rounded-md text-white placeholder-gray-400 border border-transparent focus:border-blue-500 focus:outline-none"
                    />
                    <input
                        type="password"
                        name={password}
                        onChange={(e) => {setPassword(e.target.value)}}
                        placeholder="Password"
                        className="w-full p-3 bg-[#2C3745] rounded-md text-white placeholder-gray-400 border border-transparent focus:border-blue-500 focus:outline-none"
                    />

                    <button onClick={handleSubmit} className="w-full py-3 bg-blue-600 hover:bg-blue-700 hover:cursor-pointer rounded-md text-white font-medium">
                        Sign In
                    </button>
                </div>

                <p className="mt-6 text-center text-gray-400 text-sm">
                    Don't have an account?{" "}
                    <Link to="/partner/register" className="text-blue-500">Sign up</Link>
                </p>
            </div>
        </div>
    );
}
