import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { fetchMessages, selectors } from '../slices/messagesSlice.js';
import notify from '../utils/notify.js';

const Message = ({ id, username, message }) => {
  const msgRef = useRef(null);

  useEffect(() => {
    msgRef.current.scrollIntoView({ block: 'end' });
  }, []);

  return (
    <div ref={msgRef} key={id} className="text-break mb-2">
      <b>{username}</b>
      :
      {message}
    </div>
  );
};

const Messages = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    try {
      dispatch(fetchMessages());
    } catch (err) {
      notify(t('networkError'));
    }
  }, [dispatch, t]);

  const allMessages = useSelector(selectors.selectAll);
  const curChannel = useSelector((state) => Number(state.activeChannel.activeChannelId));

  const [msgsCurChan, setMsgsCurChan] = useState();

  useEffect(() => {
    console.log(`cur chan ${curChannel}`);
    const allMessagesValues = Object.values(allMessages);
    const messages = allMessagesValues.filter(
      (message) => Number(message.channelId) === Number(curChannel),
    );
    setMsgsCurChan(messages);
  }, [curChannel, allMessages]);

  return (
    <div>
      {msgsCurChan
        && msgsCurChan.map(({ id, message, username }) => (
          <Message message={message} id={id} username={username} key={id} />
        ))}
    </div>
  );
};

export default Messages;
