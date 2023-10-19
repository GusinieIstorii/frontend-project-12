import { Link, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Nav from '../Сomponents/Nav.jsx';

const Page404 = () => {
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
                        src="https://giphy.com/embed/3oEduQAsYcJKQH2XsI"
                        height="300"
                        allowFullScreen
                        className="rounded-circle"
                        title="cat"
                      />
                    </div>
                    <div className="col d-flex flex-column justify-content-center">
                      <h2 className="text-center mb-4">Oooohps, I can not find this page</h2>
                      <div className="text-center mb-3">
                        {t('loginForm.haveAccount')}
                        {' '}
                        <Link to="/login">{t('loginForm.login')}</Link>
                      </div>
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
      </div>

      <Outlet />
    </>
  );
};

export default Page404;
