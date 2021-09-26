import React from 'react';
import { useRouteMatch } from 'react-router';
import AccountSettings from './AccountSettings';
import PasswordSettings from './PasswordSettings';

const Settings = () => {
    const { path } = useRouteMatch();

    return (
        <>
            {path === '/settings/account' && (<AccountSettings />)}
            {path === '/settings/password' && (<PasswordSettings />)}
        </>
    );
};

export default Settings;
