import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap'
import { postsContext } from '../../contexts/PostsContext';

const PostList = () => {
    const { roomposts } = useContext(postsContext)

    return (
        <div >
            {
                roomposts.map((item) => (
                    <Card key={item.id} style={{ width: '95%', marginTop: "10px" }}>
                        <Card.Body>
                            <Card.Subtitle style={{ fontSize: "12px" }} className="mb-2 text-muted">Posted by: {item.owner} at {item.CreatedAt.match(/.{10}/)} {item.CreatedAt[11]}{item.CreatedAt[12]}{item.CreatedAt[13]}{item.CreatedAt[14]}{item.CreatedAt[15]}
                            </Card.Subtitle>
                            <Card.Title>{item.postName}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Room name: {item.roomtitle}</Card.Subtitle>
                            <Card.Text>
                                {item.postText}

                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="danger">
                                <img width="20px" src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png" />
                            </Button>

                        </Card.Footer>
                    </Card>
                ))
            }
        </div>
    );
};

export default PostList;