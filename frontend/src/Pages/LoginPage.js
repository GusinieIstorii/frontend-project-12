import { Link, Outlet } from 'react-router-dom';
import LoginForm from '../Components/LoginForm.jsx';

export const LoginPage = () => (
    <>
    <div>
    <LoginForm />
      <div>
        <Link to="/one">Page One</Link>
      </div>
  </div>
  <Outlet />
    </>
  
);