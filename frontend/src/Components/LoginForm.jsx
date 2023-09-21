import { Formik, Form, Field } from 'formik';
import React from 'react';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  nickname: Yup.string()
    .min(2, 'Минимум 2 буквы')
    .max(50, 'Максимум 50 букв')
    .required(),
  password: Yup.string()
    .min(2, 'Минимум 2 буквы')
    .max(50, 'Максимум 50 букв')
    .required(),
});

const BuildForm = () => (
  <>
  <h1>Войти</h1>
    <Formik
      initialValues={{ nickname: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={({ setSubmitting }) => {
      console.log("Form is validated! Submitting the form...");
      setSubmitting(false);
      }}>
        {({ errors, touched }) => (
    <Form>
      <div className="form-group">
        <label htmlFor="nickname">Ваш ник</label>
        <Field
          type="text"
          name="nickname"
          className="form-control"
        />
        {errors.nickname && touched.nickname ? (
            <div>{errors.nickname}</div>
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
            <div>{errors.nickname}</div>
          ) : null}
      </div>
      <button type="submit">Войти</button>
    </Form>
  )}
    </Formik>
  </>
);

const LoginForm = () => BuildForm();

export default LoginForm;