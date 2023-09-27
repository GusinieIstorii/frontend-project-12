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

export const fetchChannels = createAsyncThunk(
  "channels/fetchChannels",
  async () => {
    const header = getAuthHeader();
    const response = await axios.get(routes.dataPath(), {
      headers: header,
    });
    return response.data.channels;
  }
);

const channelsAdapter = createEntityAdapter(); // набор готовых редьюсеров и селекторов для основных операций над сущностями

const channelsSlice = createSlice({
    name: 'channels',
    initialState: channelsAdapter.getInitialState({ loadingStatus: 'idle', error: null }), // По умолчанию: { ids: [], entities: {} }
    reducers: {
      // addTask: tasksAdapter.addOne,
      // removeTask: tasksAdapter.removeOne,
    },
    extraReducers: (builder) => { // Для реакции на действия, происходящие в других слайсах
      builder
        .addCase(fetchChannels.fulfilled, channelsAdapter.addMany)
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

export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;