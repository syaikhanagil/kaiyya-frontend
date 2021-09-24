import React from 'react';
import styled from 'styled-components';
import { Text } from '../../components/Styled';
import Main from '../../layouts/Main';

const Wrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    background: var(--color-white);
    padding: 20px 1.5rem;
`;

const JoinMitra = () => {
    return (
        <Main useHeader paddingTop backTo="/" title="Join Mitra">
            <Wrapper>
                <Text block>
                    Yuk, mulai gabung dan dapatkan penghasilan tambahan deangan daftar jadi mitra kaiyya
                    Di kaiyya terdapat 3 macam tingkat kemitraan
                </Text>
                <Text block>1. Distributor</Text>
                <Text block>2. Reseller</Text>
                <Text block>3. Sub reseller / dropship</Text>
                <Text block bold marginY>Syarat dan ketentuan berlaku ya</Text>
                <Text block>
                    Untuk mengetahui lebih detail silahkan hubungi ke Minka Kaiyya di whatshap 08118085128
                    Keuntungan menjadi Mitra Kaiyya selain mendapatkan penghasilan tambahan, banyak bonus reward yang kaiyya berikan untuk mitra berprestasi dan potongan harga buat mitra loh
                </Text>
            </Wrapper>
        </Main>
    );
};

export default JoinMitra;
