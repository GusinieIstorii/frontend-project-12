import React, { useEffect, useState, useContext, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
// import ActiveChannelContext from '../Contexts/ActiveChannelContext';
import { fetchChannels, selectors } from "../slices/channelsSlice";
import { changeActiveChannel } from "../slices/activeChannelSlice";
import socket from "../socket";
import cn from "classnames";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
// import { Formik, Form, Field } from "formik";
import * as formik from "formik";
import * as Yup from "yup";

import { actions as channelsActions } from "../slices/channelsSlice.js";
import {
  emitRemoveChan,
  subRemoveChan,
  emitRenameChan,
  subRenameChan,
} from "../slices/channelsSlice";
import { ToastContainer } from "react-toastify";
import notify from "../notify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const Channels = () => {
  const { Formik } = formik;
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(fetchChannels());
    } catch (err) {
      toast.error(t("networkError"), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [dispatch]);

  const { t } = useTranslation();

  const channels = useSelector(selectors.selectAll);

  const activeChannel = useSelector((state) =>
    Number(state.activeChannel.activeChannelId)
  );

  const handleChannel = (e) => {
    const newActiveChannelId = e.target.getAttribute("data-channelid");
    dispatch(changeActiveChannel(newActiveChannelId));
  };

  // delete channel modal

  const [showDelete, setShowDelete] = useState(false);
  const [channelToEdit, setChanToEdit] = useState(0);

  const handleCloseDelete = () => setShowDelete(false); //закрыть модальное окно удаления канала
  const handleShowDelete = (e) => {
    //открыть модальное окно удаления канала
    const idChannel = e.target.getAttribute("data-channelid");
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
    notify(t("chat.channelDeleted"));
  };

  //  rename modal
  const [showRename, setShowRename] = useState(false);
  const handleRenameClose = () => setShowRename(false);
  const [authFailed, setAuthFailed] = useState(false);

  const handleShowRename = (e) => {
    const idChannel = e.target.getAttribute("data-channelid");
    console.log(`handleShow rename modal ${idChannel}`);
    setChanToEdit(idChannel);
    setShowRename(true);
  };

  const channelNames = channels.map((channel) => channel.name);

  const submitForm = (values, { setSubmitting }) => {
    setAuthFailed(false);
    try {
      dispatch(
        emitRenameChan({ id: channelToEdit, name: values.channelRename })
      );
      dispatch(subRenameChan());
      handleRenameClose();
      notify(t("chat.channelRenamed"));
    } catch (err) {
      setSubmitting(false);
      setAuthFailed(true);
      throw err;
    }
  };

  const LoginSchema = Yup.object().shape({
    channelRename: Yup.string()
      .notOneOf(channelNames, t("chat.nameShouldBeUnique"))
      .required(t("chat.requiredFiled")),
  });

  const renderDropdown = (id) => {
    return (
      <>
        <Dropdown.Toggle
          split
          id="dropdown-split-basic"
          className="btn-secondary btn-light"
        />

        <Dropdown.Menu>
          <Dropdown.Item onClick={handleShowDelete} data-channelid={id}>
            {t("chat.delete")}
          </Dropdown.Item>
          <Dropdown.Item onClick={handleShowRename} data-channelid={id}>
            {t("chat.rename")}
          </Dropdown.Item>
        </Dropdown.Menu>
      </>
    );
  };

  const renderChannels = (channels) => {
    return channels.map(({ id, name, removable }) => {
      return (
        <li className="nav-item" key={id}>
          <Dropdown as={ButtonGroup} key={id} className="w-100">
            <Button
              className={cn("w-100 rounded-0 text-start btn text-start text-truncate", {
                "btn-secondary": Number(id) === Number(activeChannel),
                "btn-light": Number(id) !== Number(activeChannel),
              })}
              onClick={handleChannel}
              data-channelid={id}
            >
              <span className="me-1">#</span>
              {name}
            </Button>
            {removable && renderDropdown(id)}
          </Dropdown>
        </li>
      );
    });
  };

  return (
    channels && (
      <>
        <ul className="nav d-block nav-pills nav-fill px-2 mb-3 overflow-auto h-100 ">
          {renderChannels(channels)}
        </ul>
        <ToastContainer />

        <Modal show={showDelete} onHide={handleCloseDelete} centered>
          <Modal.Header closeButton>
            <Modal.Title>{t("chat.deleteChannel")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {t("chat.sure")}
            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                onClick={handleCloseDelete}
                className="me-2"
              >
                {t("chat.cancel")}
              </Button>
              <Button variant="danger" onClick={removeChannel}>
                {t("chat.delete")}
              </Button>
            </div>
          </Modal.Body>
        </Modal>

        <Modal show={showRename} onHide={handleRenameClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{t("chat.renameChannel")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={{ channelRename: "" }}
              validationSchema={LoginSchema}
              onSubmit={submitForm}
            >
              {({ handleSubmit, handleChange, values, errors, touched }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group controlId="validationFormik01" className="mb-3">
                    <Form.Label className="visually-hidden">
                      {t("chat.channelName")}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="channelRename"
                      value={values.channelRename}
                      onChange={handleChange}
                      isInvalid={errors.channelRename && touched.channelRename}
                      autoFocus
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
                      {t("chat.cancel")}
                    </Button>
                    <Button type="submit" variant="outline-primary">
                      {t("chat.send")}
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
