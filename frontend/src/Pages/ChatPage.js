import { Link, Outlet } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import LoginForm from '../Components/LoginForm';

export const ChatPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const userId = JSON.parse(localStorage.getItem('userId'));
        console.log(userId);
        if (!userId.token) {
            navigate('/login');
          }
      }, [navigate]);

  return(
<>
    <div>
      <div>
        <p>I'm a chat page</p>
        <Link to="/one">Page One</Link>
      </div>
  </div>
  <Outlet />
    </>
    )
};