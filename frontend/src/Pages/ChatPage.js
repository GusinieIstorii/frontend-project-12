import { Outlet, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Channels from '../Components/Channels.jsx';
import Messages from '../Components/Messages.jsx';
import AddChanBut from '../Components/AddChanBut.jsx';
import NewMsgForm from '../Components/NewMsgForm.jsx';
import { selectors as selectorsChannels } from '../slices/channelsSlice.js';
import { selectors as selectorsMessages } from '../slices/messagesSlice.js';
import Nav from '../Components/Nav.jsx';
// import LoginForm from '../Components/LoginForm';

const ChatPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const activeChanId = useSelector((state) => Number(state.activeChannel.activeChannelId));
  const activeChannelName = useSelector((state) => {
    try {
      return selectorsChannels.selectById(state, activeChanId).name;
    } catch (err) {
      console.log(err);
    }
    return null;
  });

  const msgsAmount = useSelector((state) => {
    const allMessages = selectorsMessages.selectAll(state);
    const allMessagesValues = Object.values(allMessages);
    const messagesCurChan = allMessagesValues.filter(
      (message) => Number(message.channelId) === Number(activeChanId),
    );
    return messagesCurChan.length;
  });

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    console.log(userId);
    if (!userId) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <>
      <div className="h-100 d-flex flex-column">
        <Nav />
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <div className="col-4 col-md-2 border-end px-0 bg-light d-flex flex-column h-100">
              <div className="d-flex justify-content-between mt-1 mb-2 ps-4 pe-2 p-4 align-items-center">
                <b>{t('chat.channels')}</b>
                <AddChanBut />
              </div>
              <Channels />
            </div>
            <div className="col p-0 h-100">
              <div className="d-flex flex-column h-100">
                <div className="bg-light p-3 shadow-sm small">
                  <p className="m-0">
                    <b>
                      #
                      {' '}
                      {activeChannelName}
                    </b>
                  </p>
                  <span className="text-muted">
                    {msgsAmount}
                    {' '}
                    {t('chat.msgs.msg', { count: msgsAmount })}
                  </span>
                </div>

                <div className="chat-messages overflow-auto p-3 px-5">
                  <Messages />
                </div>

                <div className="mt-auto px-5 py-3">
                  <NewMsgForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default ChatPage;
