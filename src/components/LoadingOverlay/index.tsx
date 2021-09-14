import React from 'react';
import styled from 'styled-components';
import Overlay from '../Overlay';

const LoadingWrapper = styled.div`
    position: fixed;
    display: flex;
    width: 100%;
    max-width: 120px;
    height: 100%;
    max-height: 120px;
    background: var(--color-white);
    border-radius: 6px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 102;
`;

const LoadingOverlay = () => {
    return (
        <>
            <Overlay />
            <LoadingWrapper>
                <div className="loading-spinner">
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                </div>
            </LoadingWrapper>
        </>
    );
};

export default LoadingOverlay;
