import React from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import SignedInMenu from './SignedInMenu';
import SignedOutMenu from './SignedOutMenu';
import { connect } from 'react-redux';
import { openModal } from '../modals/actions';
import { logout } from '../auth/actions';

function NavBar(props) {
    function handleLogin() {
        props.onOpen('LoginModal');
    }

    function handleRegister() {
        props.onOpen('RegisterModal');
    }

    function handleLogout() {
        props.onLogout();
        props.history.push('/');
    }

    const { loggedIn, profile } = props;
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header as={Link} to="/">
                    <img src="/assets/logo.png" alt="logo" />
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
                    <SignedInMenu profile={profile} onLogout={handleLogout} />
                ) : (
                    <SignedOutMenu onLogin={handleLogin} onRegister={handleRegister} />
                )}
            </Container>
        </Menu>
    );
}

function mapState(state) {
    const { auth, profile } = state.firebase;
    const loggedIn = auth.isLoaded && !auth.isEmpty;
    return {
        loggedIn,
        profile
    }
}

const dispatchProps = {
    onOpen: openModal,
    onLogout: logout
};

export default connect(mapState, dispatchProps)(withRouter(NavBar));
