import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import _ from "lodash";
import { fetchMessages, selectors  } from '../slices/messagesSlice.js';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.msgEl = React.createRef();
  }

  componentDidMount() {
    (this.msgEl.current).scrollIntoView(false);
  }

  render() {
    return <div ref={this.msgEl} key={this.props.id} className="text-break mb-2">
      <b>{this.props.username}</b>: {this.props.message}
    </div>
  }
}

const Messages = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    try {
      dispatch(fetchMessages());
    } catch(err) {
      toast.error(t('networkError'), {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  }, [dispatch, t]);

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
      {/* {msgsCurChan &&
        msgsCurChan.map(({ id, message, username }) => (
          <div key={id} className="text-break mb-2">
            <b>{username}</b>: {message}
          </div>
        ))
        } */}
      {msgsCurChan &&
        msgsCurChan.map(({ id, message, username }) => (
          <Message message={message} id={id} username={username} key={id}/>
        ))
      }
    </div>
  );
};

export default Messages;
