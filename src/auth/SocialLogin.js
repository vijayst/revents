import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

export default function SocialLogin({ onSocialLogin }) {
    return (
        <div>
            <Button
                type="button"
                style={{ marginBottom: '10px' }}
                fluid
                color="facebook"
                onClick={onSocialLogin.bind(null, 'facebook')}
            >
                <Icon name="facebook" /> Login with Facebook
            </Button>

            <Button
                type="button"
                fluid
                color="google plus"
                onClick={onSocialLogin.bind(null, 'google')}
            >
                <Icon name="google plus" />
                Login with Google
            </Button>
        </div>
    );
}
