// import { Formik, Form, Field } from 'formik';
import axios from "axios";
import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import AuthContext from "../Contexts/AuthContext";
import routes from "../routes";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import * as formik from "formik";

// seems to be deleted
const LoginSchema = Yup.object().shape({
  username: Yup.string().required("fkfkfkf"),
  password: Yup.string().required(),
});

const LoginForm = () => {
  const { Formik } = formik;
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
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={submitForm}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <h1 className="mb-3 text-center">{t("loginForm.login")}</h1>
            <Form.Group
              controlId="validationFormik101"
              className="position-relative mb-3"
            >
              <Form.Label className="visually-hidden">
                {t("loginForm.username")}
              </Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={values.username}
                onChange={handleChange}
                isInvalid={errors.username && touched.username}
                placeholder={t("loginForm.username")}
                autoFocus
                className="p-3"
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {t("signUpForm.requiredFiled")}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              controlId="validationFormik102"
              className="position-relative mb-3"
            >
              <Form.Label className="visually-hidden">
                {t("loginForm.password")}
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                isInvalid={errors.password && touched.password}
                placeholder={t("loginForm.password")}
                className="p-3"
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {t("signUpForm.requiredFiled")}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              controlId="validationFormik103"
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
                {t("loginForm.loginError")}
              </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" variant="outline-primary" className="w-100">
              {t("loginForm.login")}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

// const LoginForm = () => BuildForm();

export default LoginForm;
