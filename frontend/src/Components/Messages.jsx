import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchMessages, selectors } from '../slices/messagesSlice';

const Messages = () => {
    const dispatch = useDispatch();
    const messages = useSelector(selectors.selectAll);
    useEffect(() => {
      dispatch(fetchMessages());
    }, [dispatch]);
    
    console.log(messages);
    
    // const handleRemoveTask = (id) => {
    //   dispatch(removeTask(id));
    // };
  
    return messages && (
      <div className="mt-3">
        <ul className="list-group">
          {messages.map(({ id, name }) => (
            <li key={id} className="list-group-item d-flex">
              <span className="mr-auto">{name}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Messages;