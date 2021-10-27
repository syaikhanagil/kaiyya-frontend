import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Text } from '../../components/Styled';
import Main from '../../layouts/Main';

const PromoWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    padding: 10px 0;
`;

const Promo = () => {
    return (
        <>
            <Helmet>
                <title>Promo | Kaiyya Dress</title>
            </Helmet>
            <Main useHeader paddingTop backBtn title="Promo" backgroundWhite>
                <PromoWrapper>
                    <Text block extraSmall alignCenter>Belum ada promo yang tersedia</Text>
                </PromoWrapper>
            </Main>
        </>
    );
};

export default Promo;
