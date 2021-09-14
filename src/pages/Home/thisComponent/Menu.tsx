import React from 'react';
import styled from 'styled-components';
import IconBox from '../../../components/IconBox';

const MenuWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: auto;
    padding: 10px 1rem;
    background: var(--color-white);
    margin: 0;
`;

const MenuList = styled.div`
    position: relative;
    display: flex;
    #box {
        width: 100%;
        margin: 0 10px;
    }
`;

const Menu = () => {
    return (
        <MenuWrapper>
            <MenuList>
                <IconBox title="Login" icon="user" />
                <IconBox title="Login" icon="user" />
                <IconBox title="Login" icon="user" />
                <IconBox title="Login" icon="user" />
            </MenuList>
        </MenuWrapper>
    );
};

export default Menu;
