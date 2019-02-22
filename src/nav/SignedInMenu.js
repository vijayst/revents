import React from 'react';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function SignedInMenu(props) {
    const { photoURL, displayName } = props.profile;
    return (
        <Menu.Item position="right">
            <Image avatar spaced="right" src={photoURL || '/assets/user.png'} />
            <Dropdown pointing="top left" text={displayName}>
                <Dropdown.Menu>
                    <Dropdown.Item text="Create Event" icon="plus" />
                    <Dropdown.Item text="My Events" icon="calendar" />
                    <Dropdown.Item text="My Network" icon="users" />
                    <Dropdown.Item text="My Profile" icon="user" />
                    <Dropdown.Item
                        as={Link}
                        to="/settings"
                        text="Settings"
                        icon="settings"
                    />
                    <Dropdown.Item
                        text="Sign Out"
                        icon="power"
                        onClick={props.onLogout}
                    />
                </Dropdown.Menu>
            </Dropdown>
        </Menu.Item>
    );
}
