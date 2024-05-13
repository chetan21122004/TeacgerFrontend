import React, { useState, useEffect } from 'react';
import { FaUser } from "react-icons/fa";

import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
  Button,
} from "@material-tailwind/react";
import axios from 'axios';

export function ListStudents() {
  const [students, setStudents] = useState([]);
  const fetchStudents = async () => {
    try {
      const response = await axios.get('https://stu-backend.vercel.app/students/get');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };
  
  useEffect(() => {

    fetchStudents();
  }, []);

  return (
    <div className='    m-1'>
    
    <Card className="w-96">
      <div style={{
        maxHeight: '575px ',
        overflowY: 'auto',
        transition: 'max-height 0.3s ease-in-out', // Added transition property
        scrollbarWidth: 'none', // Hide scrollbar for Firefox
        '-ms-overflow-style': 'none', // Hide scrollbar for IE and Edge
        '&::-webkit-scrollbar': {
          width: '0', // Hide scrollbar for Chrome, Safari, and Opera
        },
      }}>
        <List>
          {students.map((stu, index) => (
            <ListItem key={`${stu.student_id}-${index}`} className='text-gray-300  hover:text-gray-800'>
              <ListItemPrefix>

                <div className=" bg-blue-400 p-1 rounded-full ">
                <FaUser className=' h-8 w-8   hover:text-gray-800 rounded-full' />

                </div>

                {/* <Avatar variant="circular" alt={stu.first_name} src={stu.student_dp} /> */}
              </ListItemPrefix>
              <div>
                <Typography variant="h6" color="blue-gray">
                  {stu.first_name +' '+ stu.last_name }
                </Typography>
                <Typography variant="small" color="gray" className="font-normal">
                  ID: {stu.student_id}
                </Typography>
              </div>
            </ListItem>
          ))}
        </List>
      </div>
    </Card>
    </div>
  );
}
