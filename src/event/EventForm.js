import React from 'react';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { createEvent, updateEvent } from './actions';
import cuid from 'cuid';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../common/TextInput';
import TextArea from '../common/TextArea';
import SelectInput from '../common/SelectInput';

const categories = [
    {key: 'drinks', text: 'Drinks', value: 'drinks'},
    {key: 'culture', text: 'Culture', value: 'culture'},
    {key: 'film', text: 'Film', value: 'film'},
    {key: 'food', text: 'Food', value: 'food'},
    {key: 'music', text: 'Music', value: 'music'},
    {key: 'travel', text: 'Travel', value: 'travel'},
];

function EventForm(props) {
    
    function handleSubmit(values) {
        const event = Object.assign({}, values);
        if (props.initialValues) {
            props.onUpdate(event)
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
                            component={TextInput}
                            placeholder="Event city"
                        />
                        <Field
                            name="venue"
                            type="text"
                            component={TextInput}
                            placeholder="Event venue"
                        />
                        <Field
                            name="date"
                            type="text"
                            component={TextInput}
                            placeholder="Event date"
                        />
                        <Button positive type="submit">
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
)(reduxForm({ form: 'eventForm', enableReinitialize: true })(EventForm));
