


import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import axios from 'axios';

function QrGenerator({ initialSize, isGenerating }) {
  const [qrValue, setQRValue] = useState('');
  const [size, setSize] = useState(initialSize);



  useEffect(() => {
    setSize(initialSize);
  }, [initialSize]);

  useEffect(() => {
    let intervalId;

    const generateAndPostQR = async () => {
      try {
        // Generate a new tem_lec_id
        const tem_lec_id = Math.floor(Math.random() * 1000);
    
        // Get lec_id from local storage or any other source
        const lec_id = 102;
    
        // Send both lec_id and tem_lec_id to the server
        const response = await axios.post('http://localhost:2000/genrateqr', {
          lec_id: lec_id,
          tem_lec_id: tem_lec_id
        });
    
        console.log(response.data);
        // Update QR value with generated IDs
        // console.log(tem_lec_id);
        setQRValue(response.data);
    
      } catch (error) {
        console.error('Error generating and posting QR:', error);
      }
    };
    
    if (isGenerating) {
      // Call generateAndPostQR immediately
      generateAndPostQR();

      // Set interval to call generateAndPostQR every 8 seconds
      intervalId = setInterval(generateAndPostQR, 20000);
    }

    // Clean up interval when isGenerating changes or component unmounts
    return () => clearInterval(intervalId);
  }, [isGenerating]);

  return (
    <div className='flex items-center text-center'>
      <div>
        <h1 className='text-black m-2 text-lg'>QR For Be Present</h1>
        {isGenerating && <QRCode bgColor='#e0e0e0' value={qrValue} size={size} />}
      </div>
    </div>
  );
}

export default QrGenerator;
