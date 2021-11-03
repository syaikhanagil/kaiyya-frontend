import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Main from '../../layouts/Main';
import Icon from '../../components/Icon';
import PaymentMethodSheet from '../../components/PaymentMethodSheet';
import ShipmentAddressSheet from '../../components/ShipmentAddressSheet';
import CheckoutItem from './thisComponent/CheckoutItem';
import ShipmentCourierSheet from '../../components/ShipmentCourierSheet';
import { Button } from '../../components/Styled';
import priceFormat from '../../helpers/price';
import action from '../../configs/redux/action';
import discount from '../../helpers/discount';
import UnverifiedNotif from '../../components/UnverifiedNotif';
import calculatePoint from '../../helpers/point';
// import API from '../../configs/api';

const CheckoutWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
`;

// const SectionTitle = styled.div`
//     position: relative;
//     display: block;
//     width: 100%;
//     height: auto;
//     padding: 4px 1.5rem;
//     background: #f0f0f0;
//     color: #9e9e9e;
// `;

const SectionWrapper = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    background: var(--color-white);
    align-items: center;
    padding: 10px 1rem;
    margin-bottom: 10px;
    cursor: pointer;
    
    div {
        position: relative;
        height: 100%;
        width: auto;
        margin: 0 5px;
        padding: 0 5px;
        text-align: left;

        &:nth-child(2) {
            width: 100%;
        }

        &:nth-child(3) {
            text-align: right;
        }
    }

    .areas {
        position: relative;
        padding: 0;
        margin: 0;
        p {
            padding: 0 5px 0 0;
        }
    }
`;

const Text = styled('p') <{ bold?: boolean, extraSmall?: boolean, block?: boolean }>`
    position: relative;
    display: ${(props) => (props.block ? 'block' : 'inline-block')};;
    font-weight: ${(props) => (props.bold ? '600' : '400')};
    font-size: ${(props) => (props.extraSmall ? 'var(--font-extra-small)' : 'var(--font-small)')};
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

const NotesInput = styled.input`
    position: relative;
    display: block;
    width: 100%;
    padding: 0;
    color: var(--color-black);
    outline: none;
    border: none;
`;

const SubtotalWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    background: var(--color-white);
    align-items: center;
    padding: 10px 1rem;
    margin-bottom: 10px;

    div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 2px 0;
    }
