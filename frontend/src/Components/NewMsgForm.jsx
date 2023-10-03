import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import socket from "../socket";
import ActiveChannelContext from "../Contexts/ActiveChannelContext";

// import { sendMessage } from '../slices/messagesSlice.js';

const NewMsgForm = () => {
  const [inputValue, setValue] = useState("");
  const {activeChannel, setActiveChannel} = useContext(ActiveChannelContext);
  const dispatch = useDispatch();

  const handleSendMsg = (e) => {
    e.preventDefault();
    
    const form = e.target;
    const value = form.querySelector("input").value;
    const userId = JSON.parse(localStorage.getItem("userId"));
    const {username} = userId;
    socket.timeout(5000).emit("newMessage", { message: value, username, channelId: activeChannel }, (err) => {
      if (err) {
        alert('сервер тормозит или упал :С');
      }
    })
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
