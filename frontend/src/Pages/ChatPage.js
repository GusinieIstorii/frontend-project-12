import { Link, Outlet } from "react-router-dom";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Channels from "../Components/Channels.jsx";
import Messages from "../Components/Messages.jsx";
import AddChanBut from "../Components/AddChanBut.jsx";
import NewMsgForm from "../Components/NewMsgForm.jsx";
// import LoginForm from '../Components/LoginForm';

export const ChatPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("userId"));
    console.log(userId);
    if (!userId) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <div className="container h-75 my-5 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-2 border-end p-3 bg-light flex-column h-100 d-flex">
            <b>Каналы</b> 
            <AddChanBut />
            <Channels />
          </div>
          <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
              <div className="bg-light p-3 shadow-sm small">
              <p className="m-0"><b># random</b></p>
              <span className="text-muted">16 сообщений</span>
              </div>
            <div className="overflow-auto p-3">
              <Messages />
            </div>
            <div className="mt-auto px-5 py-3">
              <NewMsgForm />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};
