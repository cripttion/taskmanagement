import React, { useEffect, useState } from 'react';
import { ArrowRight, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';
import { useUserContext } from '../states/UserDataContext';
import Cookies from 'js-cookie';
const Header = () => {
  const navigate = useNavigate();
  const [isLogined, setIsLogined] = useState();
  const[text,setText] = useState('Login');
  const{userData} = useUserContext();
 
  const data= sessionStorage.getItem('isLogedIn');
  useEffect(()=>{
      setIsLogined(sessionStorage.getItem('isLogedIn'));
  },[data ])
  const handleLogoutClick = ()=>{
    sessionStorage.clear();
    setIsLogined(false);
    Cookies.remove('jwtToken');
    navigate('/');/*  */
  }

  return (
    <>
      <div className='flex bg-blue-800 text-white p-4 flex-row md:flex-row lg:flex-row justify-around items-center text-2xl font-medium '>
        <h1 className=''>WORK-HUB</h1>
        <h2>{userData.Name}</h2>
        <div>
          <div className='flex flex-row gap-2 items-center cursor-pointer' >
            <User />
            
            {isLogined&&<span onClick={handleLogoutClick}>Logout</span>}
            {!isLogined&&<span>Login</span>}
           
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
