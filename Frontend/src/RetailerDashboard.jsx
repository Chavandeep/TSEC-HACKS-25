import React from 'react';

const RetailerDashboard = () => {
    return (
        <div className="p-8 bg-gray-100 h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Retailer Dashboard</h1>
            <nav className="mb-8">
                <ul className="flex space-x-4">
                    <li><a href="#" className="text-indigo-500 hover:underline">Home</a></li>
                    <li><a href="#" className="text-indigo-500 hover:underline">Browse Products</a></li>
                    <li><a href="#" className="text-indigo-500 hover:underline">Orders</a></li>
                    <li><a href="#" className="text-indigo-500 hover:underline">Inventory Management</a></li>
                </ul>
            </nav>
            {/* Add your content here */}
        </div>
    );
};

export default RetailerDashboard;
