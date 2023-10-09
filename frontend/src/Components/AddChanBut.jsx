import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectors } from "../slices/channelsSlice";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { addChannel, getNewChannel  } from "../slices/channelsSlice";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import notify from "../notify";

const AddChanBut = () => {
  const dispatch = useDispatch();

  const [authFailed, setAuthFailed] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const channels = useSelector(selectors.selectAll);
  const channelsNames = channels.map((channel) => channel.name);
  
  const submitForm = (values, { setSubmitting }) => {
    setAuthFailed(false);
    try {
      dispatch(addChannel({ name: values.newChannelName }));
      dispatch(getNewChannel());
      handleClose();
      notify('Канал создан');
    } catch (err) {
      setSubmitting(false);
      setAuthFailed(true);
      throw err;
    }
  };

  const LoginSchema = Yup.object().shape({
    newChannelName: Yup.string()
      .notOneOf(channelsNames, "такое имя уже есть")
      .required("обязательное поле"),
  });

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add channel
      </Button>
      <ToastContainer />

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Добавить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Woohoo, you are reading this text in a modal!
          <Formik
            initialValues={{ newChannelName: "" }}
            validationSchema={LoginSchema}
            onSubmit={submitForm}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="form-group">
                  <label htmlFor="newChannelName">newChannelName</label>
                  <Field
                    type="text"
                    name="newChannelName"
                    className="form-control"
                  />
                  {errors.newChannelName && touched.newChannelName ? (
                    <div>{errors.newChannelName}</div>
                  ) : null}
                </div>

                {authFailed && <div>Такой канал уже есть, придумай еще</div>}
                <Button variant="secondary" onClick={handleClose}>
                  Отменить
                </Button>
                <Button type="submit" variant="outline-primary">
                  Отправить
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddChanBut;
