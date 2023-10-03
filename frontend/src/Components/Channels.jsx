import React, { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ActiveChannelContext from '../Contexts/ActiveChannelContext';

import { fetchChannels, selectors } from '../slices/channelsSlice';

const Channels = () => {
    const dispatch = useDispatch();
    const channels = useSelector(selectors.selectAll);
    useEffect(() => {
      dispatch(fetchChannels());
    }, [dispatch]);

    const {activeChannel, setActiveChannel} = useContext(ActiveChannelContext); // но можно ли менять контекст из компонента? на этот контекст завязан App, newmessagesform, messages
    
    console.log(activeChannel);
    
    // const handleRemoveTask = (id) => {
    //   dispatch(removeTask(id));
    // };
  
    return channels && (
        <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
          {channels.map(({ id, name }) => {
            if (id === activeChannel) {
              console.log(name);
              return (
                <li key={id} className="list-group-item d-flex">
                  <b>{name}</b>
                </li>
              )
            } else {
              return (
                <li key={id} className="list-group-item d-flex">
                  <p>{name}</p>
                </li>
              )
            }
            })}
        </ul>
    );
  };
  
  export default Channels;