
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

  const fetchStudents = async () => {
    try {
      // const response = await axios.post('http://localhost:2000/students/get', { lec_id: 102 });
      const response = await axios.post('https://stu-backend.vercel.app/students/get', { lec_id: 102 });
      console.log(response.data);
      if (response.data !== students){
        setStudents(response.data);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    let intervalId;

    if (gen) {
      intervalId = setInterval(fetchStudents, 3000);
    }

    return () => clearInterval(intervalId);  // Cleanup on component unmount or when gen changes
  }, [gen]);

  return (
    <div className='m-1'>
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
