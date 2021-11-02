import React, { useContext } from 'react';
import { Card } from 'react-bootstrap'
import { postsContext } from '../../contexts/PostsContext';

const PostList = () => {
    const { roomposts } = useContext(postsContext)
    // console.log(roomposts)
    return (
        <div >
            {
                roomposts.map((item) => (
                    <Card key={item.id} style={{ width: '95%', marginTop: "10px" }}>
                        <Card.Body>
                            <Card.Title>{item.postName}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{item.owner}</Card.Subtitle>
                            <Card.Subtitle className="mb-2 text-muted">{item.CreatedAt}</Card.Subtitle>
                            <Card.Subtitle className="mb-2 text-muted">{item.roomtitle}</Card.Subtitle>
                            <Card.Text>
                                {item.postText}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))
            }
        </div>
    );
};

export default PostList;