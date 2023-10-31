import React, {
  useState, useRef, useEffect, useContext,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../Contexts/AuthContext.jsx';
import profanityFilter from '../utils/profanityFilter.js';

const NewMsgForm = () => {
  const { sendMessage } = useContext(AuthContext);
  const [inputValue, setValue] = useState('');
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputEl = useRef(null);
  const submitEl = useRef(null);
  useEffect(() => {
    inputEl.current.focus();
  });

  const initialActiveChannel = useSelector(
    (state) => state.activeChannel.activeChannelId,
  );

  const handleSendMsg = (e) => {
    e.preventDefault();
    inputEl.current.readOnly = true;
    submitEl.current.disabled = true;
    const form = e.target;
    const value = profanityFilter(form.querySelector('input').value);
    const userId = JSON.parse(localStorage.getItem('userId'));
    const { username } = userId;
    dispatch(
      sendMessage({ message: value, username, channelId: initialActiveChannel }),
    );
    inputEl.current.readOnly = false;
    submitEl.current.disabled = false;
    setValue('');
  };

  const onChange = (e) => setValue(e.target.value);

  return (
    <form action="" className="border rounded-2" onSubmit={handleSendMsg} aria-label="Новое сообщение">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          required
          placeholder={t('chat.inputMsg')}
          aria-label="message"
          aria-describedby="button-addon2"
          value={inputValue}
          onChange={onChange}
          ref={inputEl}
        />
        <button
          className="btn btn-primary"
          type="submit"
          id="button-addon2"
          ref={submitEl}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-send"
            viewBox="0 0 16 16"
          >
            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default NewMsgForm;
