import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Segment, Icon } from 'semantic-ui-react';

export default function EventDetailMap(props) {
    const zoom = 15;
    return (
        <Segment attached="bottom" style={{ padding: 0 }}>
            <div style={{ height: '300px', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: 'AIzaSyDo59xXqSCiG8d4_Fw6zYsDwCsjh2oRcsQ'
                    }}
                    defaultCenter={props.center}
                    defaultZoom={zoom}
                >
                    <Icon color="red" big name="marker" />
                </GoogleMapReact>
            </div>
        </Segment>
    );
}
