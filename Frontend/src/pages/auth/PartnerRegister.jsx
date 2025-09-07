import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function PartnerRegister() {

    const [businessName, setBusinessName] = useState(null)
    const [name, setName] = useState(null)
    const [phone, setPhone] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [address, setAddress] = useState(null)

    const navigate = useNavigate();

    const handleSubmit = async () => {

        try {
            
            const response = await axios.post("http://localhost:3000/api/auth/food-partner/register",
                {
                    businessName,
                    contactName: name,
                    phone,
                    address,
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
            console.error(err);
        }

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_center,_#284c72,_#2d4a6a,_#151c24)]">
            <div className="max-w-md w-full bg-[#1C2733] rounded-xl p-8 shadow-xl">

                <div className="flex flex-col items-center justify-center">
                    <h2 className="text-3xl font-bold text-gray-200 mb-1">Partner sign up</h2>
                    <p className="text-gray-400 text-sm font-thin mb-4">
                        Grow your business with our platform.
                    </p>

                    <p className="text-sm text-gray-400 font-light mb-6 flex gap-2">
                        Switch: <Link to="/user/register" className="hover:text-blue-400">User</Link>|
                        <Link to="/partner/register" className="text-blue-500">Partner</Link>
                    </p>
                </div>

                <div className="space-y-5">
                    <input
                        type="text"
                        name={businessName}
                        onChange={(e) => {setBusinessName(e.target.value)}}
                        placeholder="Business name"
                        className="w-full p-3 bg-[#2C3745] rounded-md text-white placeholder-gray-400 border border-transparent focus:border-blue-500 focus:outline-none"
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            name={name}
                            onChange={(e) => {setName(e.target.value)}}
                            placeholder="Contact name"
                            className="w-full p-3 bg-[#2C3745] rounded-md text-white placeholder-gray-400 border border-transparent focus:border-blue-500 focus:outline-none"
                        />
                        <input
                            type="tel"
                            name={phone}
                            onChange={(e) => {setPhone(e.target.value)}}
                            placeholder="+1 555 123 4567"
                            className="w-full p-3 bg-[#2C3745] rounded-md text-white placeholder-gray-400 border border-transparent focus:border-blue-500 focus:outline-none"
                        />
                    </div>
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
                        placeholder="Create password"
                        className="w-full p-3 bg-[#2C3745] rounded-md text-white placeholder-gray-400 border border-transparent focus:border-blue-500 focus:outline-none"
                    />
                    <div>
                        <input
                            type="text"
                            name={address}
                            onChange={(e)=> {setAddress(e.target.value)}}
                            placeholder="123 Market Street"
                            className="w-full p-3 bg-[#2C3745] rounded-md text-white placeholder-gray-400 border border-transparent focus:border-blue-500 focus:outline-none"
                        />
                        <p className="text-xs text-gray-400 mt-1">
                            Full address helps customers find you faster.
                        </p>
                    </div>

                    <button onClick={handleSubmit} className="w-full py-3 bg-blue-600 hover:bg-blue-700 hover:cursor-pointer rounded-md text-white font-medium">
                        Create Partner Account
                    </button>
                </div>

                <p className="mt-6 text-center text-gray-400 text-sm">
                    Already a partner?{" "}
                    <Link to="/partner/login" className="text-blue-500">Sign in</Link>
                </p>
            </div>
        </div>
    );
}
