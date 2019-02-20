import React from 'react';
import { List, Image } from 'semantic-ui-react'

export default function EventListAttendee(props) {
    const { photoURL } = props.attendee;
    return (
        <List.Item>
            <Image as="a" size="mini" circular src={photoURL} />
        </List.Item>
    )
}