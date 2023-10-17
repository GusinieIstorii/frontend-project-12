import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import PageOne from './Components/Pages.jsx';
import { Page404 } from './Pages/Page404.js';
import { LoginPage } from './Pages/LoginPage.js';
import { ChatPage } from './Pages/ChatPage.js';
import { SignUpPage } from './Pages/SignUpPage.js';
import AuthContext from './Contexts/AuthContext.jsx';
import { ToastContainer } from 'react-toastify';


// eslint-disable-next-line no-unused-vars
import i18next from './i118next.js';
import { Provider, ErrorBoundary } from '@rollbar/react'; 



const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState();
  

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  const userId = JSON.parse(localStorage.getItem('userId'));
  
  useEffect(() => {
        
    if (!userId) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  }, [userId]);
        

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};



const rollbarConfig = {
  accessToken: 'a7b665e36dda4509af0a6193e4761ffa',
  environment: 'testenv',
};

function App() {
  
  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <AuthProvider>
          <BrowserRouter>
            <div className='vh-100 bg-pink' style={{background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(217,137,212,1) 0%, rgba(120,132,255,1) 100%)'}}>
              <Routes>
                <Route path="*" element={<Page404 />} />
                <Route path="one" element={<PageOne />} />
                <Route path="/" element={<ChatPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignUpPage />} />
              </Routes>
              <ToastContainer />
            </div>
    
          </BrowserRouter>
        </AuthProvider>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
