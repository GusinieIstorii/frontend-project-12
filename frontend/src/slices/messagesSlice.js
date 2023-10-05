import axios from "axios";

import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import routes from "../routes.js";

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
    const header = getAuthHeader();
    const response = await axios.get(routes.dataPath(), {
      headers: header,
    });
    console.log(response.data);
    return response.data.messages;
  }
);

// export const sendMessage = createAsyncThunk(
//     'messages/sendMessage',
//     async (task) => {
//       const { data } = await axios.post(routes.tasksPath(), task);
//       return data;
//     },
//   );

const messagesAdapter = createEntityAdapter(); // набор готовых редьюсеров и селекторов для основных операций над сущностями

const messagesSlice = createSlice({
    name: 'messages',
    initialState: messagesAdapter.getInitialState({ loadingStatus: 'idle', error: null }), // По умолчанию: { ids: [], entities: {} }
    reducers: {
      // addTask: tasksAdapter.addOne,
      removeMessages: (state, {payload}) => {
        const channelId = payload;
        const restEntities = Object.values(state.entities).filter((e) => e.channelId !== channelId);
        messagesAdapter.setAll(state, restEntities);
      },
    },
    extraReducers: (builder) => { // Для реакции на действия, происходящие в других слайсах
      builder
        .addCase(fetchMessages.fulfilled, messagesAdapter.addMany)
        // .addCase(addTask.fulfilled, (state, action) => {
        //   // Добавляем задачу
        //   console.log(action);
        //   tasksAdapter.addOne(state, action.payload);
        //   state.loadingStatus = 'idle';
        //   state.error = null;
        // })
        // .addCase(removeTask.fulfilled, (state, action) => {
        //   // удаляем задачу
        //   console.log(action);
        //   tasksAdapter.removeOne(state, action);
        //   state.loadingStatus = 'idle';
        //   state.error = null;
        // });
    },
  })

export const { actions } = messagesSlice;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;