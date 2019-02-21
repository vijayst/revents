import React from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from './EventList';
import { connect } from 'react-redux';
import { deleteEvent } from './actions';

function EventDashboard(props) {
    
    function handleDelete(eventId) {
        props.onDelete(eventId);
    }

    return (
        <Grid>
            <Grid.Column width={10}>
                <EventList
                    events={props.events}
                    onDelete={handleDelete}
                />
            </Grid.Column>
            <Grid.Column width={6}>
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
    onDelete: deleteEvent
};

export default connect(
    mapStateToProps,
    dispatchProps
)(EventDashboard);
