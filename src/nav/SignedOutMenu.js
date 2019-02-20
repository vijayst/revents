import React from 'react';
import { Menu, Button } from 'semantic-ui-react';

export default function SignedOutMenu(props) {
    return (
        <Menu.Item position="right">
            <Button basic inverted content="Login" onClick={props.onLogin} />
            <Button
                basic
                inverted
                content="Register"
                style={{ marginLeft: '0.5em' }}
            />
        </Menu.Item>
    );
}
