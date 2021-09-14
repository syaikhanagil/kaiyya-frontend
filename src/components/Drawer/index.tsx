import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const DrawerWrapper = styled('div') <{ visible?: boolean}>`
    position: absolute;
    width: 60%;
    height: 100vh;
    background: var(--color-white);
    top: 0;
    left: -120%;
    transition: .25s ease;
    z-index: 0;

    ${(props) => (props.visible && `
        left: 0;
        z-index: 2;
    `)}
`;

interface Props {
    // eslint-disable-next-line no-unused-vars
    handler: (visibility: boolean) => void,
    children: any
}

const Drawer = (props: Props) => {
    const { children, handler } = props;
    const [visible, setVisible] = useState(false);

    const handleClose = () => {
        setVisible(false);
        setTimeout(() => {
            handler(false);
        }, 250);
    };

    useEffect(() => {
        setTimeout(() => {
            setVisible(true);
        }, 250);
    }, []);
    return (
        <DrawerWrapper onClick={() => handleClose()} visible={visible}>
            {children}
        </DrawerWrapper>
    );
};

export default Drawer;
