import React, { useState } from "react";
import { useDispatch } from "react-redux";
import io from "socket.io-client";
// import { sendMessage } from '../slices/messagesSlice.js';

const NewMsgForm = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleSendMsg = (e) => {
    e.preventDefault();
    const socket = io('<http://localhost>');
    const form = e.target;
    const value = form.querySelector("input").value;
    socket.emit("newMessage", { message: value });
  };

  // а в компоненте messages их нужно принять и показать

  const onChange = (e) => setName(e.target.value);
  
  return (
    <form action="" className="form-inline" onSubmit={handleSendMsg}>
      <div className="form-group mx-sm-3">
        <input
          type="text"
          data-testid="input"
          required
          value={name}
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
