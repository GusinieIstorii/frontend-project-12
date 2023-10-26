import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Provider, ErrorBoundary } from '@rollbar/react';
import Page404 from './Pages/Page404.js';
import LoginPage from './Pages/LoginPage.js';
import ChatPage from './Pages/ChatPage.js';
import SignUpPage from './Pages/SignUpPage.js';
import { AuthProvider } from './Contexts/AuthContext.jsx';
import {
  chatPagePath, loginPagePath, signUpPagePath, page404Path,
} from './utils/paths.js';

// eslint-disable-next-line no-unused-vars
import i18next from './i118next.js';

const rollbarConfig = {
  accessToken: process.env.ROLLBAR_TOKEN,
  environment: 'testenv',
};

const App = () => (
  <Provider config={rollbarConfig}>
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <div className="vh-100 bg-pink" style={{ background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(217,137,212,1) 0%, rgba(120,132,255,1) 100%)' }}>
            <Routes>
              <Route path={page404Path} element={<Page404 />} />
              <Route path={chatPagePath} element={<ChatPage />} />
              <Route path={loginPagePath} element={<LoginPage />} />
              <Route path={signUpPagePath} element={<SignUpPage />} />
            </Routes>
            <ToastContainer />
          </div>

        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  </Provider>
);

export default App;
