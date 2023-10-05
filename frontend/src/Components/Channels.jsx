import React, { useEffect, useState, useContext } from "react";
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
import SplitButton from "react-bootstrap/SplitButton";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { sortBy } from "lodash";

const Channels = () => {
  const dispatch = useDispatch();
  dispatch(fetchChannels());

  const channelsFetched = useSelector(selectors.selectAll);

  const [activeChannel, setActiveChannel] = useState(1);

  const [newChannels, setChannels] = useState([]);

  useEffect(() => {
    setChannels(channelsFetched);
  }, [channelsFetched]);

  socket.on("newChannel", (channelwithId) => {
    const newChannelsSet = [...newChannels, channelwithId];
    dispatch(changeActiveChannel(channelwithId.id));
    setChannels(newChannelsSet);
    setActiveChannel(channelwithId.id);
  });

  const handleChannel = (e) => {
    const newActiveChannelId = e.target.getAttribute("data-channelid");
    dispatch(changeActiveChannel(newActiveChannelId));
    setActiveChannel(newActiveChannelId);
  };

  // delete channel modal 

  const [showDelete, setShowDelete] = useState(false);
  const [channelToEdit, setChanToEdit] = useState(0);

  const handleCloseDelete = () => setShowDelete(false); //закрыть модальное окно удаления канала
  const handleShowDelete = (e) => { //открыть модальное окно удаления канала
    const idChannel = e.target.getAttribute("data-channelid");
    console.log(`handleShowDelete ${idChannel}`);
    setChanToEdit(idChannel);
    setShowDelete(true);
  };

  const removeChannel = () => {
    socket.emit("removeChannel", { id: channelToEdit });
    handleCloseDelete();
  };

  socket.on("removeChannel", ({ id }) => {
    const newChannelsSet = newChannels.filter(
      (channel) => Number(channel.id) !== Number(id)
    );
    setChannels(newChannelsSet);
    if (Number(id) === Number(activeChannel)) {
      setActiveChannel(1);
      dispatch(changeActiveChannel(1));
    }
  });

  //  rename modal
  const [showRename, setShowRename] = useState(false);
  const handleRenameClose = () => setShowRename(false);
  const [authFailed, setAuthFailed] = useState(false);

  const handleShowRename = (e) => {
    const idChannel = e.target.getAttribute("data-channelid");
    console.log(`handleShow rename modal ${idChannel}`);
    setChanToEdit(idChannel);
    setShowRename(true);
  }

  const channelNames = newChannels.map((channel) => channel.name);
  const LoginSchema = Yup.object().shape({
    channelRename: Yup.string()
      .notOneOf(channelNames, "такое имя уже есть")
      .required("обязательное поле"),
  });

  const submitForm = async (values, { setSubmitting }) => {
    setAuthFailed(false);
    try {
      console.log(values);
      socket.emit('renameChannel', { id: channelToEdit, name: values.channelRename});
      // socket.emit("newChannel", { name: values.newChannelName });
      // const newChannelNames = [...channelNames, values.newChannelName];
      // setChannelNames(newChannelNames);
      console.log('submitted');
      handleRenameClose();
    } catch (err) {
      setSubmitting(false);
      setAuthFailed(true);
      throw err;
    }
  };

  socket.on('renameChannel', (renamedChan) => {
    const filteredChannels = newChannels.filter((channel) => channel.id !== renamedChan.id);
    const allChannels = sortBy([...filteredChannels, renamedChan], 'id');
    setChannels(allChannels);
  });
  // 

  
  const renderDropdown = (id) => {
    return (
      <>
        <Dropdown.Toggle split id="dropdown-split-basic" />

        <Dropdown.Menu>
          <Dropdown.Item onClick={handleShowDelete} data-channelid={id}>
            Удалить
          </Dropdown.Item>
          <Dropdown.Item onClick={handleShowRename} data-channelid={id}>
            Переименовать
          </Dropdown.Item>
        </Dropdown.Menu>
      </>
    );
  };

  const renderChannels = (channels) => {
    return channels.map(({ id, name, removable }) => {
      return (
        <Dropdown as={ButtonGroup} key={id}>
          <Button
            className={cn("w-100 rounded-0 text-start btn", {
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
      );
    });
  };

  return (
    channelsFetched && (
      <>
        <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
          {renderChannels(newChannels)}
        </ul>

        <Modal show={showDelete} onHide={handleCloseDelete} centered>
          <Modal.Header closeButton>
            <Modal.Title>Удалить канал</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Уверены?
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDelete}>
                Отменить
              </Button>
              <Button variant="danger" onClick={removeChannel}>
                Удалить
              </Button>
            </Modal.Footer>
          </Modal.Body>
        </Modal>

        <Modal show={showRename} onHide={handleRenameClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Переименовать канал</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Formik
            initialValues={{ channelRename: "" }}
            validationSchema={LoginSchema}
            onSubmit={submitForm}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="form-group">
                  <label htmlFor="channelRename">channelRename</label>
                  <Field
                    type="text"
                    name="channelRename"
                    className="form-control"
                  />
                  {errors.channelRename && touched.channelRename ? (
                    <div>{errors.channelRename}</div>
                  ) : null}
                </div>

                {authFailed && <div>Такой канал уже есть, придумай еще</div>}
                <Button variant="secondary" onClick={handleRenameClose}>
                  Отменить
                </Button>
                <Button type="submit" variant="outline-primary" onSubmit={submitForm}>
                  Отправить
                </Button>
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
