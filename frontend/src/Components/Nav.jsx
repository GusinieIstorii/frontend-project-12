import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from "react-router-dom";
import React, { useContext } from 'react';
import { Button, Navbar } from 'react-bootstrap';
import AuthContext from '../Contexts/AuthContext.jsx';
import { Link, Outlet } from "react-router-dom";

const Nav = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const logOut = () => {
      auth.logOut();
      navigate('/login');
    }
  
    return (
      <Navbar expand="lg" bg="white" data-bs-theme="light" className='shadow-sm p-3'>
          <Navbar.Brand as={Link} to="/" state={{ from: location }}>{t('navBar.hexletChat')}</Navbar.Brand>
          
          {auth.loggedIn
        ? <Button onClick={logOut}>{t('navBar.logOut')}</Button>
        : <Button as={Link} to="/login" state={{ from: location }}>{t('navBar.logIn')}</Button>}
        </Navbar>
    )
  }

  export default Nav;