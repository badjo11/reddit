import React, { useContext, useEffect, useState } from 'react';
import { FormControl } from 'react-bootstrap';
import { commentsContext } from '../../contexts/CommentsContext';
import iMG from "../../images/userdef.png";

import { timeSince } from '../general/Post';
import "./comments.css";
const Comment = ({ val }) => {
    const { getCommentById, editedComment, deleteCommentForPost, editCommentById } = useContext(commentsContext)
    // console.log(props)
    const [editComm, setEditComm] = useState()
    const [timeLeft, setTimeLeft] = useState(0);
    let user = localStorage.getItem("user");
    user = JSON.parse(user);

    let deletButton
    let divInput
    const [bool, setBool] = useState(false)
    function editComment() {
        setBool(true)
        setEditComm(val.comment)
    }
    function deleteComment() {
        deleteCommentForPost(val.id, val.postId)
    }

    useEffect(() => {
        setTimeLeft(timeSince(val.createdAtMs));
    }, []);
    function handleEditChange(e) {
        setEditComm(e.target.value)
    }
    function saveEdit() {
        editCommentById({ ...val, comment: editComm, edited: true }, val.postId)
        setBool(false)
    }
    let editing
    // console.log(val.edited)
    if (val.edited) {
        editing = <small style={{ color: 'orange' }}>Edited</small>
    }
    if (user.username === val.owner) {
        deletButton =
            <>
                <button style={{ border: 0, backgroundColor: "white" }} onClick={deleteComment} >
                    <small>Remove</small>
                    <span className="dots"></span>
                </button>
                <button style={{ border: 0, backgroundColor: "white" }} onClick={editComment} >
                    <small>Edit</small>
                    <span className="dots"></span>
                </button>
            </>
    }
    if (!bool) {
        divInput = <>
            <div className="row d-flex justify-content-center mt-2">
                <div className="mx-2">
                    <div className="card p-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="user d-flex flex-row align-items-center">
                                <img src={iMG} width="30" className="user-img rounded-circle mr-2" ></img>
                                <span>
                                    <small className="text-primary" style={{ fontWeight: "bold" }}>{val.owner}
                                    </small>
                                    <div className="font-weight-bold">
                                        {val.comment}
                                    </div>
                                </span>
                            </div>
                            <small>
                                {timeLeft} ago
                            </small>
                        </div>
                        <div className="action d-flex justify-content-between mt-2 align-items-center">
                            <div className="reply px-4">
                                {deletButton}
                                <small>
                                    Reply
                                </small>
                                <span className="dots"></span>
                            </div>
                            <div className="icons align-items-center">
                                <i className="fa fa-star text-warning"></i>
                                <i className="fa fa-check-circle-o check-icon"></i>
                                {editing}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    } else {
        divInput = <>
            <div className="row d-flex justify-content-center mt-2">
                <div className="mx-2">

                    <div className="card p-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="user d-flex flex-row align-items-center">
                                <img src={iMG} width="30" className="user-img rounded-circle mr-2" ></img>
                                <span>
                                    <small className="text-primary" style={{ fontWeight: "bold" }}>{val.owner}
                                    </small>
                                    <div className="font-weight-bold">
                                        <FormControl
                                            rows={2}
                                            as="textarea"
                                            placeholder="Your comment"
                                            maxLength="140"
                                            onChange={handleEditChange}
                                            style={{ width: "300%", maxWidth: '200%' }}
                                            value={editComm}
                                        />
                                    </div>
                                </span>
                            </div>
                            <small>
                                {timeLeft} ago
                            </small>
                        </div>
                        <div className="action d-flex justify-content-between mt-2 align-items-center">
                            <div className="reply px-4">
                                <small>
                                    <button onClick={saveEdit}>Save</button>
                                </small>
                                <span className="dots"></span>
                            </div>
                            <div className="icons align-items-center">
                                <i className="fa fa-star text-warning"></i>
                                <i className="fa fa-check-circle-o check-icon"></i>
                                {editing}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    }

    return (
        <>
            {divInput}
        </>
    );
};

export default Comment;