`;

const Checkout = (props: any) => {
    const { dispatch, address, fullname, addons, verified } = props;
    const cookiesItem = Cookies.get('checkout-items') || undefined;
    const items = cookiesItem ? JSON.parse(cookiesItem) : [];
    const [shipmentAddress, setShipmentAddress] = useState<any>({});
    const [shipmentAddressId, setShipmentAddressId] = useState('');
    const [shipmentAddressDialog, setShipmentAddressDialog] = useState(false);

    const [paymentMethod, setPaymentMethod] = useState('');
    const [paymentMethodCode, setPaymentMethodCode] = useState('');
    const [paymentMethodType, setPaymentMethodType] = useState('');
    const [paymentMethodDialog, setPaymentMethodDialog] = useState(false);

    const [courier, setCourier] = useState('');
    const [courierCode, setCourierCode] = useState('');
    const [courierService, setCourierService] = useState<any>({});
    const [courierDialog, setCourierDialog] = useState(false);
    const [courierCost, setCourierCost] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [weightTotal, setWeightTotal] = useState(0);
    const [notes, setNotes] = useState('');

    const fetchData = () => {
        dispatch(action.fetchAddress());
        dispatch(action.fetchAccountDetail());
    };

    useEffect(() => {
        if (shipmentAddressId === '') {
            fetchData();
        }
    }, [shipmentAddressId]);

    useEffect(() => {
        if (address.length > 0) {
            setShipmentAddress(address[0]);
            setShipmentAddressId(address[0].id);
        }
    }, [address]);

    useEffect(() => {
        if (items.length > 0) {
            let total = 0;
            let weight = 0;
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < items.length; i++) {
                total += items[i].qty * discount(items[i].size.price, addons.discount);
                weight += items[i].product.weight;
                setSubtotal(total);
                setWeightTotal(weight);
            }
        } else if (items.length < 1) {
            window.location.href = '/';
        }
    }, [items]);

    useEffect(() => {
        if (courierCode) {
            setCourierCost(courierService.cost[0].value);
        }
    }, [courierService]);

    const onShipmentAddressSelected = (data: any, id: string) => {
        setShipmentAddress(data);
        setShipmentAddressId(id);
        setCourier('');
        setCourierCode('');
        setCourierService('');
    };

    const onPaymentMethodSelected = (method: string, code: string, type: string) => {
        setPaymentMethod(method);
        setPaymentMethodCode(code);
        setPaymentMethodType(type);
    };

    const onCourierSelected = (name: string, code: string, data: any) => {
        setCourier(name);
        setCourierCode(code);
        setCourierService(data);
    };

    const handleSubmit = () => {
        const data = {
            payerName: fullname,
            address: shipmentAddressId,
            shipment: shipmentAddress,
            courierName: courier,
            courierCode,
            courierService: `${courierService.service} - (${courierService.description})`,
            courierCost,
            paymentMethodCode,
            paymentMethodType,
            products: items,
            discount: addons.discount,
            notes,
            subtotal,
            point: calculatePoint(subtotal)
        };
        dispatch(action.createOrder(data));
    };

    return (
        <Main useHeader paddingTop backTo="/cart" title="Checkout" paddingBottom>
            <>
                <CheckoutWrapper>
                    <SectionWrapper onClick={() => setShipmentAddressDialog(true)}>
                        <div>
                            <Icon icon="map-pin" />
                        </div>
                        <div>
                            <Text block bold>Alamat Pengiriman</Text>
                            {!shipmentAddressId && (
                                <Text extraSmall>Pilih Alamat Pengiriman</Text>
                            )}
                            {shipmentAddressId && (
                                <>
                                    <Text block bold extraSmall>{shipmentAddress.name}</Text>
                                    <Text block extraSmall>{shipmentAddress.phone}</Text>
                                    <Text extraSmall>{shipmentAddress.detail}</Text>
                                    <div className="areas">
                                        <Text extraSmall>{`${shipmentAddress.subdistrict}, `}</Text>
                                        <Text extraSmall>{`${shipmentAddress.city}, `}</Text>
                                        <Text extraSmall>{shipmentAddress.province}</Text>
                                    </div>
                                </>
                            )}
                        </div>
                        <div>
                            <Icon icon="chevron-right" />
                        </div>
                    </SectionWrapper>
                    {items.map((i: any, idx: any) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <CheckoutItem key={idx} slug={i.product.slug} size={i.size.name} qty={i.qty} />
                    ))}
                    {!verified.admin && (
                        <UnverifiedNotif />
                    )}
                    <SectionWrapper
                        onClick={() => {
                            if (!shipmentAddressId) {
                                dispatch(action.showToast('Pilih alamat pengiriman terlebih dahulu'));
                                return;
                            }
                            setCourierDialog(true);
                        }}
                    >
                        <div>
                            <Icon icon="truck" />
                        </div>
                        <div>
                            <Text block bold>Opsi Pengiriman</Text>
                            {!courierCode && (
                                <Text extraSmall>Pilih opsi pengiriman</Text>
                            )}
                            {courierCode && (
                                <>
                                    <Text extraSmall>{`${courier} (${courierService.service} - ${courierService.description})`}</Text>
                                    <Text extraSmall block>{priceFormat(courierCost)}</Text>
                                </>
                            )}
                        </div>
                        <div>
                            <Icon icon="chevron-right" />
                        </div>
                    </SectionWrapper>
                    <SectionWrapper onClick={() => setPaymentMethodDialog(true)}>
                        <div>
                            <Icon icon="credit-card" />
                        </div>
                        <div>
                            <Text block bold>Metode Pembayaran</Text>
                            {!paymentMethod && (
                                <Text extraSmall>Pilih metode pembayaran</Text>
                            )}
                            {paymentMethod && (
                                <Text extraSmall>{paymentMethod}</Text>
                            )}
                        </div>
                        <div>
                            <Icon icon="chevron-right" />
                        </div>
                    </SectionWrapper>
                    <SectionWrapper onClick={() => document.getElementById('notes')?.focus()}>
                        <div>
                            <Icon icon="feather" />
                        </div>
                        <div>
                            <Text block bold>Catatan</Text>
                            <NotesInput id="notes" placeholder="Catatan Pesanan" autoComplete="off" autoFocus={false} value={notes} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNotes(event.target.value)} />
                        </div>
                        <div>
                            <Icon icon="chevron-right" />
                        </div>
                    </SectionWrapper>
                    <SubtotalWrapper>
                        <div>
                            <Text extraSmall>K-Poin yang didapatkan</Text>
                            <Text extraSmall>{calculatePoint(subtotal)}</Text>
                        </div>
                        <div>
                            <Text extraSmall>Subtotal Produk</Text>
                            <Text extraSmall>{priceFormat(subtotal)}</Text>
                        </div>
                        <div>
                            <Text extraSmall>Subtotal Pengiriman</Text>
                            {!courierService.service && (
                                <Text extraSmall>0</Text>
                            )}
                            {courierService.service && (
                                <Text extraSmall>{priceFormat(courierService.cost[0].value)}</Text>
                            )}
                        </div>
                        <div>
                            <Text bold>Subtotal Pembayaran</Text>
                            {!courierService.service && (
                                <Text bold>{priceFormat(subtotal)}</Text>
                            )}
                            {courierService.service && (
                                <Text bold>{priceFormat(subtotal + courierService.cost[0].value)}</Text>
                            )}
                        </div>
                    </SubtotalWrapper>
                </CheckoutWrapper>
                <FloatingWrapper>
                    <Button block fullWidth disabled={!courier || !shipmentAddressId || !paymentMethodCode} primary onClick={() => handleSubmit()}>Bayar Sekarang</Button>
                </FloatingWrapper>
                {paymentMethodDialog && (
                    <PaymentMethodSheet onSubmit={(method: string, code: string, type: string) => onPaymentMethodSelected(method, code, type)} handler={(visibility: boolean) => setPaymentMethodDialog(visibility)} />
                )}
                {shipmentAddressDialog && (
                    <ShipmentAddressSheet onSubmit={(data: any, id: string) => onShipmentAddressSelected(data, id)} handler={(visibility: boolean) => setShipmentAddressDialog(visibility)} />
                )}
                {courierDialog && (
                    <ShipmentCourierSheet destination={shipmentAddress} weightTotal={weightTotal} onSubmit={(name: string, code: string, data: any) => onCourierSelected(name, code, data)} handler={(visibility: boolean) => setCourierDialog(visibility)} />
                )}
            </>
        </Main>
    );
};

const mapStateToProps = (state: any) => {
    return {
        address: state.addressReducer.items,
        fullname: state.accountReducer.fullname,
        addons: state.accountReducer.addons,
        verified: state.accountReducer.verified
    };
};

export default connect(mapStateToProps)(Checkout);
