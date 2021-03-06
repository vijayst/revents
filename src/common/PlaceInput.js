import React from 'react';
import { Form, Label } from 'semantic-ui-react';
import PlacesAutoComplete from 'react-places-autocomplete';

export default function PlaceInput(props) {
    const {
        input,
        placeholder,
        width,
        onSelect,
        options,
        meta: { touched, error }
    } = props;

    const { value, onChange, ...inputProps } = input;

    return (
        <Form.Field error={touched && !!error} width={width}>
            <PlacesAutoComplete
                inputProps={inputProps}
                value={value}
                onChange={onChange}
                onSelect={onSelect}
                searchOptions={options}
            >
                {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading
                }) => (
                    <div>
                        <input placeholder={placeholder} {...getInputProps()} />
                        <div className="autocomplete-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                                const className = suggestion.active
                                    ? 'suggestion-item suggestion-item--active'
                                    : 'suggestion-item';
                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            className
                                        })}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutoComplete>
            {touched && error && (
                <Label basic color="red">
                    {error}
                </Label>
            )}
        </Form.Field>
    );
}
