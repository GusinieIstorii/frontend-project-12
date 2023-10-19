import { Link, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LoginForm from '../components/LoginForm.jsx';
import Nav from '../components/Nav.jsx';

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="h-100 d-flex flex-column">
        <Nav />

        <div className="container-fluid h-100 d-flex flex-column">
          <div className="d-flex flex-column h-100">
            <div className="row justify-content-center h-100 align-content-center">
              <div className="col-12 col-md-8 col-xxl-6">
                <div className="card shadow">
                  <div className="card-body row h-100 p-5">
                    <div className="col align-self-center d-flex justify-content-center">
                      <iframe
                        src="https://giphy.com/embed/heIX5HfWgEYlW"
                        width="240"
                        height="240"
                        className="rounded-circle"
                        allowFullScreen
                        title="cat"
                      />
                    </div>
                    <div className="col">
                      <LoginForm />
                    </div>
                  </div>
                  <div className="card-footer p-4">
                    <div className="text-center">
                      {t('loginForm.notHaveAccount')}
                      {' '}
                      <Link to="/signup">{t('loginForm.registration')}</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default LoginPage;
