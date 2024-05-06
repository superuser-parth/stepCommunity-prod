import React, { useState, useEffect } from 'react';
import AdminNavbar from './AdminNavbar';
import { useNavigate } from "react-router-dom";
import AdminSidebar from './AdminSidebar';
import axios from 'axios'

const AdminBrowse = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [minOrder, setMinOrder] = useState('');

  const navigate = useNavigate()

  useEffect(() => {
    // Fetch products from the API
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://stepcommunity-prod.onrender.com/admin/getProductsAdmin');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error('Failed to fetch products:', response.status);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);


  
  const handleDeleteProduct = async (productId) => {
    try {
      
      const response = await axios.delete(`https://stepcommunity-prod.onrender.com/admin/deleteProduct/${productId}`);
      console.log('Product deleted successfully:', response.data);
      window.location.reload(false);
      
      // Optionally, you can perform additional actions after successful product deletion
    } catch (error) {
      console.error('Error deleting product:', error);
      // Handle error appropriately, such as displaying a message to the user
    }
  };

  
 
  const filteredProducts = products.filter(product => {
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (minPrice === '' || product.price >= parseInt(minPrice)) &&
      (minOrder === '' || product.minOrder <= parseInt(minOrder))
    );
  });

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleMinPriceChange = event => {
    setMinPrice(event.target.value);
  };

  const handleMinOrderChange = event => {
    setMinOrder(event.target.value);
  };

  return (
    <div>
      <AdminNavbar />
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto py-8 px-4 max-w-3xl shadow-md rounded-lg">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Explore Listings</h2>
            <a href="/addproduct" className="bg-white hover:bg-slate-300 text-black font-bold py-2 px-4 rounded focus:outline-none border border-black">
              Add Product
            </a>
          </div>
  
          <div className="sticky top-0 bg-gray-100 min-h-32 z-0">
          
            <div className="mb-8">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search Products"
                className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-500 mt-8"
              />
            </div>
           {/* Additional filter fields for smaller screens */}
           <div className="lg:hidden mb-8">
              <input
                type="number"
                value={minPrice}
                onChange={handleMinPriceChange}
                placeholder="Min Price"
                className="border border-gray-300 rounded px-4 py-2 w-full mb-4 focus:outline-none focus:border-blue-500"
              />
              <input
                type="number"
                value={minOrder}
                onChange={handleMinOrderChange}
                placeholder="Max Order"
                className="border border-gray-300 rounded px-4 py-2 w-full mb-4 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={product.productImages[0]} alt={product.name} className="w-full h-64 object-cover" />
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-gray-600">₹{product.price}</p>
                  <p className="text-gray-600">Min Order: {product.minOrder}</p>
                  <div className="flex justify-between items-center mt-4">
                    <button
                
                      className="bg-white hover:bg-slate-300 text-black font-bold py-2 px-4 rounded focus:outline-none border border-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="bg-white hover:bg-slate-300 text-black font-bold py-2 px-4 rounded focus:outline-none  border border-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBrowse;
