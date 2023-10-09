import { Formik, Form, Field } from "formik";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import AuthContext from "../Contexts/AuthContext";
import routes from "../routes";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";


const SignUpForm = () => {
  const { t } = useTranslation();

  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, t('signUpForm.min3symbols'))
      .max(20, t('signUpForm.max20symbols'))
      .required(t('signUpForm.requiredFiled')),
    password: Yup.string()
      .min(6, t('signUpForm.min6symbols'))
      .required(t('signUpForm.requiredFiled')),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref("password")], t('signUpForm.samePassword'))
      .required(t('signUpForm.requiredFiled')),
  });


  const { loggedIn, logIn, logOut } = useContext(AuthContext);
  const [authFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();

  const submitForm = async (values, { setSubmitting }) => {
    setAuthFailed(false);
    console.log(values);
    try {
      const { username, password } = values;
      const newUserData = { username, password };
      const res = await axios.post(routes.signupPath(), newUserData);
      localStorage.setItem("userId", JSON.stringify(res.data));
      logIn();
      navigate("/");
    } catch (err) {
      setSubmitting(false);
      setAuthFailed(true);
      throw err;
    }
  };

  return (
    <>
      <h1>{t('signUpForm.header')}</h1>
      <Formik
        initialValues={{ username: "", password: "", passwordConfirmation: "" }}
        validationSchema={LoginSchema}
        onSubmit={submitForm}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="username">{t('signUpForm.username')}</label>
              <Field type="text" name="username" className="form-control" 
              placeholder={t('signUpForm.username')}/>
              {errors.username && touched.username ? (
                <div>{errors.username}</div>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="password">{t('signUpForm.password')}</label>
              <Field type="password" name="password" className="form-control" 
              placeholder={t('signUpForm.password')}/>
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="passwordConfirmation">{t('signUpForm.confirmPassword')}</label>
              <Field
                type="password"
                name="passwordConfirmation"
                className="form-control"
                placeholder={t('signUpForm.confirmPassword')}
              />
              {errors.passwordConfirmation && touched.passwordConfirmation ? (
                <div>{errors.passwordConfirmation}</div>
              ) : null}
            </div>
            {authFailed && <div>{t('signUpForm.userExists')}</div>}
            <Button type="submit" variant="outline-primary">
            {t('signUpForm.signUp')}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignUpForm;
