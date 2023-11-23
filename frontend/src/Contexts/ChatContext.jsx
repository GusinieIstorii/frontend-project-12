import React, { createContext } from 'react';
// import io from 'socket.io-client';

const ChatContext = createContext({});

const ChatProvider = ({ children, socket }) => {
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

  return (
  // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ChatContext.Provider value={{
      startListening,
      sendMessage,
      addChannel,
      removeChannel,
      renameChannel,
    }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// export default AuthContext;
export { ChatProvider, ChatContext };
