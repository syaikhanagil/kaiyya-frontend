import React from 'react';
import styled from 'styled-components';
import QRCode from 'react-qr-code';
import { Text } from '../../../components/Styled';
import logoQris from '../../../assets/img/logo-qris.png';
import priceFormat from '../../../helpers/price';
import Card from '../../../components/Card';

const QrisWrapper = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 100vh;
    background: var(--primary);
    align-items: center;
    padding: 15px 10%;
`;

const QRWrapper = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 30px 0 10px;
    text-align: center;
`;

const QrisLogo = styled.div`
    position: relative;
    display: block;
    text-align: center;
    height: 50px;
    margin: auto;
    img {
        height: 100%;
        margin: auto;
    }
`;

const SectionWrapper = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    justify-content: space-between;
    height: auto;
    padding: 10px 1rem;
    margin: 5px;
    border-top: 1px solid #eee;
`;

interface Props {
    data: any
}

const QrisMethod = (props: Props) => {
    const { data } = props;
    return (
        <QrisWrapper>
            <Card rounded border>
                <QRWrapper>
                    <QRCode size={220} value={data.qris_src} />
                </QRWrapper>
                <QrisLogo>
                    <img src={logoQris} alt="qris" />
                </QrisLogo>
                <SectionWrapper>
                    <Text bold>Jumlah Pembayaran</Text>
                    <Text bold>{priceFormat(data.amount)}</Text>
                </SectionWrapper>
            </Card>
        </QrisWrapper>
    );
};

export default QrisMethod;
