import React from 'react';
import { Form, Label, Select } from 'semantic-ui-react';

export default function SelectInput(props) {
    const {
        input,
        placeholder,
        multiple,
        options,
        meta: { touched, error }
    } = props;
    return (
        <Form.Field error={touched && !!error}>
            <Select
                value={input.value || null}
                onChange={(e, data) => input.onChange(data.value)}
                placeholder={placeholder}
                options={options}
                multiple={multiple}
            />
            {touched && error && (
                <Label basic color="red">
                    {error}
                </Label>
            )}
        </Form.Field>
    );
}
