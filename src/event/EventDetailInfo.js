import React, { useState } from 'react';
import { Segment, Grid, Icon, Button } from 'semantic-ui-react';
import EventDetailMap from './EventDetailMap';
import format from 'date-fns/format';

export default function EventDetailInfo(props) {
    const [showMap, setShowMap] = useState(false);
    const { description, date, venue, venueLatLng } = props.event;

    function handleToggleMap() {
        setShowMap(!showMap);
    }

    return (
        <Segment.Group>
            <Segment attached="top">
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size="large" color="teal" name="info" />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{description}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign="middle">
                    <Grid.Column width={1}>
                        <Icon name="calendar" size="large" color="teal" />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <span>{format(date, 'ddd Do MMM')} at {format(date, 'h:mm A')}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign="middle">
                    <Grid.Column width={1}>
                        <Icon name="marker" big="true" color="teal" />
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <span>{venue}</span>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Button color="teal" size="tiny" content={showMap ? 'Hide Map' : 'Show Map'} onClick={handleToggleMap} />
                    </Grid.Column>
                </Grid>
            </Segment>
            {showMap && <EventDetailMap center={venueLatLng} />}
        </Segment.Group>
    );
}
