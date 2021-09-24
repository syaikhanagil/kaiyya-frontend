import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ToastWrapper = styled('div') <{ snackbar?: boolean }>`
    position: fixed;
    width: ${(props) => (props.snackbar ? '100%' : 'auto')};
    max-width: ${(props) => (props.snackbar ? '480px' : '100%')};
    background: rgba(0, 0, 0, .6);
    color: var(--color-white);
    padding: 5px 10px;
    text-align: center;
    left: 50%;
    bottom: ${(props) => (props.snackbar ? '-120%' : '20px')};
    border-radius: ${(props) => (props.snackbar ? '0px' : '4px')};
    opacity: ${(props) => (props.snackbar ? '1' : '0')};
    transform: translateX(-50%);
    transition: .3s ease;
    z-index: 102;

    @media only screen and (max-width: 768px) {
        width: 100%;
        max-width: ${(props) => (props.snackbar ? '100%' : '90%')};
    }

    &.visible {
        opacity: ${(props) => (props.snackbar ? '1' : '1')};
        bottom: ${(props) => (props.snackbar ? '0' : '50px')};
    }
`;

interface Props {
    message: string,
    type: string
}

const Toast = (props: Props) => {
    const { message, type } = props;
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setVisible(true);
        }, 250);
    }, []);

    return (
        <>
            <ToastWrapper snackbar={type === 'snackbar'} className={visible ? 'visible' : ''}>
                <span>{message}</span>
            </ToastWrapper>
        </>
    );
};

export default Toast;
