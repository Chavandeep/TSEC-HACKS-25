import React from 'react';

const FarmerDashboard = () => {
    return (
        <div className="p-8 bg-gray-100 h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Farmer Dashboard</h1>
            <nav className="mb-8">
                <ul className="flex space-x-4">
                    <li><a href="#" className="text-indigo-500 hover:underline">Home</a></li>
                    <li><a href="#" className="text-indigo-500 hover:underline">Manage Products</a></li>
                    <li><a href="#" className="text-indigo-500 hover:underline">View Orders</a></li>
                    <li><a href="#" className="text-indigo-500 hover:underline">Analytics</a></li>
                </ul>
            </nav>
        </div>
    );
};

export default FarmerDashboard;
