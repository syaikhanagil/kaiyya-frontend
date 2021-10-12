import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import Main from '../../layouts/Main';
import shieldCheck from '../../assets/svg/shield-check.svg';
import { Button, Text } from '../../components/Styled';
import pushLocation from '../../configs/routes/pushLocation';
import API from '../../configs/api';
import priceFormat from '../../helpers/price';
import Loading from '../../components/Loading';

const PaymentSuccessWrapper = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    padding: 0 1.5rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const SuccessImg = styled.div`
    position: relative;
    display: block;
    height: 120px;
    width: 100%;
    text-align: center;
    img {
        position: relative;
        height: 100%;
        margin: 0 auto;
    }
`;

const PaymentSuccess = () => {
    const { paymentId } = useParams<any>();
    const [content, setContent] = useState<any>({});
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const payload = {
            params: `/${paymentId}`
        };
        API.fetchPayment(payload).then((res: any) => {
            setContent(res.data);
            setTimeout(() => {
                setReady(true);
            }, 1000);
        });
    }, []);

    return (
        <Main backgroundWhite>
            <PaymentSuccessWrapper>
                {ready && (
                    <>
                        <SuccessImg>
                            <img src={shieldCheck} alt="kaiyya-success" />
                        </SuccessImg>
                        <Text block bold alignCenter marginY>{priceFormat(content.detail.amount)}</Text>
                        <Text block bold alignCenter marginY>Pembayaran Berhasil</Text>
                        <Button block fullWidth primary onClick={() => pushLocation.path('/orders')}>Kembali</Button>
                    </>
                )}
                {!ready && (
                    <Loading type="ring" alignCenter />
                )}
            </PaymentSuccessWrapper>
        </Main>
    );
};

export default PaymentSuccess;
