import React from 'react';
import { Segment, List, Item, Label } from 'semantic-ui-react';

export default function EventDetailSidebar(props) {
    const isHost = false;

    return (
        <div>
            <Segment
                textAlign="center"
                style={{ border: 'none' }}
                attached="top"
                secondary
                inverted
                color="teal"
            >
                {props.attendees.length} People Going
            </Segment>
            <Segment attached>
                <List relaxed divided>
                    {props.attendees.map(a => (
                        <Item key={a.id} style={{ position: 'relative' }}>
                            {isHost && (
                                <Label
                                    style={{ position: 'absolute' }}
                                    color="orange"
                                    ribbon="right"
                                >
                                    Host
                                </Label>
                            )}
                            <Item.Image size="tiny" src={a.photoURL} />
                            <Item.Content verticalAlign="middle">
                                <Item.Header as="h3">
                                    <a>{a.name}</a>
                                </Item.Header>
                            </Item.Content>
                        </Item>
                    ))}
                </List>
            </Segment>
        </div>
    );
}
