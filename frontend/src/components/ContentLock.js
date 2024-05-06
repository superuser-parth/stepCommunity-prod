import React from 'react';

const ContentLock = () => {
  const handleUpgrade = () => {
    // Handle navigation to payments page
    // Example: window.location.href = '/payments';
    console.log('Navigate to payments page');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-semibold text-center mb-6">Get a Pro membership to unlock this feature</h1>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
        onClick={handleUpgrade}
      >
        Upgrade to Pro
      </button>
    </div>
  );
};

export default ContentLock;
