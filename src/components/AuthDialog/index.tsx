import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Overlay from '../Overlay';

const AuthDialogWrapper = styled.div`
    position: fixed;
    width: 100%;
    max-width: 480px;
    height: auto;
    bottom: 120%;
    left: 50%;
    transform: translate(-50%, 50%);

    &.visible {

    }
`;

const AuthDialog = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
    }, []);

    return (
        <>
            <Overlay />
            <AuthDialogWrapper className={visible ? 'visible' : ''}>
                oke
            </AuthDialogWrapper>
        </>
    );
};

export default AuthDialog;
