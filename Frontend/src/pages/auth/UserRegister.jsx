import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function UserRegister() {

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/auth/user/register",
                {
                    fullName: firstName + " " + lastName,
                    email,
                    password
                },
                {
                    withCredentials: true
                }
            )

            console.log("Axios call successfull : ", response.data);

            navigate('/');

        } catch (err) {
            console.error(err);
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_center,_#284c72,_#2d4a6a,_#151c24)]">
            <div className="max-w-md w-full bg-[#1C2733] rounded-xl p-8 shadow-xl">

                <div className="flex flex-col justify-center items-center">
                    <h2 className="text-3xl font-bold text-gray-200 mb-1">Create your account</h2>
                    <p className="text-gray-400 text-sm font-thin mb-4">
                        Join to explore and enjoy delicious meals.
                    </p>

                    <p className="text-sm text-gray-400 font-light mb-6 flex gap-2">
                        Switch:<Link to="/user/register" className="text-blue-500">User</Link>|
                        <Link to="/partner/register" className="hover:text-blue-400">Partner</Link>
                    </p>
                </div>

                <div className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            name={firstName}
                            onChange={(e) => { setFirstName(e.target.value) }}
                            placeholder="First name"
                            className="w-full p-3 bg-[#2C3745] rounded-md text-white placeholder-gray-400 border border-transparent focus:border-blue-500 focus:outline-none"
                        />
                        <input
                            type="text"
                            name={lastName}
                            onChange={(e) => { setLastName(e.target.value) }}
                            placeholder="Last name"
                            className="w-full p-3 bg-[#2C3745] rounded-md text-white placeholder-gray-400 border border-transparent focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                    <input
                        type="email"
                        name={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        placeholder="you@example.com"
                        className="w-full p-3 bg-[#2C3745] rounded-md text-white placeholder-gray-400 border border-transparent focus:border-blue-500 focus:outline-none"
                    />
                    <input
                        type="password"
                        name={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        placeholder="Create password"
                        className="w-full p-3 bg-[#2C3745] rounded-md text-white placeholder-gray-400 border border-transparent focus:border-blue-500 focus:outline-none"
                    />

                    <button onClick={handleSubmit} className="w-full py-3 bg-blue-600 hover:bg-blue-700 hover:cursor-pointer rounded-md text-white font-medium">
                        Sign Up
                    </button>
                </div>

                <p className="mt-6 text-center text-gray-400 text-sm">
                    Already have an account?{" "}
                    <Link to="/user/login" className="text-blue-500">Sign in</Link>
                </p>
            </div>
        </div>
    );
}
