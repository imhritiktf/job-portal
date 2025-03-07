import React from 'react'

const NotFound = () => {
    return (
        <div className="h-screen flex justify-center items-center bg-gray-100">
          <div className="text-center">
            <h1 className="text-9xl font-bold text-gray-500 mb-4">404</h1>
            <h2 className="text-3xl font-bold text-gray-700 mb-4">Page Not Found</h2>
            <p className="text-lg text-gray-600 mb-8">The page you are looking for does not exist.</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.history.back()}>Go Back</button>
          </div>
        </div>
      );
}

export default NotFound