import React, { useReducer } from 'react';
import axios from "axios"
import { APIposts, APIsposts } from '../helpers/config';

export const postsContext = React.createContext()
const INIT_STATE = {
    posts: [],
    roomposts: [],
}
const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "POST_EXIST":
            return { ...state, post_exist: action.payload };
        case "ROOM_POSTS":
            return { ...state, roomposts: action.payload }
        default:
            return state;
    }
}

const PostsContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE)


    const createPost = async (post, user, createdAt, roomtitle) => {
        // console.log(user, createdAt)
        post["roomtitle"] = roomtitle
        post["owner"] = user.username;
        post["CreatedAt"] = createdAt
        console.log(post)
        try {
            await axios.post(APIposts, post)

        } catch (e) {
            console.log(e)
        }
    }

    const getPostsByRoom = async (title) => {
        try {
            let tempApi = APIsposts + "?roomtitle=" + title
            // console.log(tempApi)
            let result = await axios(tempApi)
            dispatch({
                type: "ROOM_POSTS",
                payload: result.data,
            })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <postsContext.Provider
            value={{
                createPost,
                getPostsByRoom,
                roomposts: state.roomposts,
            }}
        >

            {props.children}
        </postsContext.Provider>
    );
};

export default PostsContextProvider;