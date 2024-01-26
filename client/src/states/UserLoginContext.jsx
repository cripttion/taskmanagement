// UserLoginContext.jsx

import React, { createContext, useContext, useState } from 'react';

export const LoginContext = createContext();

export function UserLoginContext({ children }) {
  const [authenticationKey, setAuthentications] = useState('');

  const setAuthentication = (data) => {
    setAuthentications(data);
  };

  return (
    <LoginContext.Provider value={{ authenticationKey, setAuthentication }}>
      {children}
    </LoginContext.Provider>
  );
}

export const useLoginContext = () => useContext(LoginContext);
