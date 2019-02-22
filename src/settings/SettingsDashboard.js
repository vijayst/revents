import React from 'react';
import { Grid } from 'semantic-ui-react';
import SettingsNav from './SettingsNav';
import { Switch, Route, Redirect } from 'react-router-dom';
import Basic from './Basic';
import About from './About';
import Photos from './Photos';
import Account from './Account';
import { connect } from 'react-redux';
import { changePassword } from '../auth/actions';

function SettingsDashboard(props) {
    return (
        <Grid>
            <Grid.Column width="12">
                <Switch>
                    <Redirect exact from="/settings" to="/settings/basics" />
                    <Route path="/settings/basics" component={Basic} />
                    <Route path="/settings/about" component={About} />
                    <Route path="/settings/photos" component={Photos} />
                    <Route
                        path="/settings/account"
                        render={() => (
                            <Account
                                onPasswordChange={props.onPasswordChange}
                            />
                        )}
                    />
                </Switch>
            </Grid.Column>
            <Grid.Column width="4">
                <SettingsNav />
            </Grid.Column>
        </Grid>
    );
}

const dispatchProps = {
    onPasswordChange: changePassword
};

export default connect(
    null,
    dispatchProps
)(SettingsDashboard);
