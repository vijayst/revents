import React from 'react';
import { connect } from 'react-redux';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const modalMap = {
    LoginModal,
    RegisterModal
};

function ModalManager(props) {
    if (!props.modals) return null;

    const { modalType, modalProps } = props.modals;
    const ModalComponent = modalMap[modalType];
    if (!ModalComponent) return null;
    return <ModalComponent {...modalProps} />;
}

function mapStateToProps(state) {
    return {
        modals: state.modals
    };
}

export default connect(mapStateToProps)(ModalManager);
