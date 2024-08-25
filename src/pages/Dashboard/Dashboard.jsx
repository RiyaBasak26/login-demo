import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice'; 
import './style.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); 

  const handleUserProfile = () => {
    navigate('/updata-profile');
  };

  const handleLogout = () => {
    dispatch(logout()); 
    navigate('/login'); 
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-900 p-4 text-white">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <button
              onClick={handleUserProfile}
              className="bg-white text-blue-600 py-2 px-4 rounded hover:bg-gray-200"
            >
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="flex-grow bannerImg flex flex-col items-center justify-center p-4 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-4">Welcome, {user?.name || 'User'}!</h2>
          <p className="text-gray-400 mb-4">
            This is your dashboard. Here you can manage your profile.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
