import React from 'react';
import Navibar from '../components/Navibar';
import RoomBody from '../components/roomsComponents/RoomBody';
import RoomHeader from '../components/roomsComponents/RoomHeader';

const RoomsPage = () => {
    return (
        <>
            <Navibar />
            <RoomHeader />
            <RoomBody />

        </>
    );
};

export default RoomsPage;