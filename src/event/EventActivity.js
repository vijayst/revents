import React from 'react';
import { Header, Segment } from 'semantic-ui-react';

export default function EventActivity() {
  return (
    <div>
      <Header attached="top" content="Recent activity" />
      <Segment attached>
          <p>Recent activities</p>
      </Segment>
    </div>
  )
}
