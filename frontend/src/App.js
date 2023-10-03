import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import PageOne from './Components/Pages.jsx';
import { Page404 } from './Pages/Page404.js';
import { LoginPage } from './Pages/LoginPage.js';
import { ChatPage } from './Pages/ChatPage.js';
import AuthContext from './Contexts/AuthContext.jsx';
import ActiveChannelContext from './Contexts/ActiveChannelContext.jsx';
import { Button, Navbar, Nav } from 'react-bootstrap';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  const [activeChannel, setActiveChannel] = useState(1);

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      <ActiveChannelContext.Provider value={{activeChannel, setActiveChannel}}>
      {children}
      </ActiveChannelContext.Provider>
    </AuthContext.Provider>
  );
};

// const AuthButton = () => {
//   const auth = useAuth();
//   const location = useLocation();

//   return (
//     auth.loggedIn
//       ? <Button onClick={auth.logOut}>Выйти</Button>
//       : <Button as={Link} to="/login" state={{ from: location }}>Войти</Button>
//   );
// };

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
    <Navbar expand="lg" bg="white" data-bs-theme="light" className='shadow-sm p-3'>
        <Navbar.Brand>Hexlet Chat</Navbar.Brand>
        
        {/* <AuthButton /> */}
      </Navbar>
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
