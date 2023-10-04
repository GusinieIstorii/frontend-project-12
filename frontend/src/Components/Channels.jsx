import React, { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import ActiveChannelContext from '../Contexts/ActiveChannelContext';
import { fetchChannels, selectors } from '../slices/channelsSlice';
import { changeActiveChannel } from '../slices/activeChannelSlice';

const Channels = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
      dispatch(fetchChannels());
    }, [dispatch]);

    const channels = useSelector(selectors.selectAll);

    const [activeChannel, setActiveChannel] = useState(1);

    const handleChannel = (e) => {
      const newActiveChannelId = e.target.getAttribute('data-channelid');
      dispatch(changeActiveChannel(newActiveChannelId));
      setActiveChannel(newActiveChannelId);
    };
  
    return channels && (
        <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
          {channels.map(({ id, name }) => {
            if (Number(id) === Number(activeChannel)) { //не понимаю в какой момент стейт решил что это строка
              return (
                <li key={id} className="nav-item w-100">
                  <button type='button' className='w-100 rounded-0 text-start btn btn-secondary'>
                    <span className='me-1'>#</span>{name}
                    </button>
                </li>
              )
            } else {
              return (
                <li key={id} className="nav-item w-100">
                  <button type='button' className='w-100 rounded-0 text-start btn' onClick={handleChannel} data-channelid={id}>
                    <span className='me-1'>#</span>{name}
                    </button>
                </li>
              )
            }
            })}
        </ul>
    );
  };
  
  export default Channels;