import React from 'react';
import { Segment, Item, Icon, List, Button } from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee'


export default function EventListItem(props) {
    const { title, description, date, venue, hostedBy, hostPhotoURL, attendees } = props.event;
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size="tiny" circular src={hostPhotoURL} />
                        <Item.Content>
                            <Item.Header as="a">{title}</Item.Header>
                            <Item.Description>
                                Hosted by <a>{hostedBy}</a>
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name="clock" /> {date} |
                    <Icon name="marker" /> {venue}
                </span>
            </Segment>
            <Segment secondary>
                <List horizontal>
                    {attendees.map(attendee => (
                        <EventListAttendee key={attendee.id} attendee={attendee} />
                    ))}
                </List>
            </Segment>
            <Segment clearing>
                <span>{description}</span>
                <Button as="a" color="red" floated="right" content="Delete" onClick={props.onDelete} />
                <Button as="a" color="teal" floated="right" content="View" onClick={props.onEdit} />
            </Segment>
        </Segment.Group>
    );
}

