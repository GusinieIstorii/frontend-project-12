import { Link, Outlet } from 'react-router-dom';
import SignUpForm from '../Components/SignUpForm.jsx';

export const SignUpPage = () => (
    <>
    <div className="container h-75 my-5 overflow-hidden rounded shadow">
    
    <SignUpForm />
    <Link to="/one">Page One</Link>
  </div>
  <Outlet />
    </>
  
);