import React, { useState, useEffect } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { createEvent, updateEvent } from './actions';
import cuid from 'cuid';

function EventForm(props) {
    const { event } = props;
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [city, setCity] = useState('');
    const [venue, setVenue] = useState('');
    const [host, setHost] = useState('');

    useEffect(() => {
        setTitle(event ? event.title : '');
        setDate(event ? event.date : '');
        setCity(event ? event.city : '');
        setVenue(event ? event.venue : '');
        setHost(event ? event.hostedBy : '');
    }, [event]);

    function handleSubmit(e) {
        e.preventDefault();
        const action = event ? props.onUpdate : props.onCreate;
        const id = event ? event.id : cuid();
        const hostPhotoURL = event ? event.hostPhotoURL : '/assets/user.png';
        const attendees = event ? event.attendees : [];
        action({
            id,
            title,
            date,
            city,
            venue,
            hostedBy: host,
            hostPhotoURL,
            attendees
        });
        event ? 
        props.history.goBack() :
        props.history.push('/events');
    }

    function handleTitleChange(e) {
        setTitle(e.target.value);
    }

    function handleDateChange(e) {
        setDate(e.target.value);
    }

    function handleCityChange(e) {
        setCity(e.target.value);
    }

    function handleVenueChange(e) {
        setVenue(e.target.value);
    }

    function handleHostChange(e) {
        setHost(e.target.value);
    }

    return (
        <Segment>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Event Title</label>
                    <input
                        placeholder="Event Title"
                        value={title}
                        onChange={handleTitleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Event Date</label>
                    <input
                        type="date"
                        placeholder="Event Date"
                        value={date}
                        onChange={handleDateChange}
                    />
                </Form.Field>
                <Form.Field>
                    <label>City</label>
                    <input
                        placeholder="City event is taking place"
                        value={city}
                        onChange={handleCityChange}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Venue</label>
                    <input
                        placeholder="Enter the Venue of the event"
                        value={venue}
                        onChange={handleVenueChange}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Hosted By</label>
                    <input
                        placeholder="Enter the name of person hosting"
                        value={host}
                        onChange={handleHostChange}
                    />
                </Form.Field>
                <Button positive type="submit">
                    Submit
                </Button>
                <Button type="button" onClick={props.history.goBack}>
                    Cancel
                </Button>
            </Form>
        </Segment>
    );
}

function mapStateToProps(state, ownProps) {
    const eventId = ownProps.match.params.id;
    const event = state.events.find(e => e.id === eventId);
    return { event };
}

const dispatchProps = {
    onCreate: createEvent,
    onUpdate: updateEvent
}

export default connect(mapStateToProps, dispatchProps)(EventForm);