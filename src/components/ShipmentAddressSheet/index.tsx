/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import API from '../../configs/api';
import action from '../../configs/redux/action';
import BottomSheet from '../BottomSheet';
import Icon from '../Icon';
import { Button } from '../Styled';

const Item = styled.div`
    position: relative;
    display: flex;
    padding: 10px 1.5rem;
    background: var(--color-white);
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    cursor: pointer;

    &:hover {
        background: #f0f0f0;
    }

    div {
        position: relative;
        width: 100%;
        &#icon {
            width: 20px;
            text-align: right;
        }
    }
    .areas {
        position: relative;
        display: block;
        width: 100%;
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

const SubmitWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    padding: 10px 1rem;
`;

interface Props {
    onSubmit: (data: any, id: string) => void,
    handler: (visibility: boolean) => void,
    dispatch: any,
    items: any
}

const ShipmentAddressSheet = (props: Props) => {
    const { onSubmit, handler, dispatch, items } = props;
    const [addressData, setAddressData] = useState<any>({});
    const [addressId, setAddressId] = useState('');

    const handleSubmit = () => {
        onSubmit(addressData, addressId);
        setTimeout(() => {
            handler(false);
        }, 250);
    };

    const fetchData = () => {
        dispatch(action.fetchAddress());
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <BottomSheet title="Pilih Alamat Pengiriman" handler={handler} actionTitle="Tambah" onActionClick={() => { window.location.href = '/account/address/new?redirect=checkout'; }}>
            {items.map((i: any, idx: any) => (
                <Item
                    // eslint-disable-next-line react/no-array-index-key
                    key={idx}
                    onClick={() => {
                        setAddressData(i);
                        setAddressId(i.id);
                    }}
                >
                    <div>
                        <Text block bold>{i.name}</Text>
                        <Text block bold extraSmall>{i.phone}</Text>
                        <Text extraSmall>{i.detail}</Text>
                        <div className="areas">
                            <Text extraSmall>{`${i.subdistrict}, `}</Text>
                            <Text extraSmall>{`${i.city}, `}</Text>
                            <Text extraSmall>{i.province}</Text>
                        </div>
                    </div>
                    {addressId === i.id && (
                        <div id="icon">
                            <Icon icon="check" />
                        </div>
                    )}
                </Item>
            ))}
            <SubmitWrapper>
                <Button block fullWidth primary disabled={!addressId} onClick={() => handleSubmit()}>Oke</Button>
            </SubmitWrapper>
        </BottomSheet>
    );
};

const mapStateToProps = (state: any) => {
    return {
        items: state.addressReducer.items
    };
};

export default connect(mapStateToProps)(ShipmentAddressSheet);
