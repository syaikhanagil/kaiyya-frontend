import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import action from '../../configs/redux/action';
import priceFormat from '../../helpers/price';
import BottomSheet from '../BottomSheet';
import Icon from '../Icon';
import { Button } from '../Styled';

const QuantityWrapper = styled.div`
    position: relative;
    width: auto;
    padding: 10px 1rem;
`;

const ItemWrapper = styled('div') <{ disabled?: boolean }>`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    background: ${(props) => (props.disabled ? '#f5f5f5' : 'var(--color-white)')};
    padding: 10px 1rem;
    flex-direction: row;
    border-bottom: 1px solid #eee;
    align-items: center;
    user-select: none;

    #info {
        width: 100%;
        padding: 0 10px;
    }
`;

const Text = styled.p`
    position: relative;
    display: block;
    width: 100%;
    margin: 0 0 5px;
    font-size: var(--font-extra-small);
`;

// const ItemCheck = styled.input`
//     position: relative;
//     display: block;
//     width: 24px;
//     height: 24px;
//     margin-right: 10px;
//     cursor: pointer;
//     &.active {
//         background: var(--primary);
//     }
//     &:disabled {
//         cursor: not-allowed;
//     }
// `;

// const ItemThumb = styled.div`
//     position: relative;
//     display: block;
//     width: 100px;
//     height: auto;
//     padding: 0;
//     border-radius: 6px;

//     img {
//         width: 100%;
//     }
// `;

const ItemName = styled(Text)`
    font-weight: 500;
    font-size: var(--font-small);
`;

const ItemPrice = styled(Text)`
    font-weight: 500;
`;

const ItemSize = styled.div`
    position: relative;
    display: block;
    width: auto;
    
    ${Text} {
        width: auto;
        background: #eee;
        display: inline-block;
        padding: 2px 10px;
        &:nth-child(1) {
            padding-right: 5px;
        }
        &:nth-child(2) {
            padding-left: 5px;
        }
    }
`;

const QuantityField = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: auto;
    padding: 10px 0;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const QtyInputContainer = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    flex-direction: row;

    input {
        position: relative;
        width: auto;
        max-width: 120px;
        text-align: center;
        border-top: 2px solid #eee;
        border-right: none;
        border-left: none;
        border-bottom: 2px solid #eee;
        outline: none;

        &:disabled {
            color: #e4e4e4;
        }
    }
`;

const QtyBtn = styled.button`
    position: relative;
    display: block;
    width: auto;
    padding: 5px 10px;
    border: 2px solid #eee;
    outline: none;

    &:disabled {
        color: #e4e4e4;
    }
`;

interface Props {
    item: any,
    dispatch: any,
    // eslint-disable-next-line no-unused-vars
    handler: (visibility: boolean) => void
}

const QuantityEditSheet = (props: Props) => {
    const { item, dispatch, handler } = props;
    const [qty, setQty] = useState(1);

    useEffect(() => {
        setQty(item.qty);
    }, []);
    const handleSubmit = () => {
        dispatch(action.updateCartQty(item, qty));
        setTimeout(() => {
            handler(false);
        }, 250);
    };

    const handleQty = (amount: any) => {
        const regex = new RegExp('^[0-9]+$');
        if (regex.test(amount)) {
            setQty(amount);
        } else if (amount < 2) {
            setQty(1);
        }
    };

    const qtyPlus = () => {
        if (qty > item.size.stock || qty === item.size.stock) {
            setQty(item.size.stock);
        } else {
            setQty(qty + 1);
        }
    };

    const qtyMin = () => {
        if (qty < 2) {
            setQty(1);
        } else {
            setQty(qty - 1);
        }
    };

    return (
        <BottomSheet title="Edit Jumlah" handler={(visibility: boolean) => handler(visibility)}>
            <QuantityWrapper>
                <ItemWrapper>
                    {/* <ItemThumb>
                        <img src={thumb} alt={name} />
                    </ItemThumb> */}
                    <div id="info">
                        <ItemName>{item.product.name}</ItemName>
                        <ItemSize>
                            <Text>Ukuran :</Text>
                            <Text>{item.size.name}</Text>
                        </ItemSize>
                        <ItemPrice>{priceFormat(item.size.price)}</ItemPrice>
                    </div>
                    <QuantityField>
                        <QtyInputContainer>
                            <QtyBtn disabled={qty < 2} onClick={() => qtyMin()}>
                                <Icon icon="minus" />
                            </QtyBtn>
                            <input type="text" onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleQty(event.target.value)} value={qty} name="qty" id="qty" />
                            <QtyBtn disabled={qty === item.size.stock || qty > item.size.stock} onClick={() => qtyPlus()}>
                                <Icon icon="plus" />
                            </QtyBtn>
                        </QtyInputContainer>
                    </QuantityField>
                </ItemWrapper>
                <Button block fullWidth primary onClick={() => handleSubmit()}>Konfirmasi</Button>
            </QuantityWrapper>
        </BottomSheet>
    );
};

export default connect(null)(QuantityEditSheet);
