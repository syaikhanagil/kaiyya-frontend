import React from 'react';
import styled from 'styled-components';
import QRCode from 'react-qr-code';
import { Text } from '../../../components/Styled';
import logoQris from '../../../assets/img/logo-qris.png';
import priceFormat from '../../../helpers/price';
import Card from '../../../components/Card';
import stamp from '../../../assets/img/stempel.png';
import Countdown from '../../../components/Countdown';

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

const PaidStamp = styled.div`
    position: absolute;
    display: block;
    width: 55px;
    top: 0;
    right: 0;
    transform: rotate(10deg);
    z-index: 1;
    img {
        width: 100%;
        -webkit-filter: grayscale(1) invert(1);
        filter: grayscale(1) invert(1);
    }
`;

const ExpiredWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    text-align: center;
    padding: 5px 0;
    background: var(--color-white);
`;

interface Props {
    data: any,
    expired: string,
    paid: boolean
}

const QrisMethod = (props: Props) => {
    const { data, expired, paid } = props;
    return (
        <QrisWrapper>
            <Card rounded border>
                <QRWrapper>
                    {paid && (
                        <QRCode size={220} value={`PEMBAYARAN PESANAN SEBESAR ${data.amount} TELAH LUNAS`} />
                    )}
                    {!paid && (
                        <QRCode size={220} value={data.qris_src} />
                    )}
                </QRWrapper>
                <QrisLogo>
                    <img src={logoQris} alt="qris" />
                </QrisLogo>
                {!paid && expired !== '' && (
                    <ExpiredWrapper>
                        <Text block bold>Bayar Sebelum</Text>
                        <Countdown endTime={expired} alignCenter />
                    </ExpiredWrapper>
                )}
                <SectionWrapper>
                    {paid && (
                        <PaidStamp>
                            <img src={stamp} alt="kaiyya-stamp" />
                        </PaidStamp>
                    )}
                    <Text bold>Jumlah Pembayaran</Text>
                    <Text bold>{priceFormat(data.amount)}</Text>
                </SectionWrapper>
            </Card>
        </QrisWrapper>
    );
};

export default QrisMethod;
