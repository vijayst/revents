import React from 'react';
import EventListItem from './EventListItem';

export default function EventList(props) {
    return (
        <div>
            {props.events.map(event => (
                <EventListItem key={event.id} event={event} />
            ))}
        </div>
    )
}