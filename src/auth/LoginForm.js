import React from 'react';
import { Form, Segment, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../common/TextInput';
import { connect } from 'react-redux';
import { login } from './actions';

const LoginForm = ({ handleSubmit, onLogin }) => {
    return (
        <Form error size="large" onSubmit={handleSubmit(onLogin)}>
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
                <Button fluid size="large" color="teal">
                    Login
                </Button>
            </Segment>
        </Form>
    );
};

const dispatchProps = {
    onLogin: login
}

export default connect(null, dispatchProps)(reduxForm({ form: 'loginForm' })(LoginForm));
