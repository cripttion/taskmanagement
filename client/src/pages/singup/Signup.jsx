import { BookAIcon, Key, User2 } from 'lucide-react';
import React, { useState } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
function Signup() {
 const navigate = useNavigate();
    const [userData,setUserData] = useState({
        userID:'',
        name:'',
        password:''
    });

    const handleInputChnage = (e)=>{
        const{name,value} = e.target;
        setUserData((prevData)=>({
            ...prevData,
            [name]:value
        }))
    };
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('https://task-management-okh1.onrender.com/addUser', userData, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
      
          if (response.status === 200) {
            alert('User registered successfully');
            navigate('/');
          }
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <div className='flex flex-col  justify-center items-center w-full h-screen bg-blue-100 bg-opacity-25 '>
    <div className=''>
        <form onSubmit={handleFormSubmit} className=' p-4 flex flex-col justify-center items-center  gap-4 bg-white  mx-2 lg:w-full upcard'>
        <h2 className='text-xl'>Manage your work efficiently with <span className='text-blue-800 font-bold text-xl'>WORK-HUB</span></h2>
<div className='w-full flex flex-row gap-2 items-center'>
    <User2 size={40} className='border border-black rounded-full p-2'/>
            <input type="text" placeholder='UserID' className='outline-none border p-2 w-full' name="userID" id="userId" value={userData.userID} onChange={handleInputChnage} />
            </div>
  <div className='w-full flex flex-row gap-2 items-center'>
  <BookAIcon size={40} className='border  border-black rounded-full p-2'/>

            <input type="text" placeholder='Name' className='outline-none p-2 w-full border' name="name" id="name" value={userData.name} onChange={handleInputChnage} />
            </div>
            <div className='flex flex-row w-full gap-2 items-center'>

            <Key size={40} className='border  border-black rounded-full p-2'/>

            <input type="password" placeholder='Password' className=' border outline-none p-2 w-full' name="password" id="userId" value={userData.password} onChange={handleInputChnage} />
            </div>
            <button type='submit' className=' bg-blue-800 text-white   p-2'>Sign-up</button>
        </form>
    </div>
    </div>
  )
}

export default Signup