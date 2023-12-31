import axios from 'axios';
import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit';
// import socket from '../utils/socket.js';
// import { useContext } from 'react';
// import { AuthContext } from '../Contexts/AuthContext.jsx';
import routes from '../utils/routes.js';

// const { socket } = useContext(AuthContext);
const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
};

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async () => {
    const header = getAuthHeader();

    const response = await axios.get(routes.dataPath(), {
      headers: header,
    });
    return response.data.channels;
  },
);

// export const addChannel = createAsyncThunk(
//   'channels/addChannel',
//   async (channel) => {
//     await socket.timeout(5000).emit('newChannel', channel, (err) => {
//       if (err) {
//         console.log('сервер тормозит или упал :С');
//       }
//     });
//   },
// );

// export const getNewChannel = createAsyncThunk(
//   'channels/getNewChannel',
//   async (_, { dispatch }) => {
//     await socket.on('newChannel', (channeleWithId) => {
//       dispatch({ type: 'channels/saveNewChannel', payload: channeleWithId });
//     });
//   },
// );

// export const emitRemoveChan = createAsyncThunk(
//   'channels/emitRemoveChan',
//   async (channel) => {
//     await socket.timeout(5000).emit('removeChannel', channel, (err) => {
//       if (err) {
//         console.log('сервер тормозит или упал :С');
//       }
//     });
//   },
// );

// export const subRemoveChan = createAsyncThunk(
//   'channels/subRemoveChan',
//   async (_, { dispatch }) => {
//     await socket.on('removeChannel', (channel) => {
//       dispatch({ type: 'channels/removeChannel', payload: channel.id });
//     });
//   },
// );

// export const emitRenameChan = createAsyncThunk(
//   'channels/emitRenameChan',
//   async (channel) => {
//     await socket.timeout(5000).emit('renameChannel', channel, (err) => {
//       if (err) {
//         console.log('сервер тормозит или упал :С');
//       }
//     });
//   },
// );

// export const subRenameChan = createAsyncThunk(
//   'channels/subRenameChan',
//   async (_, { dispatch }) => {
//     await socket.on('renameChannel', (channelWithNewName) => {
//       dispatch({ type: 'channels/renameChannel', payload:
// { id: channelWithNewName.id, changes: channelWithNewName } });
//     });
//   },
// );

const channelsAdapter = createEntityAdapter();
// набор готовых редьюсеров и селекторов для основных операций над сущностями

const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState({ loadingStatus: 'idle', error: null }), // По умолчанию: { ids: [], entities: {} }
  reducers: {
    RECEIVE_CHANNEL: (state, { payload }) => {
      channelsAdapter.addOne(state, payload);
    },
    RECEIVE_REMOVED_CHANNEL: (state, { payload }) => {
      console.log(payload);
      channelsAdapter.removeOne(state, payload.id);
    },
    RECEIVE_RENAMED_CHANNEL: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.entities[payload.id].name = payload.name;
    },
  },
  extraReducers: (builder) => { // Для реакции на действия, происходящие в других слайсах
    builder
      .addCase(fetchChannels.fulfilled, channelsAdapter.addMany);
  },
});

export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;

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
