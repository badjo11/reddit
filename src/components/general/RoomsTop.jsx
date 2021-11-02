import React from 'react';
import { Card, Button } from 'react-bootstrap';

const RoomsTop = () => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://www.akchabar.kg/media/news/5b032b9c-f4cf-4568-a311-8d22e41b9e18.png.850x445_q80_crop.png" />
            <Card.Body>
                <Card.Title>Rooms</Card.Title>
                <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero optio quo omnis, hic, blanditiis sapiente illum voluptatem iure repellat aliquam nesciunt, unde mollitia. Hic ipsa aut laudantium eveniet qui excepturi.
                </Card.Text>
                <Button variant="primary" style={{ width: "100%" }}>View all</Button>
            </Card.Body>
        </Card>
    );
};

export default RoomsTop;