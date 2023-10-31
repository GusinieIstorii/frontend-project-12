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

  const CONNECT_SOCKET = 'messages/CONNECT_SOCKET';
  const DISCONNECT_SOCKET = 'messages/DISCONNECT_SOCKET';
  const RECEIVE_MESSAGE = 'messages/RECEIVE_MESSAGE';

  const connectSocket = () => ({
    type: CONNECT_SOCKET,
  });

  const disconnectSocket = () => ({
    type: DISCONNECT_SOCKET,
  });

  const receiveMessage = (message) => ({
    type: RECEIVE_MESSAGE,
    payload: message,
  });

  const sendMessage = (message) => () => {
    socket.emit('newMessage', message);
  };

  const startListening = () => (dispatch) => {
    dispatch(connectSocket());

    socket.on('connect', () => {
      console.log('Соединение установлено');
    });

    socket.on('newMessage', (data) => {
      dispatch(receiveMessage(data));
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
      loggedIn, logIn, logOut, startListening, sendMessage, receiveMessage,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// export default AuthContext;
export { AuthProvider, AuthContext };
