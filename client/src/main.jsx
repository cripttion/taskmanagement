import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import  {UserLoginContext}  from './states/UserLoginContext'
import { UserDataContext } from './states/UserDataContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserLoginContext>
      <UserDataContext>
    <App />
    </UserDataContext>
    </UserLoginContext>
  </React.StrictMode>,
)
