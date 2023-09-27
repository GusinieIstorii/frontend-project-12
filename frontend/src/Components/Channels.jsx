import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchChannels, selectors } from '../slices/channelsSlice';

const Channels = () => {
    const dispatch = useDispatch();
    const channels = useSelector(selectors.selectAll);
    useEffect(() => {
      dispatch(fetchChannels());
    }, [dispatch]);
    
    console.log(channels);
    
    // const handleRemoveTask = (id) => {
    //   dispatch(removeTask(id));
    // };
  
    return channels && (
        <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
          {channels.map(({ id, name }) => (
            <li key={id} className="list-group-item d-flex">
              <span className="mr-auto">{name}</span>
            </li>
          ))}
        </ul>
    );
  };
  
  export default Channels;