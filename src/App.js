import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import EventDashboard from './event/EventDashboard';
import EventForm from './event/EventForm';
import EventDetail from './event/EventDetail';
import PeopleDashboard from './user/PeopleDashboard';
import UserDetail from './user/UserDetail';
import SettingsDashboard from './settings/SettingsDashboard';
import NavBar from './nav/NavBar';
import { Route, Switch } from 'react-router-dom';
import Home from './home/Home';

class App extends Component {
    render() {
        return (
            <>
                <NavBar />
                <Container className="main">
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/events" component={EventDashboard} />
                        <Route
                            path="/event/create"
                            exact
                            component={EventForm}
                        />
                        <Route path="/event/:id" component={EventDetail} />
                        <Route path="/people" component={PeopleDashboard} />
                        <Route path="/profile/:id" component={UserDetail} />
                        <Route path="/settings" component={SettingsDashboard} />
                    </Switch>
                </Container>
            </>
        );
    }
}

export default App;
