import React, { useState } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import SignedInMenu from './SignedInMenu';
import SignedOutMenu from './SignedOutMenu';

function NavBar(props) {
    const [loggedIn, setLoggedIn] = useState(false);

    function handleLogin() {
        setLoggedIn(true);
    }

    function handleLogout() {
        setLoggedIn(false);
        props.history.push('/');
    }

    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header as={Link} to="/">
                    <img src="assets/logo.png" alt="logo" />
                    Re-vents
                </Menu.Item>
                <Menu.Item as={NavLink} to="/events" name="Events" />
                {loggedIn && (
                    <>
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
                    </>
                )}
                {loggedIn ? (
                    <SignedInMenu onLogout={handleLogout} />
                ) : (
                    <SignedOutMenu onLogin={handleLogin} />
                )}
            </Container>
        </Menu>
    );
}

export default withRouter(NavBar);
