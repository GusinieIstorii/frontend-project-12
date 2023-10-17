import {
  createSlice,
} from '@reduxjs/toolkit';
import { actions as channelsActions } from './channelsSlice.js';

const initialState = { activeChannelId: 1 };

const activeChannelSlice = createSlice({
  name: 'activeChannel',
  initialState,
  reducers: {
    changeActiveChannel: (state, action) => {
      state.activeChannelId = action.payload;
    },
    // removeTask: tasksAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder.addCase(channelsActions.saveNewChannel, (state, action) => {
      console.log(action);
      const newIdActiveChan = action.payload.id;
      state.activeChannelId = newIdActiveChan;
    })
  }
})

export const { changeActiveChannel } = activeChannelSlice.actions;
export default activeChannelSlice.reducer;