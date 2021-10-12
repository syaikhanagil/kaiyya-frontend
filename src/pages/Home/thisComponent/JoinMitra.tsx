import React from 'react';
import styled from 'styled-components';
import { Text } from '../../../components/Styled';

const JoinWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    margin: 10px 0;
    background: var(--color-white);
    padding: 15px 1rem;

    a {
        display: block;
        font-weight: 600;
        font-size: var(--font-small);
        color: var(--primary);
        text-decoration: none;
        margin: 10px 0 0;
    }
`;

const JoinMitra = () => {
    return (
        <JoinWrapper>
            <Text block bold>Join Mitra Kaiyya</Text>
            <Text block extraSmall>Berikan edukasi yang bermanfaat kepada mitra anda, dan dapatkan penghasilan tambahan.</Text>
            <a href="/join-mitra">Join sekarang</a>
        </JoinWrapper>
    );
};

export default JoinMitra;
