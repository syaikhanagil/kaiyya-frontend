import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import LoadingOverlay from '../../components/LoadingOverlay';
// import { Text } from '../../components/Styled';
import API from '../../configs/api';
import Main from '../../layouts/Main';
import QrisMethod from './thisComponent/QrisMethod';
import VirtualAccountMethod from './thisComponent/VirtualAccountMethod';

interface Params {
    paymentId: string
}

const PaymentWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
`;

const Payment = () => {
    const { paymentId } = useParams<Params>();
    const [data, setData] = useState<any>({});
    const [ready, setReady] = useState(false);

    const fetchData = () => {
        const payload = {
            params: paymentId
        };
        API.fetchPayment(payload).then((res: any) => {
            setData(res.data.detail);
            setTimeout(() => {
                setReady(true);
            }, 1000);
        });
    };

    useEffect(() => {
        Cookies.remove('checkout-items');
        if (paymentId) {
            fetchData();
        } else {
            window.location.href = '/not-found';
        }
    }, []);

    return (
        <Main useHeader title="Pembayaran">
            <PaymentWrapper>
                {data.method === 'qris' && (
                    <QrisMethod data={data} />
                )}
                {data.method === 'virtual-account' && (
                    <>
                        <VirtualAccountMethod data={data} />
                    </>
                )}
            </PaymentWrapper>
            {!ready && (
                <LoadingOverlay />
            )}
        </Main>
    );
};

export default Payment;
