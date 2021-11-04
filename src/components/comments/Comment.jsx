import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { timeSince } from '../general/Post';

const Comment = ({ val }) => {
    // console.log(props)
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        setTimeLeft(timeSince(val.createdAtMs));
    }, []);
    return (
        <Card className="bg-light mt-2">
            <Card.Header style={{ fontWeight: "bold" }}>{val.owner} · <span style={{ fontWeight: '500', fontSize: '12px' }}> {timeLeft} ago</span></Card.Header>
            <Card.Body>
                <Card.Text>
                    {val.comment}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Comment;