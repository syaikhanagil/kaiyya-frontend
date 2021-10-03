import React, { useState } from 'react';
import styled from 'styled-components';
import Icon from '../Icon';
import { Text } from '../Styled';

const AccordionWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: auto;
    border-radius: 4px;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    // box-shadow: 0 3px 6px rgba(0, 0, 0, .05);
`;

const Header = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: auto;
    padding: 10px;
    background: var(--color-white);
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    &.active {
        .feather {
            transform: rotate(180deg);
        }
    }
`;

const Body = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: 0;
    padding: 0;
    background: #f7f7f7;
    padding: 0;
    overflow: hidden;
    transition: height .3s ease padding .3s ease;
    &.active {
        height: 100%;
        padding: 10px;
    }
`;

interface Props {
    children: any
}

const Accordion = (props: Props) => {
    const { children } = props;
    return (
        <AccordionWrapper>
            {children}
        </AccordionWrapper>
    );
};

interface HeaderProps {
    id: string,
    children: any
}

export const AccordionHeader = (props: HeaderProps) => {
    const { id, children } = props;
    const [active, setActive] = useState(false);

    const handleOpen = () => {
        const el = document.getElementById(`${id}-content`);
        if (active) {
            el?.classList.remove('active');
            setActive(false);
            return;
        }
        el?.classList.add('active');
        setActive(true);
    };

    return (
        <Header id={id} className={active ? 'active' : ''} onClick={() => handleOpen()}>
            <Text>{children}</Text>
            <Icon icon="chevron-down" />
        </Header>
    );
};

interface HeaderBody {
    id: string,
    children: any
}

export const AccordionBody = (props: HeaderBody) => {
    const { id, children } = props;
    return (
        <Body id={id}>
            {children}
        </Body>
    );
};

export default Accordion;