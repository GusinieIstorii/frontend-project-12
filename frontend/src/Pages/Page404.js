import { Link, Outlet } from 'react-router-dom';
import Component404 from '../Components/Component404.jsx';

export const Page404 = () => (
    <>
    <div>
    <Component404 />
      <div>
        <Link to="/login">Page Login</Link>
      </div>
  </div>
  <Outlet />
    </>
  
);