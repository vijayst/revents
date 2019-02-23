import React from 'react';
import { Segment, Form, Header, Divider, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import DateInput from '../common/DateInput';
import PlaceInput from '../common/PlaceInput';
import TextInput from '../common/TextInput';
import RadioInput from '../common/RadioInput';

function Basic(props) {
    const { pristine, submitting } = props;
    return (
        <Segment>
            <Header dividing size="large" content="Basics" />
            <Form>
                <Field
                    width={8}
                    name="displayName"
                    type="text"
                    component={TextInput}
                    placeholder="Known As"
                />
                <Form.Group inline>
                    <Field
                        name="gender"
                        type="radio"
                        value="male"
                        label="Male"
                        component={RadioInput}
                    />
                    <Field
                        name="gender"
                        type="radio"
                        value="female"
                        label="Female"
                        component={RadioInput}
                    />
                </Form.Group>
                <Field
                    width={8}
                    name="dateOfBirth"
                    component={DateInput}
                    placeholder="Date of Birth"
                    dateFormat="YYYY-MM-DD"
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                />
                <Field
                    name="city"
                    placeholder="Home Town"
                    options={{ types: ['(cities)'] }}
                    label="Female"
                    component={PlaceInput}
                    width={8}
                />
                <Divider />
                <Button
                    disabled={pristine || submitting}
                    size="large"
                    positive
                    content="Update Profile"
                />
            </Form>
        </Segment>
    );
}

export default reduxForm({ form: 'userProfile', enableReinitialize: true })(
    Basic
);
