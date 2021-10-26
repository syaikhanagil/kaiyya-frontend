import React from 'react';
import styled from 'styled-components';
import { Text } from '../Styled';

const UnverifiedWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    background: var(--color-white);
    padding: 10px 1rem;
    margin: 10px 0;
    a {
        display: block;
        font-weight: 600;
        font-size: var(--font-extra-small);
        color: var(--primary);
        text-decoration: none;
        margin: 5px 0 0;
    }
`;

const UnverifiedNotif = () => {
    return (
        <UnverifiedWrapper>
            <Text block extraSmall>Anda belum diverifikasi oleh Admin, silahkan hubungi admin untuk mendapatkan benefit diskon sebagai mitra.</Text>
            <a href="/join-mitra">Hubungi admin</a>
        </UnverifiedWrapper>
    );
};

export default UnverifiedNotif;
