import React from 'react';

const Sidebar = () => {
  return (
    <div className="flex flex-col bg-gray-800 w-64 h-full">
      <div className="flex items-center justify-center h-16 bg-gray-900 text-white text-xl font-semibold">
        Sidebar
      </div>
      <div className="overflow-y-auto flex-grow">
        {/* Sidebar content goes here */}
        <ul className="py-4">
          <li className="px-4 py-2 text-white hover:bg-gray-700 cursor-pointer">Link 1</li>
          <li className="px-4 py-2 text-white hover:bg-gray-700 cursor-pointer">Link 2</li>
          <li className="px-4 py-2 text-white hover:bg-gray-700 cursor-pointer">Link 3</li>
          {/* Add more sidebar links as needed */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
