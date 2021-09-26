import React from 'react';
import { useRouteMatch } from 'react-router';
import { connect } from 'react-redux';
import Login from './Login';
import Register from './Register';
import ResetPassword from './ResetPassword';
import Referral from './Referral';
import ResetPasswordConfirm from './ResetPasswordConfirm';
import NewPassword from './NewPassword';
import Verify from './Verify';

const Auth = (props: any) => {
    const { path } = useRouteMatch();
    const { loggedIn } = props;

    if (loggedIn && path !== 'verify') {
        window.location.href = '/';
        return null;
    }

    return (
        <>
            {path === '/login' && (<Login />)}
            {path === '/register' && (<Register />)}
            {path === '/ref/:code' && (<Referral />)}
            {path === '/reset-password' && (<ResetPassword />)}
            {path === '/reset-password/:token' && (<ResetPasswordConfirm />)}
            {path === '/create-password' && (<NewPassword />)}
            {path === '/verify' && (<Verify />)}
        </>
    );
};

const mapStateToProps = (state: any) => {
    return {
        loggedIn: state.authReducer.loggedIn
    };
};

export default connect(mapStateToProps)(Auth);
