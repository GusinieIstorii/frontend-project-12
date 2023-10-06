import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import socket from "../socket";
// import _ from "lodash";
import { fetchMessages, selectors  } from "../slices/messagesSlice";
import { actions as msgsActions } from '../slices/messagesSlice';
// START EXPERIMENTS

const Messages = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  const allMessages = useSelector(selectors.selectAll);
  const curChannel = useSelector((state) =>
    Number(state.activeChannel.activeChannelId)
  );

  const [msgsCurChan, setMsgsCurChan] = useState();

  useEffect(() => {
    console.log(`cur chan ${curChannel}`)
    const allMessagesValues = Object.values(allMessages);
    const messages = allMessagesValues.filter(
      (message) => Number(message.channelId) === Number(curChannel)
    );
    setMsgsCurChan(messages);
  }, [curChannel, allMessages]);

  return (
    <div>
      {msgsCurChan &&
        msgsCurChan.map(({ id, message, username }) => (
          <div key={id} className="text-break mb-2">
            <b>{username}</b>: {message}
          </div>
        ))}
    </div>
  );
};

export default Messages;
