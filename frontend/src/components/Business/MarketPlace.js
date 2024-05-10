import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import { getToken } from '../../lib/AuthContext';
import { Link } from 'react-router-dom';

const MarketPlace = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [minOrder, setMinOrder] = useState('');

  useEffect(() => {
    // Fetch products from the API
    const fetchProducts = async () => {
      const token = getToken();
      try {
        const response = await fetch('https://stepcommunity-prod.onrender.com/api/getProducts', {
          headers: {
            Authorization: token
          }
        });

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
      <Navbar />
      <div className="bg-gray-100 min-h-screen flex flex-col lg:flex-row ">
        {/* Sidebar */}

        <div className="lg:w-96 bg-gray-200 p-4 hidden lg:block">
          <div className="sticky top-8 mt-4">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
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
        {/* Listings */}
        <div className="container py-8 px-4 max-w-3xl shadow-md rounded-lg ml-0 md:ml-24">
          <div className="sticky top-0 bg-gray-100 min-h-32 z-0">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Listings</h2>
            </div>
            <div className="mb-8">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search Products"
                className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-500"
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
                  <p className="text-gray-600"> ₹{product.price}</p>
                  <p className="text-gray-600">Min Order: {product.minOrder}</p>
                  <p className="text-gray-600">Contact Vendor: {product.contact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPlace;
