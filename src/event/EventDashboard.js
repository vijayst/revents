import React, { useState } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import EventList from './EventList';
import EventForm from './EventForm';
import cuid from 'cuid';
import { connect } from 'react-redux';
import { createEvent, updateEvent, deleteEvent } from './actions';

function EventDashboard(props) {
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
        props.onCreate(event);
        setIsOpen(false);
    }

    function handleEdit(event) {
        setSelectedEvent(event);
        setIsOpen(true);
    }

    function handleUpdate(event) {
        event.id = selectedEvent.id;
        props.onUpdate(event);
        setIsOpen(false);
    }

    function handleDelete(eventId) {
        props.onDelete(eventId);
    }

    return (
        <Grid>
            <Grid.Column width={10}>
                <EventList
                    events={props.events}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </Grid.Column>
            <Grid.Column width={6}>
                <Button positive content="Create Event" onClick={handleOpen} />
                {isOpen && (
                    <EventForm
                        onCancel={handleClose}
                        onCreate={handleCreate}
                        onUpdate={handleUpdate}
                        selectedEvent={selectedEvent}
                    />
                )}
            </Grid.Column>
        </Grid>
    );
}

function mapStateToProps(state) {
    return {
        events: state.events
    };
}

const dispatchProps = {
    onCreate: createEvent,
    onUpdate: updateEvent,
    onDelete: deleteEvent
};

export default connect(
    mapStateToProps,
    dispatchProps
)(EventDashboard);
