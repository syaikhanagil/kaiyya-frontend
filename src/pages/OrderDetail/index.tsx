/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Text } from '../../components/Styled';
import API from '../../configs/api';
import action from '../../configs/redux/action';
import pushLocation from '../../configs/routes/pushLocation';
import clipboardCopy from '../../helpers/clipboard';
import Main from '../../layouts/Main';
import OrderDetailItem from './thisComponent/OrderDetailItem';

const OrderDetailWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    padding: 0;
`;

const TitleWrapper = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    background: var(--color-white);
    padding: 5px 1rem;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    div {
        flex-basis: 49%;
    }
    .action {
        color: var(--primary);
        padding: 5px 0;
        cursor: pointer;
    }
`;

const SectionWrapper = styled.div <{ flex?: boolean, transparent?: boolean }>`
    position: relative;
    display: ${(props) => (props.flex ? 'flex' : 'block')};
    width: 100%;
    height: 100%;
    background: ${(props) => (props.transparent ? 'var(--transparent)' : 'var(--color-white)')};
    padding: 0 1rem 10px;
    margin-bottom: 10px;
    ${(props) => (props.flex && `
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        p, button {
            flex-basis: 49%;
        }
    `)};

    .areas {
        position: relative;
        padding: 0;
        margin: 0;
        p {
            padding: 0 5px 0 0;
        }
    }
`;

const FloatingWrapper = styled.div`
    position: fixed;
    display: flex;
    width: 100%;
    max-width: 480px;
    height: auto;
    background: var(--color-white);
    padding: 10px 1rem;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    align-items: center;
    overflow: hidden;
    box-shadow: 0 -3px 6px rgba(0, 0, 0, .1);
    z-indeX: 1;

    @media only screen and (max-width: 768px) {
        max-width: 100%;
    }
`;

const OrderDetail = () => {
    const { orderId } = useParams<any>();
    const dispatch = useDispatch();
    const [ready, setReady] = useState(false);
    const [items, setItems] = useState<any>([]);
    const [orderDetail, setOrderDetail] = useState<any>({});

    const fetchData = () => {
        const data = {
            params: `/${orderId}`
        };
        API.fetchOrderDetail(data).then((res: any) => {
            setOrderDetail(res.data);
            console.log(res.data);
            setItems(res.data.order_detail);
            setTimeout(() => {
                setReady(true);
            }, 500);
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onCopyClick = () => {
        clipboardCopy('Halo');
        dispatch(action.showToast('Berhasil disalin!'));
        // console.log('copy clicked');
    };

    return (
        <>
            <Helmet>
                <title>Detail Pesanan | Kaiyya Dress</title>
            </Helmet>
            <Main useHeader paddingTop paddingBottom backBtn title="Detail Pesanan">
                <OrderDetailWrapper>
                    {ready && (
                        <>
                            <TitleWrapper>
                                <div>
                                    <Text block bold>Informasi Pengiriman</Text>
                                </div>
                                <div>
                                    {orderDetail.status !== 'unpaid' && (
                                        <Text block bold extraSmall alignRight className="action">Lihat Detail Pengiriman</Text>
                                    )}
                                </div>
                            </TitleWrapper>
                            <SectionWrapper>
                                <Text block extraSmall>{orderDetail.courier.name}</Text>
                                <Text block extraSmall>{orderDetail.courier.service}</Text>
                                {!orderDetail.resi && (
                                    <Text block bold extraSmall marginY>Admin belum menginput no. resi</Text>
                                )}
                            </SectionWrapper>
                            <TitleWrapper>
                                <div>
                                    <Text block bold>Alamat Pengiriman</Text>
                                </div>
                                <div>
                                    <Text block bold alignRight className="action" onClick={() => onCopyClick()}>Salin</Text>
                                </div>
                            </TitleWrapper>
                            <SectionWrapper>
                                <Text block bold extraSmall>{orderDetail.address.name}</Text>
                                <Text block extraSmall>{orderDetail.address.phone}</Text>
                                <div className="areas">
                                    <Text extraSmall>{`${orderDetail.address.subdistrict}, `}</Text>
                                    <Text extraSmall>{`${orderDetail.address.city}, `}</Text>
                                    <Text extraSmall>{orderDetail.address.province}</Text>
                                </div>
                                <Text extraSmall>{orderDetail.address.detail}</Text>
                            </SectionWrapper>
                            <SectionWrapper>
                                {items.map((i: any, idx: any) => (
                                    // eslint-disable-next-line react/no-array-index-key
                                    <OrderDetailItem key={idx} slug={i.product.slug} size={i.size.name} qty={i.qty} />
                                ))}
                            </SectionWrapper>
                            <TitleWrapper>
                                <div>
                                    <Text block bold marginY>No. Pesanan</Text>
                                </div>
                                <div>
                                    <Text block bold marginY alignRight>{orderDetail.external_id}</Text>
                                </div>
                            </TitleWrapper>
                            <SectionWrapper flex>
                                <Text block extraSmall>Waktu Pemesanan</Text>
                                <Text block extraSmall alignRight>{orderDetail.external_id}</Text>
                            </SectionWrapper>
                            {orderDetail.status === 'unpaid' && (
                                <SectionWrapper flex transparent>
                                    <Button block outline>Hubungi Admin</Button>
                                    <Button block outline onClick={() => pushLocation.path(`/payment/${orderDetail.payment._id}`)}>Batalkan Pesanan</Button>
                                </SectionWrapper>
                            )}
                        </>
                    )}
                    {orderDetail.status === 'unpaid' && (
                        <FloatingWrapper>
                            <Button block fullWidth primary onClick={() => pushLocation.path(`/payment/${orderDetail.payment._id}`)}>Bayar Sekarang</Button>
                        </FloatingWrapper>
                    )}
                </OrderDetailWrapper>
            </Main>
        </>
    );
};

export default OrderDetail;
