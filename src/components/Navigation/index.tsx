import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '../Icon';

const NavigationWrapper = styled.nav`
    position: fixed;
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 480px;
    background: var(--color-white);
    padding: 10px 1rem;
    left: 50%;
    bottom: 0;
    border-top: 2px solid #eee;
    transform: translateX(-50%);
    z-index: 99;

    @media only screen and (max-width: 768px) {
        max-width: 100%;
    }
`;

const ItemWrapper = styled(Link)`
    position: relative;
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #a7a7a7;
    cursor: pointer;

    &.active {
        color: var(--primary);
        .feather {
            fill: var(--primary-transparent);
        }
    }
`;

const ItemIcon = styled.div`
    position: relative;
    display: block;
    text-align: center;
    width: 100%;
`;

const ItemTitle = styled.p`
    display: block;
    width: 100%;
    color: inherit;
    font-size: var(--font-extra-small);
    font-weight: 500;
`;

interface Props {
    activeMenu?: string
}

const Navigation = (props: Props) => {
    const { activeMenu } = props;
    return (
        <NavigationWrapper>
            <ItemWrapper to="/" className={activeMenu === 'home' ? 'active' : ''}>
                <ItemIcon>
                    <Icon icon="home" />
                </ItemIcon>
                <ItemTitle>Beranda</ItemTitle>
            </ItemWrapper>
            {/* <ItemWrapper to="/preorder" className={activeMenu === 'c' ? 'active' : ''}>
                <ItemIcon>
                    <Icon icon="repeat" />
                </ItemIcon>
                <ItemTitle>Pre-Order</ItemTitle>
            </ItemWrapper> */}
            <ItemWrapper to="/chat" className={activeMenu === 'chat' ? 'active' : ''}>
                <ItemIcon>
                    <Icon icon="message-square" />
                </ItemIcon>
                <ItemTitle>Chat</ItemTitle>
            </ItemWrapper>

            <ItemWrapper to="/orders" className={activeMenu === 'orders' ? 'active' : ''}>
                <ItemIcon>
                    <Icon icon="file-text" />
                </ItemIcon>
                <ItemTitle>Pesanan</ItemTitle>
            </ItemWrapper>
            <ItemWrapper to="/account" className={activeMenu === 'account' ? 'active' : ''}>
                <ItemIcon>
                    <Icon icon="user" />
                </ItemIcon>
                <ItemTitle>Akun</ItemTitle>
            </ItemWrapper>
        </NavigationWrapper>
    );
};

Navigation.defaultProps = {
    activeMenu: 'home'
};

export default Navigation;
