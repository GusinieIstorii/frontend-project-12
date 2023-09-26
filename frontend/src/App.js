import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import PageOne from './Components/Pages';
import { Page404 } from './Pages/Page404';
import { LoginPage } from './Pages/LoginPage';
import { ChatPage } from './Pages/ChatPage';
import AuthContext from './Contexts/AuthContext';

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

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Page404 />} />
        <Route path="one" element={<PageOne />} />
        <Route path="/" element={<ChatPage />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
