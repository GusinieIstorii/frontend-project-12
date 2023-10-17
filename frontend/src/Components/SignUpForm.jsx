// import { Formik, Form, Field } from "formik";
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import AuthContext from '../Contexts/AuthContext.jsx';
import routes from '../routes.js';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';
import * as formik from 'formik';

const SignUpForm = () => {
  const { t } = useTranslation();
  const { Formik } = formik;

  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, t('signUpForm.min3max20symbols'))
      .max(20, t('signUpForm.min3max20symbols'))
      .required(t('signUpForm.requiredFiled')),
    password: Yup.string()
      .min(6, t('signUpForm.min6symbols'))
      .required(t('signUpForm.requiredFiled')),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password')], t('signUpForm.samePassword'))
      .required(t('signUpForm.requiredFiled')),
  });

  const { logIn } = useContext(AuthContext);
  const [authFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();

  const submitForm = async (values, { setSubmitting }) => {
    setAuthFailed(false);
    console.log(values);
    try {
      const { username, password } = values;
      const newUserData = { username, password };
      const res = await axios.post(routes.signupPath(), newUserData);
      localStorage.setItem('userId', JSON.stringify(res.data));
      logIn();
      navigate('/');
    } catch (err) {
      setSubmitting(false);
      setAuthFailed(true);
      throw err;
    }
  };

  return (
    <>
      <Formik
        initialValues={{ username: '', password: '', passwordConfirmation: '' }}
        validationSchema={LoginSchema}
        onSubmit={submitForm}
        validateOnChange={true}
      >
        {({ handleSubmit, handleChange, values, errors, touched, handleBlur }) => (
          <Form  noValidate onSubmit={handleSubmit}>
            <h1 className="mb-3 text-center">{t('signUpForm.header')}</h1>

            <Form.Group
              controlId="validationFormik101"
              className="position-relative mb-3"
            >
              
              <Form.Label className="visually-hidden">
                {t('signUpForm.username')}
              </Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={values.username}
                onChange={handleChange}
                isInvalid={errors.username && touched.username}
                onBlur={handleBlur}
                placeholder={t('signUpForm.username')}
                // autoFocus
                className="p-3"
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.username}
              </Form.Control.Feedback>
            
            </Form.Group>
            <Form.Group
              controlId="validationFormik102"
              className="position-relative mb-3"
            >
              <Form.Label className="visually-hidden">
                {t('signUpForm.password')}
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                isInvalid={errors.password && touched.password}
                placeholder={t('signUpForm.password')}
                className="p-3"
                onBlur={handleBlur}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              controlId="validationFormik103"
              className="position-relative mb-3"
            >
              <Form.Label className="visually-hidden">
                {t('signUpForm.confirmPassword')}
              </Form.Label>
              <Form.Control
                type="password"
                name="passwordConfirmation"
                value={values.passwordConfirmation}
                onChange={handleChange}
                isInvalid={
                  errors.passwordConfirmation && touched.passwordConfirmation
                }
                placeholder={t('signUpForm.confirmPassword')}
                className="p-3"
                onBlur={handleBlur}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.passwordConfirmation}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              controlId="validationFormik104"
              className="position-relative"
            >
              <Form.Label className="visually-hidden">auth</Form.Label>
              <Form.Control
                type="text"
                name="auth"
                // value={values.password}
                onChange={handleChange}
                isInvalid={authFailed}
                className="visually-hidden"
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {t('signUpForm.userExists')}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" variant="outline-primary" className="w-100">
              {t('signUpForm.signUp')}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignUpForm;
