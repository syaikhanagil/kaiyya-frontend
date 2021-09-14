import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button } from '../../components/Styled';
import pushLocation from '../../configs/routes/pushLocation';
import Main from '../../layouts/Main';

const OrderDetail = (props: any) => {
    const { orders } = props;
    const { orderId } = useParams<any>();
    const [ready, setReady] = useState(false);
    const [data, setData] = useState<any>({});

    const fetchData = () => {
        const filterOrder = orders.filter((order: any) => order.id === orderId);
        if (filterOrder.length > 0) {
            setData(filterOrder[0]);
            setTimeout(() => {
                setReady(true);
            }, 250);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Helmet>
                <title>Detail Pesanan | Kaiyya Dress</title>
            </Helmet>
            <Main useHeader paddingTop backBtn title="Detail Pesanan">
                <>
                    {ready && (
                        // eslint-disable-next-line no-underscore-dangle
                        <Button block fullWidth primary onClick={() => pushLocation.path(`/payment/${data.payment._id}`)}>Bayar Sekarang</Button>
                    )}
                    <Button block fullWidth primary>Cancel</Button>
                </>
            </Main>
        </>
    );
};

const mapStateToProps = (state: any) => {
    return {
        orders: state.orderReducer.items
    };
};

export default connect(mapStateToProps)(OrderDetail);
