import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import AuthContext from '../Contexts/AuthContext';
import routes from '../routes';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';

// seems to be deleted
const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Минимум 2 буквы')
    .max(50, 'Максимум 50 букв')
    .required(),
  password: Yup.string()
    .min(2, 'Минимум 2 буквы')
    .max(50, 'Максимум 50 букв')
    .required(),
});

const LoginForm = () => {
  const { t } = useTranslation();
  const { loggedIn, logIn, logOut } = useContext(AuthContext);
  const [authFailed, setAuthFailed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const submitForm = async (values, { setSubmitting }) => {
    setAuthFailed(false);
    console.log(values);
    try {
      const res = await axios.post(routes.loginPath(), values); 
      localStorage.setItem('userId', JSON.stringify(res.data));
      logIn();
      navigate('/');
    } catch (err) {
      setSubmitting(false);
      setAuthFailed(true);
      throw err;
    }
  };

  return(
  <>
  <h1>{t('loginForm.login')}</h1>
    <Formik
      initialValues={{ username: "", password: "" }}
      // validationSchema={LoginSchema}
      onSubmit={submitForm}>
        {({ errors, touched }) => (
    <Form>
      <div className="form-group">
        <label htmlFor={t('loginForm.username')}>Ваш ник</label>
        <Field
          type="text"
          name="username"
          className="form-control"
          placeholder={t('loginForm.username')}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">{t('loginForm.password')}</label>
        <Field
          type="password"
          name="password"
          className="form-control"
          placeholder={t('loginForm.username')}
        />
      </div>
      {authFailed && <div>{t('loginForm.loginError')}</div>}
      <Button type="submit" variant="outline-primary">{t('loginForm.login')}</Button>
    </Form>
  )}
    </Formik>
  </>
)};

// const LoginForm = () => BuildForm();

export default LoginForm;