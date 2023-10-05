import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import socket from "../socket";
// import _ from "lodash";
import { fetchMessages, selectors  } from "../slices/messagesSlice";
import { actions as msgsActions } from '../slices/messagesSlice';

const Messages = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  const allPrevMsgs = useSelector(selectors.selectAll);
  const curChannel = useSelector((state) =>
    Number(state.activeChannel.activeChannelId)
  );

  const [prevMsgs, setPrevMsgs] = useState();

  useEffect(() => {
    console.log(`cur chan ${curChannel}`)
    const allMessages = Object.values(allPrevMsgs);
    const messages = allMessages.filter(
      (message) => Number(message.channelId) === Number(curChannel)
    );
    setPrevMsgs(messages);
  }, [curChannel, allPrevMsgs]);

  const [newMessages, setMessages] = useState([]);

  socket.on("newMessage", (messageWithId) => {
    const newMessagesSet = [...newMessages, messageWithId];
    setMessages(newMessagesSet);
  });

  socket.on("removeChannel", ({ id }) => {
    dispatch(msgsActions.removeMessages(id));
  //   const newChannelsSet = newChannels.filter(
  //     (channel) => Number(channel.id) !== Number(id)
  //   );
  //   setChannels(newChannelsSet);
  //   if (Number(id) === Number(activeChannel)) {
  //     setActiveChannel(1);
  //     dispatch(changeActiveChannel(1));
  //   }
  });

  return (
    <div>
      {prevMsgs &&
        prevMsgs.map(({ id, message, username }) => (
          <div key={id} className="text-break mb-2">
            <b>{username}</b>: {message}
          </div>
        ))}
      {newMessages &&
        newMessages.map(({ id, message, username, channelId }) => {
          if (Number(channelId) === Number(curChannel)) {
            return (
              <div key={id} className="text-break mb-2">
                <b>{username}</b>: {message}
              </div>
            );
          }
          return null;
        })}
    </div>
  );
};

export default Messages;
