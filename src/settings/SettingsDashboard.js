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
                    <Route path="/settings/basics" render={() => <Basic initialValues={props.user} />} />
                    <Route path="/settings/about" component={About} />
                    <Route path="/settings/photos" component={Photos} />
                    <Route
                        path="/settings/account"
                        render={() => (
                            <Account
                                providerId={props.providerId}
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

function mapState(state) {
    const { auth, profile } = state.firebase;
    return {
        providerId: auth.isLoaded && auth.providerData[0].providerId,
        user: profile
    };
}

const dispatchProps = {
    onPasswordChange: changePassword
};

export default connect(
    mapState,
    dispatchProps
)(SettingsDashboard);
