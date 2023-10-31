import axios from 'axios';
import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import routes from '../utils/routes.js';
import { actions as channelsActions } from './channelsSlice.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
};

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async () => {
    const header = getAuthHeader();
    const response = await axios.get(routes.dataPath(), {
      headers: header,
    });

    return response.data.messages;
  },
);

const messagesAdapter = createEntityAdapter();
// набор готовых редьюсеров и селекторов для основных операций над сущностями

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState({
    loadingStatus: 'idle',
    error: null,
  }), // По умолчанию: { ids: [], entities: {} }
  reducers: {
    RECEIVE_MESSAGE: (state, { payload }) => {
      messagesAdapter.addOne(state, payload);
    },
  },

  extraReducers: (builder) => {
    // Для реакции на действия, происходящие в других слайсах
    builder.addCase(fetchMessages.fulfilled, messagesAdapter.addMany)
      .addCase(channelsActions.RECEIVE_REMOVED_CHANNEL, (state, { payload }) => {
        console.log(`extra reducer ${payload}`);
        const channelId = payload;
        const restEntities = Object.values(state.entities).filter(
          (e) => e.channelId !== channelId,
        );
        messagesAdapter.setAll(state, restEntities);
      });
  },
});

export const { actions } = messagesSlice;
export const selectors = messagesAdapter.getSelectors(
  (state) => state.messages,
);
export default messagesSlice.reducer;
