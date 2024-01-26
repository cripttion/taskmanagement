// UserLoginContext.jsx

import React, { createContext, useContext, useState } from 'react';

export const UserContext = createContext();

export function UserDataContext({ children }) {
  const [userData, setUserDatas] = useState([]);

  const setUserData = (data) => {
    setUserDatas(data);
  };

  return (
    <UserContext.Provider value={{userData,setUserData}}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
