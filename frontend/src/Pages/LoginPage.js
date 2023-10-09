import { Link, Outlet } from 'react-router-dom';
import LoginForm from '../Components/LoginForm.jsx';
import { useTranslation } from 'react-i18next';

export const LoginPage = () => {
  const { t } = useTranslation();

 return (
  <>
    <div className='container'>
    <LoginForm />
      <div>
        {t('loginForm.notHaveAccount')}<Link to="/signup">{t('loginForm.registration')}</Link>
      </div>
  </div>
  <Outlet />
    </>
 )
 };