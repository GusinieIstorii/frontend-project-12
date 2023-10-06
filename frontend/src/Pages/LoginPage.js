import { Link, Outlet } from 'react-router-dom';
import LoginForm from '../Components/LoginForm.jsx';

export const LoginPage = () => (
    <>
    <div className='container'>
    <LoginForm />
      <div>
        Нет аккаунта?<Link to="/signup">Регистрация</Link>
      </div>
  </div>
  <Outlet />
    </>
  
);