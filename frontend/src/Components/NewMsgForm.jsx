import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { sendMessage } from '../slices/messagesSlice.js';

const NewMsgForm = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

//   const handleSendMsg = (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const value = form.querySelector('input').value;
//     dispatch(sendMessage(value));
//   };

  const onChange = (e) => setName(e.target.value);

//   return (
//     <form action="" className="form-inline" onSubmit={handleSendMsg}>
//       <div className="form-group mx-sm-3">
//         <input
//           type="text"
//           data-testid="input"
//           required
//           value={name}
//           onChange={onChange}
//         />
//       </div>
//       <input type="submit" data-testid="submit" className="btn btn-primary btn-sm" value="Add" />
//     </form>
//   );
// };

return (
    <form action="" className="form-inline">
      <div className="form-group mx-sm-3">
        <input
          type="text"
          data-testid="input"
          required
          value={name}
          onChange={onChange}
        />
      </div>
      <input type="submit" data-testid="submit" className="btn btn-primary btn-sm" value="Add" />
    </form>
  );
};

export default NewMsgForm;
