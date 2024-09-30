// In your target component
import React from 'react';
import { useLocation } from 'react-router-dom';

const ViewImage = () => {
  const location = useLocation();
  const { base64data } = location.state || {}; // Access the passed state

  return (
    <div>
      {base64data ? (
        <img src={`data:image/png;base64,${base64data}`} alt="Base64" />
      ) : (
        <p>No image data available.</p>
      )}
    </div>
  );
};

export default ViewImage;
