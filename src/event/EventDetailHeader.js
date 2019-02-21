import React from 'react';
import { Segment, Item, Header, Button, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const eventImageStyle = {
    filter: 'brightness(30%)'
};

const eventImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

export default function EventDetailHeader(props) {
    const { id, title, date, hostedBy, category } = props.event;
    return (
        <Segment.Group>
            <Segment basic attached="top" style={{ padding: '0' }}>
                <Image src={`/assets/${category}.jpg`} fluid style={eventImageStyle} />
                <Segment basic style={eventImageTextStyle}>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size="huge"
                                    content={title}
                                    style={{ color: 'white' }}
                                />
                                <p>{date}</p>
                                <p>
                                    Hosted by <strong>{hostedBy}</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>

            <Segment attached="bottom">
                <Button>Cancel My Place</Button>
                <Button color="teal">JOIN THIS EVENT</Button>
                <Button as={Link} to={`/event/manage/${id}`} color="orange" floated="right">
                    Manage Event
                </Button>
            </Segment>
        </Segment.Group>
    );
}
