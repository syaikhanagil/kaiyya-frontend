import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '../../../components/Icon';
import { Text } from '../../../components/Styled';
import priceFormat from '../../../helpers/price';

const ItemWrapper = styled(Link)`
    position: relative;
    display: block;
    width: 100%;
    background: var(--color-white);
    padding: 10px 1.5rem;
    margin-bottom: 10px;
    cursor: pointer;
    &:hover {
        background: #f7f7f7;
    }
`;

const SectionWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
`;

const InfoWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
    justify-content: space-between;
    align-items: center;

    p:first-of-type {
        color: #555;
    }
    p:last-of-type {
        color: var(--primary);
    }
`;

const ShipmentWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
    color: var(--primary);
    align-items: center;
    p:last-of-type {
        padding-left: 10px;
    }
`;

interface Props {
    data: any
}

const OrderItem = (props: Props) => {
    const { data } = props;
    return (
        <ItemWrapper to={`/orders/${data.id}`}>
            <SectionWrapper>
                <Text>{`No. Pesanan : ${data.external_id}`}</Text>
                <Text block bold>{priceFormat(data.subtotal)}</Text>
            </SectionWrapper>
            <InfoWrapper>
                <Text extraSmall>{`${data.order_detail.length} Produk`}</Text>
                <Text extraSmall>{`Total Pembayaran: ${priceFormat(data.subtotal)}`}</Text>
            </InfoWrapper>
            <ShipmentWrapper>
                <Text>
                    <Icon icon="truck" />
                </Text>
                <Text extraSmall>{`${data.address.detail} - ${data.address.subdistrict}, ${data.address.city}, ${data.address.province}.`}</Text>
            </ShipmentWrapper>
        </ItemWrapper>
    );
};

export default OrderItem;
