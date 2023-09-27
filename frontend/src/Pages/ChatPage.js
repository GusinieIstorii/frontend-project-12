import { Link, Outlet } from "react-router-dom";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Channels from "../Components/Channels";
import Messages from "../Components/Messages";
import NewMsgForm from "../Components/NewMsgForm";
// import LoginForm from '../Components/LoginForm';

export const ChatPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("userId"));
    console.log(userId);
    if (!userId.token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <div>
        <div className="row h-100 bg-white flex-md-row">
          <p>I'm a chat page</p>
          <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                <b>Каналы</b>
                <button type="button" className="p-0 text-primary btn btn-group-vertical">
                <span class="visually-hidden">+</span>
                </button>
            </div>
          <Channels />
          </div>
          <div className="col p-0 h-100">
          <Messages />
          <NewMsgForm />
          </div>
          <Link to="/one">Page One</Link>
        </div>
      </div>
      <Outlet />
    </>
  );
};

