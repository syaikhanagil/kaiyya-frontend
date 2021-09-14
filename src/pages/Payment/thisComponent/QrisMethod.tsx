import React from 'react';
import styled from 'styled-components';
import QRCode from 'react-qr-code';
import { Button, Text } from '../../../components/Styled';
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
    padding: 30px 0;
    text-align: center;
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
    console.log(data);
    return (
        <QrisWrapper>
            <Card rounded border>
                <QRWrapper>
                    <QRCode size={220} value={data.qris_src} />
                </QRWrapper>
                <SectionWrapper>
                    <Text bold>Jumlah Pembayaran</Text>
                    <Text bold>{priceFormat(data.amount)}</Text>
                </SectionWrapper>
                <Button block fullWidth primary>Selesai</Button>
            </Card>
        </QrisWrapper>
    );
};

export default QrisMethod;
