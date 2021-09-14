import React from 'react';
import styled from 'styled-components';

const OverlayWrapper = styled('div') <{ transparentize?: boolean }>`
    position: fixed;
    display: block;
    width: 100%;
    max-width: 480px;
    height: 100%;
    background: ${(props) => (props.transparentize ? 'rgba(0, 0, 0, .1)' : 'var(--color-white)')};
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;

    @media only screen and (max-width: 768px) {
        max-width: 100%;
    }
`;

interface Props {
    transparentize?: boolean,
    onClick?: () => void
}

const Overlay = (props: Props) => {
    const { transparentize, onClick } = props;
    return (
        <OverlayWrapper transparentize={transparentize} onClick={onClick} />
    );
};

Overlay.defaultProps = {
    transparentize: true,
    onClick: () => { }
};

export default Overlay;
