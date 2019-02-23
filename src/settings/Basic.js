import React from 'react';
import { Segment, Form, Header, Divider, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import DateInput from '../common/DateInput';
import PlaceInput from '../common/PlaceInput';
import TextInput from '../common/TextInput';
import RadioInput from '../common/RadioInput';
import { subYears } from 'date-fns';

function Basic(props) {
    const { pristine, submitting, handleSubmit, onProfileUpdate } = props;

    function handleChange(city) {
        props.change('city', city);
    }

    function handleSelect(city) {
        props.change('city', city);
    }

    return (
        <Segment>
            <Header dividing size="large" content="Basics" />
            <Form onSubmit={handleSubmit(onProfileUpdate)}>
                <Field
                    width={8}
                    name="displayName"
                    type="text"
                    component={TextInput}
                    placeholder="Known As"
                />
                <Form.Group inline>
                    <label>Gender :</label>
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
                    dateFormat="YYYY-MM-dd"
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                    maxDate={subYears(new Date(), 18)}
                />
                <Field
                    name="city"
                    placeholder="Home Town"
                    options={{ types: ['(cities)'] }}
                    label="Female"
                    component={PlaceInput}
                    width={8}
                    onSelect={handleSelect}
                    onChange={handleChange}
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
