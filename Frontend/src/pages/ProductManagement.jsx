import React from 'react';

function ProductManagement() {
  const products = [
    { id: 1, name: 'Organic Tomatoes', category: 'Vegetables', price: '₹50/kg', stock: 100 },
    { id: 2, name: 'Fresh Mangoes', category: 'Fruits', price: '₹120/kg', stock: 50 },
    { id: 3, name: 'Wheat Grains', category: 'Grains', price: '₹40/kg', stock: 200 },
  ];

  const handleEdit = (productId) => {
    // Edit product logic here
  };

  const handleDelete = (productId) => {
    // Delete product logic here
  };

  return (
    <>
    <div className="w-screen h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Product Management</h2>

        {/* Search and Add New Product */}
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search products..."
            className="w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
            Add New Product
          </button>
        </div>

        {/* Product Table */}
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Product Name</th>
                <th className="py-3 px-6 text-left">Category</th>
                <th className="py-3 px-6 text-center">Price</th>
                <th className="py-3 px-6 text-center">Stock</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{product.name}</td>
                  <td className="py-3 px-6 text-left">{product.category}</td>
                  <td className="py-3 px-6 text-center">{product.price}</td>
                  <td className="py-3 px-6 text-center">{product.stock}</td>
                  <td className="py-3 px-6 text-center">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-blue-600"
                      onClick={() => handleEdit(product.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end mt-6">
          <button className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg mr-2">Previous</button>
          <button className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg">Next</button>
        </div>
      </div>
    </div>
    </>
  );
}

export default ProductManagement;
