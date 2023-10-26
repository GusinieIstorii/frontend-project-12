import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import * as formik from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Channel from './Channel.jsx';
import {
  emitRemoveChan,
  subRemoveChan,
  emitRenameChan,
  subRenameChan,
  fetchChannels, selectors,
} from '../slices/channelsSlice.js';
import notify from '../utils/notify.js';
import 'react-toastify/dist/ReactToastify.css';
import { changeActiveChannel } from '../slices/activeChannelSlice.js';

const Channels = () => {
  const { Formik } = formik;
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      dispatch(fetchChannels());
    } catch (err) {
      if (err.response.status === 401) {
        navigate('/login');
      } else {
        toast.error(t('networkError'), {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    }
  }, [dispatch, t]);

  const channels = useSelector(selectors.selectAll);

  const activeChannel = useSelector((state) => Number(state.activeChannel.activeChannelId));

  const handleChannel = (e) => {
    const newActiveChannelId = e.target.getAttribute('data-channelid');
    dispatch(changeActiveChannel(newActiveChannelId));
  };

  // delete channel modal

  const [showDelete, setShowDelete] = useState(false);
  const [channelToEdit, setChanToEdit] = useState(0);

  const handleCloseDelete = () => setShowDelete(false); // закрыть модальное окно удаления канала
  const handleShowDelete = (e) => {
    // открыть модальное окно удаления канала
    const idChannel = e.target.getAttribute('data-channelid');
    console.log(`handleShowDelete ${idChannel}`);
    setChanToEdit(idChannel);
    setShowDelete(true);
  };

  const removeChannel = () => {
    dispatch(emitRemoveChan({ id: channelToEdit }));
    dispatch(subRemoveChan());
    if (Number(activeChannel) === Number(channelToEdit)) {
      dispatch(changeActiveChannel(1));
    }
    handleCloseDelete();
    notify(t('chat.channelDeleted'));
  };

  //  rename modal
  const [showRename, setShowRename] = useState(false);
  const handleRenameClose = () => setShowRename(false);

  const handleShowRename = (e) => {
    const idChannel = e.target.getAttribute('data-channelid');
    console.log(`handleShow rename modal ${idChannel}`);
    setChanToEdit(idChannel);
    setShowRename(true);
  };

  const channelNames = channels.map((channel) => channel.name);

  const submitForm = (values, { setSubmitting }) => {
    try {
      dispatch(
        emitRenameChan({ id: channelToEdit, name: values.channelRename }),
      );
      dispatch(subRenameChan());
      handleRenameClose();
      notify(t('chat.channelRenamed'));
      return null;
    } catch (err) {
      setSubmitting(false);
      return err;
    }
  };

  const LoginSchema = Yup.object().shape({
    channelRename: Yup.string()
      .notOneOf(channelNames, t('chat.nameShouldBeUnique'))
      .required(t('chat.requiredFiled')),
  });

  const renderChannels = (channelsToRender) => channelsToRender.map((channel) => (
    <Channel
      channel={channel}
      key={channel.id}
      activeChannel={activeChannel}
      handleChannel={handleChannel}
      handleShowDelete={handleShowDelete}
      handleShowRename={handleShowRename}
    />
  ));

  return (
    channels && (
      <>
        <ul className="nav d-block nav-pills nav-fill px-2 mb-3 overflow-auto h-100 ">
          {renderChannels(channels)}
        </ul>

        <Modal show={showDelete} onHide={handleCloseDelete} centered>
          <Modal.Header closeButton>
            <Modal.Title>{t('chat.deleteChannel')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {t('chat.sure')}
            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                onClick={handleCloseDelete}
                className="me-2"
              >
                {t('chat.cancel')}
              </Button>
              <Button variant="danger" onClick={removeChannel}>
                {t('chat.delete')}
              </Button>
            </div>
          </Modal.Body>
        </Modal>

        <Modal show={showRename} onHide={handleRenameClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{t('chat.renameChannel')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={{ channelRename: '' }}
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
                      name="channelRename"
                      value={values.channelRename}
                      onChange={handleChange}
                      isInvalid={errors.channelRename && touched.channelRename}
                      autoFocus
                      data-text="Имя канала"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.channelRename}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <div className="d-flex justify-content-end">
                    <Button
                      variant="secondary"
                      onClick={handleRenameClose}
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
    )
  );
};

export default Channels;
