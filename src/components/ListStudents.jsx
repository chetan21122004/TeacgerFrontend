// import React, { useState, useEffect } from 'react';
// import { FaUser } from "react-icons/fa";
// import {
//   List,
//   ListItem,
//   ListItemPrefix,
//   Card,
//   Typography,
// } from "@material-tailwind/react";
// import axios from 'axios';

// export function ListStudents() {
//   const gen = localStorage.getItem("genrating");
//   const [students, setStudents] = useState([]);
//   // useEffect(() => {
//   //   let eventSource;
  
//   //   if (gen) {
//   //     eventSource = new EventSource('https://stu-backend.vercel.app/events');
//   //     // eventSource = new EventSource('http://localhost:2000/events');
//   //     eventSource.onopen = () => {
//   //       console.log('SSE connection established');
//   //     };
  
//   //     eventSource.onmessage = (event) => {
//   //       const data = JSON.parse(event.data);
//   //       console.log('Received data:', data);
//   //       if (data) {
//   //         // Check if the student is already present in the students array by comparing student_id
//   //         setStudents(prevStudents => {
//   //           const isAlreadyPresent = prevStudents.some(student => student.student_id === data.student_id);
//   //           console.log(isAlreadyPresent);
//   //           if (!isAlreadyPresent) {
//   //             // Add the new student data to the existing list
//   //             return [...prevStudents, data];
//   //           } else {
//   //             console.log("Student already exists in the list");
//   //             return prevStudents;
//   //           }
//   //         });
//   //       }
//   //     };
  
//   //     eventSource.onerror = (error) => {
//   //       console.error('SSE error:', error);
//   //     };
//   //   }
  
//   //   return () => {
//   //     if (eventSource) {
//   //       eventSource.close();
//   //     }
//   //   };  // Cleanup on component unmount or when gen changes
//   // }, [gen]);
  
//   useEffect(() => {
//     const fetchStudent = async () => {
//   const lec_id = localStorage.getItem("lec_id");

//       try {
//         const response = await axios.post("https://stu-backend.vercel.app/students/get", { lec_id });
//         setStudents(response.data);
//       } catch (error) {
//         console.error('Error fetching students:', error);
//       }
//     };
//     if (gen) {
//       // Fetch students initially
//       fetchStudent();
  
//       // Set interval to fetch students every 5 seconds
//       const interval = setInterval(fetchStudent, 5000);
//     }

//     // Cleanup interval on component unmount
//     return () => clearInterval(interval);
//   }, [lec_id]);
 
//   return (
//     <div className=''>
//       <Card className="w-96">
//         <div style={{
//           maxHeight: '575px',
//           overflowY: 'auto',
//           transition: 'max-height 0.3s ease-in-out',
//           scrollbarWidth: 'none', // Hide scrollbar for Firefox
//           '-ms-overflow-style': 'none', // Hide scrollbar for IE and Edge
//         }}>
//           <List>
//             {students.length > 0 ? students.map((stu, index) => (
//               <ListItem key={`${stu.student_id}-${index}`} className='text-gray-300 hover:text-gray-800'>
//                 <ListItemPrefix>
//                   <div className="bg-blue-400 p-1 rounded-full">
//                     <FaUser className='h-8 w-8 hover:text-gray-800 rounded-full' />
//                   </div>
//                 </ListItemPrefix>
//                 <div>
//                   <Typography variant="h6" color="blue-gray">
//                     {stu.first_name + ' ' + stu.last_name}
//                   </Typography>
//                   <Typography variant="small" color="gray" className="font-normal">
//                     ID: {stu.student_id}
//                   </Typography>
//                 </div>
//               </ListItem>
//             )) : (<></>
//             )}
//           </List>
//         </div>
//       </Card>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import { FaUser } from "react-icons/fa";
import {
  List,
  ListItem,
  ListItemPrefix,
  Card,
  Typography,
} from "@material-tailwind/react";
import axios from 'axios';

export function ListStudents() {
  const gen = localStorage.getItem("genrating");
  const [students, setStudents] = useState([]);
  const [lecId, setLecId] = useState(localStorage.getItem("lec_id"));
  const lec_id =102; // Ensure this is up-to-date
  useEffect(() => {
    localStorage.removeItem("lec_id")
  
  }, [])
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.post("https://stu-backend.vercel.app/students/get", { lec_id });
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    let interval;
    if (gen) {
      // Fetch students initially
      fetchStudent();

      // Set interval to fetch students every 5 seconds
      interval = setInterval(fetchStudent, 3000);
    }

    // Cleanup interval on component unmount or when lecId changes
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gen, lecId]);
 

  return (
    <div className=''>
      <Card className="w-96">
        <div style={{
          maxHeight: '575px',
          overflowY: 'auto',
          transition: 'max-height 0.3s ease-in-out',
          scrollbarWidth: 'none', // Hide scrollbar for Firefox
          '-ms-overflow-style': 'none', // Hide scrollbar for IE and Edge
        }}>
          <List>
            {students.length > 0 ? students.map((stu, index) => (
              <ListItem key={`${stu.student_id}-${index}`} className='text-gray-300 hover:text-gray-800'>
                <ListItemPrefix>
                  <div className="bg-blue-400 p-1 rounded-full">
                    <FaUser className='h-8 w-8 hover:text-gray-800 rounded-full' />
                  </div>
                </ListItemPrefix>
                <div>
                  <Typography variant="h6" color="blue-gray">
                    {stu.first_name + ' ' + stu.last_name}
                  </Typography>
                  <Typography variant="small" color="gray" className="font-normal">
                    ID: {stu.student_id}
                  </Typography>
                </div>
              </ListItem>
            )) : (<></>
            )}
          </List>
        </div>
      </Card>
    </div>
  );
}
