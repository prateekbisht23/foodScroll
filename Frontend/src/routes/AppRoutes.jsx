import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserLogin from '../pages/auth/UserLogin';
import UserRegister from '../pages/auth/UserRegister';
import PartnerLogin from '../pages/auth/PartnerLogin';
import PartnerRegister from '../pages/auth/PartnerRegister';
import Home from '../pages/common/Home';
import AddFoodItem from '../pages/food-partner/AddFoodItem.jsx';
import Profile from '../pages/food-partner/Profile';


const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/user/login" element={<UserLogin />} />
                <Route path="/user/register" element={<UserRegister />} />
                <Route path="/food-partner/login" element={<PartnerLogin />} />
                <Route path="/food-partner/register" element={<PartnerRegister />} />
                <Route path='/food-partner/:id' element={<Profile />} />
                <Route path='/add-item' element={<AddFoodItem />} />
                <Route path='/' element={<Home />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes