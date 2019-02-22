import React from 'react';
import { Segment, Item, Icon, List, Button } from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

export default function EventListItem(props) {
    const {
        id,
        title,
        description,
        date,
        venue,
        hostedBy,
        hostPhotoURL,
        attendees
    } = props.event;
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
                    <Icon name="clock" /> {format(date.toDate(), 'dddd Do MMM')} at{' '}
                    {format(date.toDate(), 'HH:mm')} |
                    <Icon name="marker" /> {venue}
                </span>
            </Segment>
            <Segment secondary>
                <List horizontal>
                    {Object.keys(attendees).map(key => {
                        const attendee = attendees[key];
                        return (
                            <EventListAttendee key={key} attendee={attendee} />
                        );
                    })}
                </List>
            </Segment>
            <Segment clearing>
                <span>{description}</span>
                <Button
                    as="a"
                    color="red"
                    floated="right"
                    content="Delete"
                    onClick={props.onDelete}
                />
                <Button
                    as={Link}
                    to={`/event/${id}`}
                    color="teal"
                    floated="right"
                    content="View"
                />
            </Segment>
        </Segment.Group>
    );
}
