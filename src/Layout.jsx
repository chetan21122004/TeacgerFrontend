



import React from 'react';
import { ListStudents } from './components/ListStudents';
import QrGenrator from './components/QrGenrator';
import Top from './components/top/Top';
import Middle from './components/middle/Middle';

function Layout() {
  return (
  <div 
  className='  flex bg-gray-300 h-screen w-screen flex-col  items-center'
  >
      <Top/>
      <Middle/> 
</div>
    );

     

  // </div>
}

export default Layout;


