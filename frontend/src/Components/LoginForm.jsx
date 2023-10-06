import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import AuthContext from '../Contexts/AuthContext';
import routes from '../routes';
import Button from 'react-bootstrap/Button';

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
  <h1>Войти</h1>
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={submitForm}>
        {({ errors, touched }) => (
    <Form>
      <div className="form-group">
        <label htmlFor="username">Ваш ник</label>
        <Field
          type="text"
          name="username"
          className="form-control"
        />
        {errors.username && touched.username ? (
            <div>{errors.username}</div>
          ) : null}
      </div>
      <div className="form-group">
        <label htmlFor="password">Пароль</label>
        <Field
          type="password"
          name="password"
          className="form-control"
        />
        {errors.password && touched.password ? (
            <div>{errors.password}</div>
          ) : null}
      </div>
      {authFailed && <div>Неверные имя пользователя или пароль</div>}
      <Button type="submit" variant="outline-primary">Войти</Button>
    </Form>
  )}
    </Formik>
  </>
)};

// const LoginForm = () => BuildForm();

export default LoginForm;