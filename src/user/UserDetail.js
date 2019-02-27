import React from 'react';
import {
    Button,
    Card,
    Grid,
    Header,
    Icon,
    Image,
    Item,
    List,
    Menu,
    Segment
} from 'semantic-ui-react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { format, differenceInYears } from 'date-fns';

function UserDetailedPage(props) {

    function handleEdit() {
        props.history.push('/settings/basics');
    }

    const {
        user: {
            displayName,
            about,
            occupation,
            origin: country,
            interests,
            photos,
            city,
            createdAt,
            dateOfBirth
        }
    } = props;
    const age =
        dateOfBirth && differenceInYears(new Date(), new Date(dateOfBirth));

    return (
        <Grid>
            <Grid.Column width={16}>
                <Segment>
                    <Item.Group>
                        <Item>
                            <Item.Image
                                avatar
                                size="small"
                                src="https://randomuser.me/api/portraits/men/20.jpg"
                            />
                            <Item.Content verticalAlign="bottom">
                                <Header as="h1">{displayName}</Header>
                                <br />
                                {occupation && (
                                    <Header as="h3">{occupation}</Header>
                                )}
                                <br />
                                <Header as="h3">
                                    {age}, Lives in {city}
                                </Header>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Grid.Column>
            <Grid.Column width={12}>
                <Segment>
                    <Grid columns={2}>
                        <Grid.Column width={10}>
                            <Header
                                icon="smile"
                                content={`About ${displayName}`}
                            />
                            <p>
                                I am a: <strong>{occupation || '-'}</strong>
                            </p>
                            <p>
                                Originally from{' '}
                                <strong>{country || '-'}</strong>
                            </p>
                            <p>
                                Member Since:{' '}
                                <strong>
                                    {createdAt &&
                                        format(
                                            createdAt.toDate(),
                                            'Do MMM YYYY'
                                        )}
                                </strong>
                            </p>
                            <p>{about}</p>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Header icon="heart outline" content="Interests" />
                            <List>
                                {interests &&
                                    interests.map(interest => (
                                        <Item key={interest}>
                                            <Icon name="heart" />
                                            <Item.Content>
                                                {interest}
                                            </Item.Content>
                                        </Item>
                                    ))}
                            </List>
                        </Grid.Column>
                    </Grid>
                </Segment>
            </Grid.Column>
            <Grid.Column width={4}>
                <Segment>
                    <Button onClick={handleEdit} color="teal" fluid basic content="Edit Profile" />
                </Segment>
            </Grid.Column>

            {photos && (
                <Grid.Column width={12}>
                    <Segment attached>
                        <Header icon="image" content="Photos" />

                        <Image.Group size="small">
                            {photos.map(p => (
                                <Image key={p.name} src={p.url} />
                            ))}
                        </Image.Group>
                    </Segment>
                </Grid.Column>
            )}

            <Grid.Column width={12}>
                <Segment attached>
                    <Header icon="calendar" content="Events" />
                    <Menu secondary pointing>
                        <Menu.Item name="All Events" active />
                        <Menu.Item name="Past Events" />
                        <Menu.Item name="Future Events" />
                        <Menu.Item name="Events Hosted" />
                    </Menu>

                    <Card.Group itemsPerRow={5}>
                        <Card>
                            <Image src={'/assets/drinks.jpg'} />
                            <Card.Content>
                                <Card.Header textAlign="center">
                                    Event Title
                                </Card.Header>
                                <Card.Meta textAlign="center">
                                    28th March 2018 at 10:00 PM
                                </Card.Meta>
                            </Card.Content>
                        </Card>

                        <Card>
                            <Image src={'/assets/drinks.jpg'} />
                            <Card.Content>
                                <Card.Header textAlign="center">
                                    Event Title
                                </Card.Header>
                                <Card.Meta textAlign="center">
                                    28th March 2018 at 10:00 PM
                                </Card.Meta>
                            </Card.Content>
                        </Card>
                    </Card.Group>
                </Segment>
            </Grid.Column>
        </Grid>
    );
}

function query(props) {
    return [
        {
            collection: 'users',
            doc: props.match.params.id
        }
    ];
}

function mapState(state) {
    const { users } = state.firestore.ordered;
    const user = users && users.length ? users[0] : {};
    return {
        user
    };
}

export default compose(
    firestoreConnect(query),
    connect(mapState)
)(UserDetailedPage);
