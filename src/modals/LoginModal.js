import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';

import LoginForm from '../auth/LoginForm';
import { closeModal } from './actions';

const actions = { onClose: closeModal };

class LoginModal extends Component {
    render() {
        return (
            <Modal size="mini" open={true} onClose={this.props.onClose}>
                <Modal.Header>Login to Re-vents</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <LoginForm />
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}

export default connect(
    null,
    actions
)(LoginModal);
