import React, { useState } from 'react';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { createEvent, updateEvent } from './actions';
import cuid from 'cuid';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../common/TextInput';
import TextArea from '../common/TextArea';
import SelectInput from '../common/SelectInput';
import DateInput from '../common/DateInput';
import PlaceInput from '../common/PlaceInput';
import {
    combineValidators,
    composeValidators,
    isRequired,
    hasLengthGreaterThan
} from 'revalidate';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const categories = [
    { key: 'drinks', text: 'Drinks', value: 'drinks' },
    { key: 'culture', text: 'Culture', value: 'culture' },
    { key: 'film', text: 'Film', value: 'film' },
    { key: 'food', text: 'Food', value: 'food' },
    { key: 'music', text: 'Music', value: 'music' },
    { key: 'travel', text: 'Travel', value: 'travel' }
];

const validate = combineValidators({
    title: isRequired({ message: 'Event title is required' }),
    category: isRequired({ message: 'Please provide a category' }),
    description: composeValidators(
        isRequired({ message: 'Please enter a description' }),
        hasLengthGreaterThan(4)({
            message: 'Please enter more than 5 characters in description'
        })
    )(),
    city: isRequired('city'),
    venue: isRequired('venue'),
    date: isRequired('date')
});

function EventForm(props) {
    const [cityLatLng, setCityLatLng] = useState('');
    const [venueLatLng, setVenueLatLng] = useState('');

    function handleCitySelect(address) {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => setCityLatLng(latLng))
            .then(() => {
                props.change('city', address);
            });
    }

    function handleVenueSelect(address) {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => setVenueLatLng(latLng))
            .then(() => {
                props.change('venue', address);
            });
    }

    function handleSubmit(values) {
        const event = Object.assign({}, values);
        event.venueLatLng = venueLatLng;
        if (props.initialValues) {
            props.onUpdate(event);
            props.history.goBack();
        } else {
            event.id = cuid();
            event.hostPhotoURL = '/assets/user.png';
            event.attendees = [];
            event.hostedBy = 'Bob';
            props.onCreate(event);
            props.history.push('/events');
        }
    }

    const { invalid, pristine, submitting } = props;

    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment>
                    <Form onSubmit={props.handleSubmit(handleSubmit)}>
                        <Header sub color="teal">
                            Event Details
                        </Header>
                        <Field
                            name="title"
                            type="text"
                            component={TextInput}
                            placeholder="Event title"
                        />
                        <Field
                            name="category"
                            component={SelectInput}
                            placeholder="Event category"
                            options={categories}
                        />
                        <Field
                            name="description"
                            type="text"
                            component={TextArea}
                            rows={3}
                            placeholder="Event description"
                        />
                        <Header sub color="teal">
                            Event Location
                        </Header>
                        <Field
                            name="city"
                            type="text"
                            component={PlaceInput}
                            options={{ types: ['(cities)'] }}
                            placeholder="Event city"
                            onSelect={handleCitySelect}
                        />
                        <Field
                            name="venue"
                            type="text"
                            options={{
                                location: new window.google.maps.LatLng(cityLatLng),
                                radius: 10000,
                                types: ['establishment']
                            }}
                            component={PlaceInput}
                            placeholder="Event venue"
                            onSelect={handleVenueSelect}
                        />
                        <Field
                            name="date"
                            type="text"
                            component={DateInput}
                            placeholder="Event date and time"
                            dateFormat="YYYY-MM-dd HH:mm"
                            timeFormat="HH:mm"
                            showTimeSelect
                        />
                        <Button
                            disabled={pristine || invalid || submitting}
                            positive
                            type="submit"
                        >
                            Submit
                        </Button>
                        <Button type="button" onClick={props.history.goBack}>
                            Cancel
                        </Button>
                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>
    );
}

function mapStateToProps(state, ownProps) {
    const eventId = ownProps.match.params.id;
    const event = state.events.find(e => e.id === eventId);
    return { initialValues: event };
}

const dispatchProps = {
    onCreate: createEvent,
    onUpdate: updateEvent
};

export default connect(
    mapStateToProps,
    dispatchProps
)(
    reduxForm({ form: 'eventForm', enableReinitialize: true, validate })(
        EventForm
    )
);
