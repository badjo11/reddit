import React, { useContext, useEffect, useState } from 'react';
import { roomsContext } from '../../contexts/RoomsContext';

const RoomList = () => {
    const { getAllRooms, rooms } = useContext(roomsContext)
    useEffect(() => {
        getAllRooms()

    }, [])
    const arrOfColor = ['#00BFFF', '#808080', '	#FFA000', '	#FF4364', '#32CD32']
    return (
        <> <div className="mainListAllRooms">
            {rooms.length > 0 ? rooms.map((item, index) => (
                <a key={item.id} href={"/r/" + item.roomtitle}>
                    <h3>{index + 1} <div style={{ display: 'inline-block', backgroundColor: arrOfColor[index % 4], borderRadius: '50%', fontSize: '40px', width: '50px', height: '50px', textAlign: 'center', color: 'white' }}>{item.roomtitle.charAt(0)}</div> {item.roomtitle}</h3>
                </a>
            )) : <h2>loading...</h2>
            }
        </div>
            <div className="sidebarAllRooms">

            </div>

        </>
    );
};

export default RoomList;