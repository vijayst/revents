import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import EventDashboard from './event/EventDashboard';
import NavBar from './nav/NavBar';

class App extends Component {
    render() {
        return (
            <>
                <NavBar />
                <Container className="main">
                    <EventDashboard />
                </Container>
            </>
        );
    }
}

export default App;
