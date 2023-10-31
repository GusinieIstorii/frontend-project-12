import React, { createContext, useState, useEffect } from 'react';
// import io from 'socket.io-client';

const AuthContext = createContext({});

const AuthProvider = ({ children, socket }) => {
  const [loggedIn, setLoggedIn] = useState();

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  const userId = JSON.parse(localStorage.getItem('userId'));

  useEffect(() => {
    if (!userId) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  }, [userId]);

  const connectSocket = () => ({
    type: 'CONNECT_SOCKET',
  });

  const disconnectSocket = () => ({
    type: 'DISCONNECT_SOCKET',
  });

  const receiveMessage = (message) => ({
    type: 'messages/RECEIVE_MESSAGE',
    payload: message,
  });

  const sendMessage = (message) => () => {
    socket.emit('newMessage', message);
  };

  const receiveChannel = (channel) => ({
    type: 'channels/RECEIVE_CHANNEL',
    payload: channel,
  });

  const addChannel = (channel) => {
    socket.emit('newChannel', channel);
  };

  const receiveRemovedChannel = (channel) => ({
    type: 'channels/RECEIVE_REMOVED_CHANNEL',
    payload: channel,
  });

  const removeChannel = (channel) => {
    socket.emit('removeChannel', channel);
  };

  const receiveRenamedChannel = (channel) => ({
    type: 'channels/RECEIVE_RENAMED_CHANNEL',
    payload: channel,
  });

  const renameChannel = (channel) => {
    socket.emit('renameChannel', channel);
  };

  const startListening = () => (dispatch) => {
    dispatch(connectSocket());

    socket.on('connect', () => {
      console.log('Соединение установлено');
    });

    socket.on('newMessage', (data) => {
      dispatch(receiveMessage(data));
    });

    socket.on('newChannel', (data) => {
      dispatch(receiveChannel(data));
    });

    socket.on('removeChannel', (data) => {
      dispatch(receiveRemovedChannel(data));
    });

    socket.on('renameChannel', (data) => {
      dispatch(receiveRenamedChannel(data));
    });

    socket.on('disconnect', () => {
      dispatch(disconnectSocket());
      console.log('Соединение закрыто');
    });
  };

  // const socket = io();

  return (
  // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{
      loggedIn,
      logIn,
      logOut,
      startListening,
      sendMessage,
      addChannel,
      removeChannel,
      renameChannel,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// export default AuthContext;
export { AuthProvider, AuthContext };
