import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserLogin from '../pages/auth/UserLogin';
import UserRegister from '../pages/auth/UserRegister';
import PartnerLogin from '../pages/auth/PartnerLogin';
import PartnerRegister from '../pages/auth/PartnerRegister';
import Home from '../pages/common/Home';
import AddFoodItem from '../pages/food-partner/AddFoodItem';


const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/user/login" element={<UserLogin />} />
                <Route path="/user/register" element={<UserRegister />} />
                <Route path="/partner/login" element={<PartnerLogin />} />
                <Route path="/partner/register" element={<PartnerRegister />} />
                <Route path='/' element={<Home />} />
                <Route path='/add-item' element={<AddFoodItem />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes