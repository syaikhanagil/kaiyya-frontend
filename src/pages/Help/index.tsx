import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// import Icon from '../../components/Icon';
import Main from '../../layouts/Main';

const MenuList = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
`;

const MenuItem = styled(Link)`
    position: relative;
    display: block;
    padding: 10px 1rem;
    background: var(--color-white);
    color: var(--color-black);
    border-bottom: 1px solid #f0f0f0;
    text-decoration: none;
    transition: .25s ease;
    

    .feather,
    span {
        vertical-align: middle;
    }
    
    span {
        margin-left: 10px;
    }

    &:hover {
        background: #f7f7f7;
        cursor: pointer;
    }
`;

const Help = () => {
    return (
        <Main useHeader paddingTop backTo="/" title="Bantuan" backgroundWhite>
            <MenuList>
                <MenuItem to="/contact-us">
                    <span>Hubungi Kami</span>
                </MenuItem>
                <MenuItem to="/rules">
                    <span>Rules dan Kode Etik</span>
                </MenuItem>
                <MenuItem to="/faq">
                    <span>Frequently Asked Questions</span>
                </MenuItem>
            </MenuList>
        </Main>
    );
};

export default Help;
