import React, { useContext, useEffect, useState } from 'react';
import { commentsContext } from '../../contexts/CommentsContext';
import iMG from "../../images/userdef.png";

import { timeSince } from '../general/Post';
import "./comments.css";
const Comment = ({ val }) => {
    const { deleteCommentForPost } = useContext(commentsContext)
    // console.log(props)
    const [timeLeft, setTimeLeft] = useState(0);
    function deleteComment() {
        deleteCommentForPost(val.id, val.postId)
    }
    useEffect(() => {
        setTimeLeft(timeSince(val.createdAtMs));
    }, []);
    console.log(val)
    return (
        <div className="row d-flex justify-content-center mt-2">
            <div className="mx-2">

                <div className="card p-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="user d-flex flex-row align-items-center"> <img src={iMG} width="30" className="user-img rounded-circle mr-2" ></img> <span><small className="text-primary" style={{ fontWeight: "bold" }}>{val.owner}</small> <div className="font-weight-bold">{val.comment}</div></span> </div> <small>{timeLeft} ago</small>
                    </div>
                    <div className="action d-flex justify-content-between mt-2 align-items-center">
                        <div className="reply px-4"> <button style={{ border: 0, backgroundColor: "white" }} onClick={deleteComment} ><small>Remove</small></button> <span className="dots"></span> <small>Reply</small> <span className="dots"></span> </div>
                        <div className="icons align-items-center"> <i className="fa fa-star text-warning"></i> <i className="fa fa-check-circle-o check-icon"></i> </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comment;