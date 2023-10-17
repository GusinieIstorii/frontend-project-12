import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import { Formik, Form, Field } from "formik";
import Form from 'react-bootstrap/Form';
import * as formik from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { addChannel, getNewChannel, selectors } from '../slices/channelsSlice.js';
import 'react-toastify/dist/ReactToastify.css';
import notify from '../notify.js';

const AddChanBut = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { Formik } = formik;

  // const [authFailed, setAuthFailed] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const channels = useSelector(selectors.selectAll);
  const channelsNames = channels.map((channel) => channel.name);

  const submitForm = (values, { setSubmitting }) => {
    // setAuthFailed(false);
    try {
      dispatch(addChannel({ name: values.newChannelName }));
      dispatch(getNewChannel());
      handleClose();
      notify(t('chat.channelAdded'));
    } catch (err) {
      setSubmitting(false);
      // setAuthFailed(true);
      throw err;
    }
  };

  const LoginSchema = Yup.object().shape({
    newChannelName: Yup.string()
      .notOneOf(channelsNames, t('chat.nameShouldBeUnique'))
      .required(t('chat.requiredFiled')),
  });

  return (
    <>
      <button onClick={handleShow} className="btn btn-primary" type="button">
        +
      </button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t('chat.addChannel')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{ newChannelName: '' }}
            validationSchema={LoginSchema}
            onSubmit={submitForm}
          >
            {({
              handleSubmit, handleChange, values, errors, touched,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId="validationFormik01" className="mb-3">
                  <Form.Label className="visually-hidden">
                    {t('chat.channelName')}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="newChannelName"
                    value={values.newChannelName}
                    onChange={handleChange}
                    isInvalid={errors.newChannelName && touched.newChannelName}
                    autoFocus
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.newChannelName}
                  </Form.Control.Feedback>
                </Form.Group>
                <div className="d-flex justify-content-end">
                  <Button
                    variant="secondary"
                    onClick={handleClose}
                    className="me-2"
                  >
                    {t('chat.cancel')}
                  </Button>
                  <Button type="submit" variant="outline-primary">
                    {t('chat.send')}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddChanBut;
