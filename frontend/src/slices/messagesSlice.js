import axios from "axios";
import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import routes from "../routes.js";
import socket from "../socket.js";
import { actions as channelsActions } from "./channelsSlice.js";
import { toast } from 'react-toastify';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem("userId"));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
};

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async () => {
    try{
      const header = getAuthHeader();
    const response = await axios.get(routes.dataPath(), {
      headers: header,
    });
    console.log(response.data);
    return response.data.messages;
    } catch(err) {
      toast.error('Данные не загружены', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
    
  }
);

export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async (message) => {
    await socket.timeout(5000).emit("newMessage", message, (err) => {
      if (err) {
        alert("сервер тормозит или упал :С");
      }
    });
  }
);

export const getNewMessage = createAsyncThunk(
  "messages/getNewMessage",
  async (_, { getState, dispatch }) => {
     await socket.on("newMessage", (messageWithId) => {
      dispatch({ type: "messages/saveNewMessage", payload: messageWithId });
    });
  }
);

const messagesAdapter = createEntityAdapter(); // набор готовых редьюсеров и селекторов для основных операций над сущностями

const messagesSlice = createSlice({
  name: "messages",
  initialState: messagesAdapter.getInitialState({
    loadingStatus: "idle",
    error: null,
  }), // По умолчанию: { ids: [], entities: {} }
  reducers: {
    // почему при таком варианте вылетает ошибка? Cannot perform 'get' on a proxy that has been revoked
    // sendMessage: (state, { payload }) => { 
    //   const message = payload;
    //   socket.timeout(5000).emit("newMessage", message, (err) => {
    //     if (err) {
    //       alert("сервер тормозит или упал :С");
    //     }
    //   });
    //   socket.on("newMessage", (messageWithId) => {
    //     console.log("i received message");
    //     console.log(messageWithId); // {message: 'test8', username: 'admin', channelId: '43', id: 53}
    //     messagesAdapter.addOne(state, messageWithId);
    //   });
    // },
    saveNewMessage: (state, { payload }) => {
      console.log(payload);
      messagesAdapter.addOne(state, payload);
    },
    // removeMessages: (state, { payload }) => { 
    //   const channelId = payload;
    //   const restEntities = Object.values(state.entities).filter(
    //     (e) => e.channelId !== channelId
    //   );
    //   messagesAdapter.setAll(state, restEntities);
    // },
  },

  extraReducers: (builder) => {
    // Для реакции на действия, происходящие в других слайсах
    builder.addCase(fetchMessages.fulfilled, messagesAdapter.addMany)
    .addCase(channelsActions.removeChannel, (state, {payload}) => {
      console.log(`extra reducer ${payload}`);
      const channelId = payload;
      const restEntities = Object.values(state.entities).filter(
        (e) => e.channelId !== channelId
      );
      messagesAdapter.setAll(state, restEntities);
    });
  },
});

export const { actions } = messagesSlice;
export const selectors = messagesAdapter.getSelectors(
  (state) => state.messages
);
export default messagesSlice.reducer;




//   // addTask: tasksAdapter.addOne,
//   sendMessage: (state, {payload}) => {
//     const message = payload;
//     console.log(`message sent ${message}`);
//     socket.timeout(5000).emit("newMessage", message, (err) => {
//       if (err) {
//         alert('сервер тормозит или упал :С');
//       }
//     });
//   }

// .addCase(getNewMessage.fulfilled, messagesAdapter.addOne);
// .addCase(getNewMessage.fulfilled, (state, action) => {
//   // Добавляем задачу
//   console.log(action);
//   // messagesAdapter.addOne(state, action.payload);
// })
// .addCase(removeTask.fulfilled, (state, action) => {
//   // удаляем задачу
//   console.log(action);
//   tasksAdapter.removeOne(state, action);
//   state.loadingStatus = 'idle';
//   state.error = null;
// });
