import React, { useState } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import EventList from './EventList';
import EventForm from './EventForm';
import cuid from 'cuid';
import { connect } from 'react-redux';

const mockEvents = [
    {
        id: '1',
        title: 'Trip to Tower of London',
        date: '2018-03-27T11:00:00+00:00',
        category: 'culture',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
        city: 'London, UK',
        venue: "Tower of London, St Katharine's & Wapping, London",
        hostedBy: 'Bob',
        hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
        attendees: [
            {
                id: 'a',
                name: 'Bob',
                photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
            },
            {
                id: 'b',
                name: 'Tom',
                photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
            }
        ]
    },
    {
        id: '2',
        title: 'Trip to Punch and Judy Pub',
        date: '2018-03-28T14:00:00+00:00',
        category: 'drinks',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
        city: 'London, UK',
        venue: 'Punch & Judy, Henrietta Street, London, UK',
        hostedBy: 'Tom',
        hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
        attendees: [
            {
                id: 'b',
                name: 'Tom',
                photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
            },
            {
                id: 'a',
                name: 'Bob',
                photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
            }
        ]
    }
];

function EventDashboard(props) {
    let [events, setEvents] = useState(mockEvents);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    function handleOpen() {
        setSelectedEvent(null);
        setIsOpen(true);
    }

    function handleClose() {
        setIsOpen(false);
    }

    function handleCreate(event) {
        event.cuid = cuid();
        event.hostPhotoURL = '/assets/user.png';
        event.attendees = [];
        events = events.slice();
        events.unshift(event);
        setEvents(events);
        setIsOpen(false);
    }

    function handleEdit(event) {
        setSelectedEvent(event);
        setIsOpen(true);
    }

    function handleUpdate(event) {
        events = events.slice();
        const index = events.findIndex(e => e.id === selectedEvent.id);
        events[index] = {
            ...events[index],
            ...event
        };
        setEvents(events);
        setIsOpen(false);
    }

    function handleDelete(eventId) {
        events = events.filter(e => e.id !== eventId);
        setEvents(events);
    }

    return (
        <Grid>
            <Grid.Column width={10}>
                <EventList events={events} onEdit={handleEdit} onDelete={handleDelete} />
            </Grid.Column>
            <Grid.Column width={6}>
                <Button positive content="Create Event" onClick={handleOpen} />
                <div>{props.test}</div>
                {isOpen && (
                    <EventForm onCancel={handleClose} onCreate={handleCreate} onUpdate={handleUpdate} selectedEvent={selectedEvent} />
                )}
            </Grid.Column>
        </Grid>
    );
}

function mapStateToProps(state) {
    return {
        test: state.test
    };
}

export default connect(mapStateToProps)(EventDashboard);