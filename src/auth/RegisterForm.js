import React from 'react';
import { Form, Segment, Button, Label } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../common/TextInput';
import { connect } from 'react-redux';
import { register } from './actions';
import { combineValidators, isRequired } from 'revalidate';

const RegisterForm = ({ handleSubmit, onRegister, error, invalid, submitting }) => {
    return (
        <div>
            <Form size="large" onSubmit={handleSubmit(onRegister)}>
                <Segment>
                    <Field
                        name="displayName"
                        type="text"
                        component={TextInput}
                        placeholder="Known As"
                    />
                    <Field
                        name="email"
                        type="text"
                        component={TextInput}
                        placeholder="Email"
                    />
                    <Field
                        name="password"
                        type="password"
                        component={TextInput}
                        placeholder="Password"
                    />
                    {error && <Label basic color="red">{error}</Label>}
                    <Button disabled={invalid || submitting} fluid size="large" color="teal">
                        Register
                    </Button>
                </Segment>
            </Form>
        </div>
    );
};

const dispatchProps = {
    onRegister: register
}

const validate = combineValidators({
    displayName: isRequired('Display name'),
    email: isRequired('Email'),
    password: isRequired('Password')
});

export default connect(null, dispatchProps)(reduxForm({ form: 'registerForm', validate })(RegisterForm));
