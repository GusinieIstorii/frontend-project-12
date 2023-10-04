import {
    createSlice,
  } from "@reduxjs/toolkit";

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
  })

export const { changeActiveChannel } = activeChannelSlice.actions;
export default activeChannelSlice.reducer;