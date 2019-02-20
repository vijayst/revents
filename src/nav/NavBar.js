import React from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, Link } from 'react-router-dom';

export default function NavBar() {
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header as={Link} to="/">
                    <img src="assets/logo.png" alt="logo" />
                    Re-vents
                </Menu.Item>
                <Menu.Item as={NavLink} to="/events" name="Events" />
                <Menu.Item as={NavLink} to="/people" name="People" />
                <Menu.Item>
                    <Button
                        as={Link}
                        to="/event/create"
                        floated="right"
                        positive
                        inverted
                        content="Create Event"
                    />
                </Menu.Item>
                <Menu.Item position="right">
                    <Button basic inverted content="Login" />
                    <Button
                        basic
                        inverted
                        content="Sign Out"
                        style={{ marginLeft: '0.5em' }}
                    />
                </Menu.Item>
            </Container>
        </Menu>
    );
}
