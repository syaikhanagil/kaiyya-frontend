import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import API from '../../configs/api';
import BottomSheet from '../BottomSheet';
import { Button } from '../Styled';
import ShipmentCourierItem from './thisComponent/ShipmentCourierItem';

const SubmitWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    padding: 10px 1rem;
`;

interface Props {
    destination: any,
    weightTotal: number,
    // eslint-disable-next-line no-unused-vars
    onSubmit: (name: string, code: string, data: any) => void,
    // eslint-disable-next-line no-unused-vars
    handler: (visibility: boolean) => void
}

const ShipmentCourierSheet = (props: Props) => {
    const { destination, weightTotal, onSubmit, handler } = props;
    const [courierItems, setCourierItems] = useState([]);
    const [courierName, setCourierName] = useState('');
    const [courierCode, setCourierCode] = useState('');
    const [courierService, setCourierService] = useState<any>({});
    const [selectedService, setSelectedService] = useState('');

    const handleSubmit = () => {
        onSubmit(courierName, courierCode, courierService);
        setTimeout(() => {
            handler(false);
        }, 250);
    };

    const fetchData = () => {
        API.fetchShipmentService().then((res: any) => {
            setCourierItems(res.data);
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <BottomSheet fullHeight title="Pilih Kurir" handler={handler}>
            {courierItems.map((i: any, idx: any) => (
                <ShipmentCourierItem
                    // eslint-disable-next-line react/no-array-index-key
                    key={idx}
                    destination={destination.subdistrictId}
                    weight={weightTotal}
                    courierName={i.name}
                    courierCode={i.code}
                    activeService={selectedService}
                    onCourierSelect={(name: string, code: string) => {
                        setCourierName(name);
                        setCourierCode(code);
                    }}
                    onServiceSelect={(data: any, index: string) => {
                        setCourierService(data);
                        setSelectedService(index);
                    }}
                />
            ))}
            <SubmitWrapper>
                <Button block fullWidth primary disabled={!courierCode || !selectedService} onClick={() => handleSubmit()}>Konfirmasi</Button>
            </SubmitWrapper>
        </BottomSheet>
    );
};

export default ShipmentCourierSheet;
