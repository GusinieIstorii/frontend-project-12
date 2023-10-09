import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import PageOne from './Components/Pages.jsx';
import { Page404 } from './Pages/Page404.js';
import { LoginPage } from './Pages/LoginPage.js';
import { ChatPage } from './Pages/ChatPage.js';
import { SignUpPage } from './Pages/SignUpPage.js';
import Nav from './Components/Nav.jsx';
import AuthContext from './Contexts/AuthContext.jsx';


// eslint-disable-next-line no-unused-vars
import i18next from './i118next.js';
import { Provider, ErrorBoundary } from '@rollbar/react'; 



const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
    
    
  };


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
    <div className='vh-100 bg-light'>
      <Nav />
      <Routes>
        <Route path="*" element={<Page404 />} />
        <Route path="one" element={<PageOne />} />
        <Route path="/" element={<ChatPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
      </Routes>
    </div>
    
    </BrowserRouter>
    </AuthProvider>
    </ErrorBoundary>
    </Provider>
  );
}

export default App;
