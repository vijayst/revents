import React from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from './EventList';
import { connect } from 'react-redux';
import { deleteEvent } from './actions';
import EventActivity from './EventActivity';
import { firestoreConnect } from 'react-redux-firebase';

function EventDashboard(props) {
    function handleDelete(eventId) {
        props.onDelete(eventId);
    }

    return (
        <Grid>
            <Grid.Column width={10}>
                <EventList events={props.events} onDelete={handleDelete} />
            </Grid.Column>
            <Grid.Column width={6}>
                <EventActivity />
            </Grid.Column>
        </Grid>
    );
}

function mapStateToProps(state) {
    return {
        events: state.firestore.ordered.events
    };
}

const dispatchProps = {
    onDelete: deleteEvent
};

export default connect(
    mapStateToProps,
    dispatchProps
)(firestoreConnect([{ collection: 'events' }])(EventDashboard));
