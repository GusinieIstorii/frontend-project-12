import { Outlet } from 'react-router-dom';
import SignUpForm from '../Components/SignUpForm.jsx';
import Nav from '../Components/Nav.jsx';

const SignUpPage = () => (
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
                      src="https://giphy.com/embed/VbnUQpnihPSIgIXuZv"
                      height="320"
                      allowFullScreen
                      title="cat"
                    />
                  </div>
                  <div className="col">
                    <SignUpForm />
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

export default SignUpPage;
