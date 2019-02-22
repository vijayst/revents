import React from 'react';
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../common/TextInput';
import { connect } from 'react-redux';
import { login, socialLogin } from './actions';
import SocialLogin from './SocialLogin';

const LoginForm = ({ handleSubmit, onLogin, error, onSocialLogin }) => {
    return (
        <Form size="large" onSubmit={handleSubmit(onLogin)}>
            <Segment>
                <Field
                    name="email"
                    component={TextInput}
                    type="text"
                    placeholder="Email Address"
                />
                <Field
                    name="password"
                    component={TextInput}
                    type="password"
                    placeholder="password"
                />
                {error && <Label color="red">{error}</Label>}
                <Button fluid size="large" color="teal">
                    Login
                </Button>
                <Divider horizontal>Or</Divider>
                <SocialLogin onSocialLogin={onSocialLogin} />
            </Segment>
        </Form>
    );
};

const dispatchProps = {
    onLogin: login,
    onSocialLogin: socialLogin
};

export default connect(
    null,
    dispatchProps
)(reduxForm({ form: 'loginForm' })(LoginForm));
