import { Formik, Form, Field } from "formik";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import AuthContext from "../Contexts/AuthContext";
import routes from "../routes";
import Button from "react-bootstrap/Button";

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Минимум 3 символа")
    .max(20, "Максимум 20 символов")
    .required(),
  password: Yup.string().min(6, "Минимум 6 символов").required(),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password")])
    .required(),
});

const SignUpForm = () => {
  const { loggedIn, logIn, logOut } = useContext(AuthContext);
  const [authFailed, setAuthFailed] = useState(false);
  const location = useLocation();
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
      <h1>Регистрация</h1>
      <Formik
        initialValues={{ username: "", password: "", passwordConfirmation: "" }}
        validationSchema={LoginSchema}
        onSubmit={submitForm}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="username">Имя пользователя</label>
              <Field type="text" name="username" className="form-control" />
              {errors.username && touched.username ? (
                <div>{errors.username}</div>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="password">Пароль</label>
              <Field type="password" name="password" className="form-control" />
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="passwordConfirmation">Подтвердите пароль</label>
              <Field
                type="password"
                name="passwordConfirmation"
                className="form-control"
              />
              {errors.passwordConfirmation && touched.passwordConfirmation ? (
                <div>{errors.passwordConfirmation}</div>
              ) : null}
            </div>
            {authFailed && <div>Неверные имя пользователя или пароль</div>}
            <Button type="submit" variant="outline-primary">
              Зарегестрироваться
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

// const LoginForm = () => BuildForm();

export default SignUpForm;
