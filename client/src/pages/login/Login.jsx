import { BookAIcon, Key, User2 } from 'lucide-react';
import React, { useState } from 'react'
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import { useLoginContext } from '../../states/UserLoginContext.jsx';
import Cookies from 'js-cookie';
import { useUserContext } from '../../states/UserDataContext.jsx';

function Login() {
 const navigate = useNavigate();
 const {authenticationKey,setAuthentication} = useLoginContext();
 const {setUserData} = useUserContext();
    const [userData,setFormData] = useState({
        userID:'',
        password:''
    });

    const handleInputChnage = (e)=>{
        const{name,value} = e.target;
        setFormData((prevData)=>({
            ...prevData,
            [name]:value
        }))
    };
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
          // console.log(userData);
          const response = await axios.post('http://localhost:5000/login', userData, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
      
          if (response.status === 200) {
            alert('Login successfully');
            const data = await response.data;
            console.log(data.token.token);
            setAuthentication(data.token.token); // Pass the JWT token to the parent component
            setUserData(data.userData);
            // Store the token in a cookie
            sessionStorage.setItem('isLogedIn',true);
            sessionStorage.setItem('userId',data.userData.UserID);
            Cookies.set('jwtToken', data.token.token, { expires: 1 });
            navigate('/home');
          }
        } catch (error) {
          console.log(error);
        }
      };
// console.log(userData);
  return (
    <div className='flex flex-col gap-20 items-center w-full h-screen bg-blue-100 bg-opacity-25 '>
      <h2 className='text-4xl mt-20 text-gray-700'>Login Your Self to track you Task</h2>
    <div className=''>
        <form onSubmit={handleFormSubmit} className=' p-4 flex flex-col justify-center items-center  gap-4 bg-white  mx-2 lg:w-full upcard'>
        <h2 className='text-xl'>Manage your work efficiently with <span className='text-blue-800 font-bold text-xl'>WORK-HUB</span></h2>
<div className='w-full flex flex-row gap-2 items-center'>
    <User2 size={40} className='border border-black rounded-full p-2'/>
            <input type="text" placeholder='UserID' className='outline-none border p-2 w-full' name="userID" id="userId" value={userData.userID} onChange={handleInputChnage} />
            </div>
  
            <div className='flex flex-row w-full gap-2 items-center'>

            <Key size={40} className='border  border-black rounded-full p-2'/>

            <input type="password" placeholder='Password' className=' border outline-none p-2 w-full' name="password" id="userId" value={userData.password} onChange={handleInputChnage} />
            </div>
            <button type='submit' className=' bg-blue-800 text-white   p-2'>Login</button>
        </form>

    </div>
    <Link to='/signup' className='text-normal text-blue-700' >Regiser yourself!</Link>

    </div>
  )
}

export default Login