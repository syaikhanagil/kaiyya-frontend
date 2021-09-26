import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import API from '../../configs/api';
import Main from '../../layouts/Main';

const Shipment = () => {
    const { code } = useParams<any>();

    const fetchData = () => {
        const data = {
            body: {
                code
            }
        };
        API.fetchShipmentDetail(data).then((res: any) => {
            console.log(res);
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Main useHeader paddingTop backBtn title="Detail Pengiriman">
            Hay
        </Main>
    );
};

export default Shipment;
