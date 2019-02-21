import React from 'react';
import { Grid } from 'semantic-ui-react';
import EventDetailHeader from './EventDetailHeader';
import EventDetailInfo from './EventDetailInfo';
import EventDetailChat from './EventDetailChat';
import EventDetailSidebar from './EventDetailSidebar';
import { connect } from 'react-redux';


function EventDetail(props) {
    const { event } = props;
    return (
        <Grid>
            <Grid.Column width={10}>
                <EventDetailHeader event={event} />
                <EventDetailInfo event={event} />
                <EventDetailChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <EventDetailSidebar attendees={event.attendees} />
            </Grid.Column>
        </Grid>
    );
}

function mapStateToProps(state, ownProps) {
    const eventId = ownProps.match.params.id;
    const event = state.events.find(e => e.id === eventId);
    return { event };
}

export default connect(mapStateToProps)(EventDetail);