import React, { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import ActiveChannelContext from '../Contexts/ActiveChannelContext';
import { addChannel, selectors } from '../slices/channelsSlice';
import { changeActiveChannel } from '../slices/activeChannelSlice';

const AddChanBut = () => {

    return(
        <button type='button'>hi</button>
    )
};

export default AddChanBut;