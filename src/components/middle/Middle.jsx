// import React from 'react'
// import { ListStudents } from '../ListStudents'
// import QrGenrator from '../QrGenrator'

// function Middle() {
//   return (
//     <div className='flex items-center m-2 justify-evenly w-screen'>
//         <div className=" ">
//         <ListStudents />
//         </div>
//         <div className=" md:block  hidden">
//         <QrGenrator  in ={250} />
//         </div>
//         <div className=" md:block hidden">
//         <ListStudents/>
//         </div>
            
//     </div>
//   )
// }

// export default Middle



import { Button } from "@material-tailwind/react";

import React, { useState } from 'react';
import QrGenerator from '../QrGenrator';
import { useEffect } from 'react';
import { ListStudents } from "../ListStudents";

function Middle() {
  const [isGenerating, setIsGenerating] = useState(false);
  useEffect(() => {
    localStorage.removeItem("genrating")
  
  }, [])
  
function stoptogle() {

  setIsGenerating(false);
    localStorage.removeItem("genrating")
  
}
  const handleGenerateToggle = () => {
    setIsGenerating(true);
    localStorage.setItem("genrating",true)
  };


  return (
    <div className='flex items-center m-2 justify-evenly w-screen'>
      <div className=" ">
        <ListStudents />
      </div>
      <div className="md:flex flex-col items-center justify-center hidden">
      {!isGenerating ? (
        <Button onClick={handleGenerateToggle} className=" bg-white" variant="outlined">Generate</Button>
      ) : (
        <Button onClick={stoptogle} className=" bg-white" variant="outlined">Stop Generate</Button>
        )}
        {isGenerating ? (
          <QrGenerator  initialSize={250} isGenerating={isGenerating} />
        ) : (
          <></>
        )}
        
      </div>
      <div className="md:block hidden">
        <ListStudents/>
      </div>
    </div>
  );
}

export default Middle;
