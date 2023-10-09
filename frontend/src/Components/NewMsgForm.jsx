import React, { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
// import socket from "../socket";
// import ActiveChannelContext from "../Contexts/ActiveChannelContext";
import { actions as messagesActions } from '../slices/messagesSlice';
import { sendMessage, getNewMessage  } from "../slices/messagesSlice";
import profanityFilter from "../profanityFilter";
import { useTranslation } from "react-i18next";


const NewMsgForm = () => {
  const [inputValue, setValue] = useState("");
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const initialActiveChannel = useSelector((state) => state.activeChannel.activeChannelId);

  const handleSendMsg = (e) => {
    e.preventDefault();
    const form = e.target;
    const value = profanityFilter(form.querySelector("input").value);
    const userId = JSON.parse(localStorage.getItem("userId"));
    const {username} = userId;
    dispatch(sendMessage({message: value, username, channelId: initialActiveChannel}));
    dispatch(getNewMessage());
  };

  

  const onChange = (e) => setValue(e.target.value);
  
  return (
    <form action="" className="form-inline" onSubmit={handleSendMsg}>
      <div className="form-group mx-sm-3">
        <input
          type="text"
          data-testid="input"
          required
          value={inputValue}
          onChange={onChange}
          placeholder={t('chat.inputMsg')}
        />
      </div>
      <input
        type="submit"
        data-testid="submit"
        className="btn btn-primary btn-sm"
        value="Add"
      />
    </form>
  );
};

export default NewMsgForm;
