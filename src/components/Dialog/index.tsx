import React from 'react';
import styled from 'styled-components';
import Overlay from '../Overlay';

const DialogWrapper = styled.div`
    position: fixed;
    display: flex;
    width: 100%;
    max-width: 220px;
    height: 100%;
    max-height: 220px;
    background: rgba(255, 255, 255, 1);
    flex-direction: column;
    padding: 10px;
    align-items: center;
    justify-content: center;
    color: var(--primary);
    top: 50%;
    left: 50%;
    border-radius: 6px;
    transform: translate(-50%, -50%);
    z-index: 100;
    
    p {
        margin-top: 10px;
    }

    .feather {
        width: 40px;
        height: 40px;
    }
`;

interface Props {
    children: any
}

const Dialog = (props: Props) => {
    const { children } = props;
    return (
        <>
            <Overlay />
            <DialogWrapper>
                {children}
            </DialogWrapper>
        </>
    );
};

export default Dialog;
