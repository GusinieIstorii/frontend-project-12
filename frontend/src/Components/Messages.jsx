import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import socket from '../socket';
import _ from 'lodash';

import { fetchMessages, selectors } from '../slices/messagesSlice';

const Messages = () => {

  const dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchMessages());
    }, [dispatch]);

  const prevMessages = useSelector(selectors.selectAll);
  const initialstate = [
    {message: 'first', id: 1, username: 'Pupa'},
    {message: 'second', id: 2, username: 'Lupa'}
  ]

  const [newMessages, setMessages] = useState(initialstate);
    const getNewMessage = () => {
      socket.on('newMessage', (messageWithId) => {
        const newMessagesSet = [...newMessages, messageWithId];
        setMessages(newMessagesSet);
    });
    }

    useEffect(getNewMessage);
  
    return (
      <div className="mt-3">
        <ul className="list-group">
          {prevMessages.map(({ id, message, username}) => (
            <li key={id} className="list-group-item d-flex">
              <span className="mr-auto">{username}: {message}</span>
            </li>
          ))}
            {newMessages && newMessages.map(({ id, message, username }) => (
    <li key={id} className="list-group-item d-flex">
      <span className="mr-auto">{username}: {message}</span>
    </li>
  ))}
        </ul>
      </div>
    );
  };
  
  export default Messages;

