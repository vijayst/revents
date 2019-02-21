import React from 'react';
import { Form, Label } from 'semantic-ui-react';

export default function TextInput(props) {
    const {
        input,
        rows,
        placeholder,
        meta: { touched, error }
    } = props;
    return (
        <Form.Field error={touched && !!error} rows={rows}>
            <textarea {...input} placeholder={placeholder} />
            {touched && error && (
                <Label basic color="red">
                    {error}
                </Label>
            )}
        </Form.Field>
    );
}
