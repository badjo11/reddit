import React, { useContext, useEffect, useState } from "react";
import MainPSideB from '../components/pageScructure/mainPage/MainPSideB';
import RoomList from '../components/roomPage/RoomList';
import { roomsContext } from "../contexts/RoomsContext";

const AllRooms = () => {
    const { getAllRooms, rooms } = useContext(roomsContext)
    useEffect(() => {
        getAllRooms()
    }, [])

    let categories = rooms.map((item) => {
        return item.category
    })
    const arrOfColor = ['#00BFFF', '#808080', '	#FFA000', '	#FF4364', '#32CD32']

    const [content, setContent] = useState(<div className="category_rooms">
        <h2>All rooms</h2>
        <RoomList />
    </div>)
    function handleClick(cat) {
        let temp = rooms.filter((item, index, array) => {
            return item.category === cat
        })
        if (cat === 'all') {
            setContent(<div className="category_rooms">
                <h2>All rooms</h2>
                <RoomList />
            </div>)
        }
        else {
            setContent(<div className="category_rooms ">
                <h2>All {cat} rooms </h2>

                {
                    temp.map((item, index) => (
                        <a key={item.id} href={"/r/" + item.roomtitle}>
                            <h3>{index + 1} <div style={{ display: 'inline-block', backgroundColor: arrOfColor[index % 4], borderRadius: '50%', fontSize: '40px', width: '50px', height: '50px', textAlign: 'center', color: 'white' }}>{item.roomtitle.charAt(0)}</div> {item.roomtitle}</h3>
                        </a>
                    ))
                }

            </div>)
        }
        // console.log(cat)
    }

    categories = categories.filter((item, index, array) => array.indexOf(item) === index)
    return (
        <div className="bg-light">
            <div className="container all_rooms">
                <div className="rooms-sidebar">
                    <h2 className="bg-dark pt-2 pb-2 " style={{ color: 'white' }}>Categories</h2>
                    <ul>
                        <li key='all' onClick={() => {
                            handleClick('all')
                        }}>All categories</li>
                        {
                            categories.map((item) => (
                                <li key={item} onClick={() => {
                                    handleClick(item)
                                }}>{item.toUpperCase()}</li>
                            ))
                        }
                    </ul>
                </div>
                {content}
                <MainPSideB />
            </div>
        </div>
    );
};

export default AllRooms;