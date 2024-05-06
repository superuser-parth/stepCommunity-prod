import React, { useState } from 'react';
import axios from 'axios';
import { getToken } from '../../lib/AuthContext';
import AdminNavbar from './AdminNavbar';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {


  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    minOrder: '',
    contact: '',
    productImages: [],
  });

  const [imageUrl, setImageUrl] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddImage = () => {
    if (imageUrl.trim() !== '') {
      setFormData({ ...formData, productImages: [...formData.productImages, imageUrl] });
      setImageUrl('');
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formData.productImages];
    updatedImages.splice(index, 1);
    setFormData({ ...formData, productImages: updatedImages });
  };

  const handleSubmit = async (event) => {
    console.log(formData)
    event.preventDefault();
    try {
      const token = getToken();
      const response = await axios.post(
        'https://stepcommunity-prod.onrender.com/admin/addProduct',
        {
          ...formData,
          productImages: formData.productImages.join(','), // Convert image URLs to comma-separated string
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log('Product added successfully:', response.data);
      navigate('/adminbrowse');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="flex justify-center items-center">
        <div>
          <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-4">Add Product</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
              />
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
              />
              <input
                type="number"
                name="minOrder"
                value={formData.minOrder}
                onChange={handleChange}
                placeholder="Min Order"
                className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
              />
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Contact Information"
                className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
              />
             
              <div className="flex align-middle">
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Image URL"
                className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="bg-white hover:bg-slate-300 text-black font-bold py-2 px-4 rounded border border-black w-32 h-10"
              >
                Add Image
              </button>
              </div>
              <div className="flex flex-wrap mt-4">
                {formData.productImages.map((imageUrl, index) => (
                  <div key={index} className="relative m-2">
                    <img src={imageUrl} alt={`Image ${index}`} className="w-32 h-32" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 p-1 rounded-full bg-white text-red-600"
                    >
                      <div className="w-4 h-4">X</div>
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="submit"
                className="bg-white hover:bg-slate-300 text-black font-bold py-2 px-4 rounded border border-black"
              >
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
