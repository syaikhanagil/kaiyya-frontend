import React from 'react';
import styled from 'styled-components';
import IconBox from '../../../components/IconBox';
// import kLogo from '../../../assets/img/k-logo.png';

const MenuWrapper = styled.div`
    position: relative;
    display: block;
    width: auto;
    height: auto;
    padding: 10px 1rem;
    background: var(--color-white);
    margin: 0;
    border-radius: 4px;
`;

const MenuList = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    #box {
        position: relative;
        width: 100%;
        margin: 5px 0;
        flex-basis: 23.5%;
    }
`;

const Menu = () => {
    return (
        <MenuWrapper>
            <MenuList>
                {/* <IconBox title="K-Poin" custom icon={kLogo} /> */}
                <IconBox title="New Release" icon="thumbs-up" link="/new-release" anims />
                <IconBox title="Preorder" icon="package" link="/preorder" />
                <IconBox title="Promo" icon="percent" link="/promo" />
                <IconBox title="Katalog" icon="grid" link="/catalog" />
            </MenuList>
        </MenuWrapper>
    );
};

export default Menu;
