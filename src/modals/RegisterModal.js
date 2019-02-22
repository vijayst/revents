import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { closeModal } from './actions';
import RegisterForm from '../auth/RegisterForm';

const actions = { onClose: closeModal };

class RegisterModal extends Component {
    render() {
        return (
            <Modal size="mini" open={true} onClose={this.props.onClose}>
                <Modal.Header>Sign Up to Re-vents!</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <RegisterForm />
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}

export default connect(
    null,
    actions
)(RegisterModal);
