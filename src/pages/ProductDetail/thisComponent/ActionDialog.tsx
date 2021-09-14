import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import Icon from '../../../components/Icon';
import Overlay from '../../../components/Overlay';
import { Button } from '../../../components/Styled';
// import action from '../../../configs/redux/action';
import CONSTANT from '../../../constant';
import priceFormat from '../../../helpers/price';
import analytic from '../../../configs/analytics';

const ActionWrapper = styled.div`
    position: fixed;
    display: block;
    width: 100%;
    max-width: 480px;
    padding: 10px 1rem;
    background: var(--color-white);
    left: 50%;
    bottom: -120%;
    border-radius: 6px 6px 0 0;
    transform: translateX(-50%);
    transition: .25s ease;
    z-index: 101;
    
    &.visible {
        bottom: 0;
    }

    @media only screen and (max-width: 768px) {
        max-width: 100%;
    }
`;

const ProductInfoWrapper = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: auto;
    padding: 5px 0 15px;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
    flex-direction: row;
    justify-content: space-between;
    
    .thumb {
        position: relative;
        display: block;
        margin-right: 10px;
        width: 100px;
        img {
            width: 100%;
        }
    }
    .info {
        position: relative;
        display: block;
        width: 100%;
    }
`;

const CloseBtn = styled.div`
    position: relative;
    display: inline-block;
    width: auto;
    height: auto;
    div {
        cursor: pointer;
    }
`;

const TitleField = styled.p`
    position: relative;
    display: block;
    width: 100%;
    font-weight: 600;
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
    justify-content: space-between;
    flex-basis: 50%;

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

const SizeField = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: auto;
    padding: 10px 0;
    flex-direction: row;
    justify-content: space-between;
`;

const SizeItem = styled.button`
    position: relative;
    display: inline-block;
    width: 100%;
    margin: 0 5px;
    text-align: center;
    padding: 10px 0;
    border: 2px solid #e4e4e4;
    border-radius: 6px;
    outline: none;
    cursor: pointer;
    &:first-of-type {
        margin-left: 0;
    }
    &:last-of-type {
        margin-right: 0;
    }

    &:disabled {
        background: #eee;
    }
    &.selected {
        border: 2px solid var(--primary);
    }
`;

const WarningText = styled.span`
    position: relative;
    display: block;
    width: 100%;
    margin-bottom: 10px;
    font-size: var(--font-extra-small);
`;

interface Props {
    dispatch: any,
    thumb?: any,
    product?: any,
    sizes?: any,
    // eslint-disable-next-line no-unused-vars
    handler: (visibility: boolean, alert: boolean) => void
}

const ActionDialog = (props: Props) => {
    const { dispatch, thumb, product, sizes, handler } = props;
    const [visible, setVisible] = useState(false);
    const [selectedSize, setSelectedSize] = useState<any>({});
    const [selectedStock, setSelectedStock] = useState(0);
    const [qty, setQty] = useState(1);

    useEffect(() => {
        setTimeout(() => {
            let total = 0;
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < sizes.length; i++) {
                total += sizes[i].stock;
                setSelectedStock(total);
            }
            setVisible(true);
        }, 250);
    }, []);

    const closeDialog = (showAlert: boolean) => {
        setVisible(false);
        setTimeout(() => {
            handler(false, showAlert);
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
        if (qty > selectedStock || qty === selectedStock) {
            setQty(selectedStock);
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

    const handleSizeChange = (sizeId: string) => {
        const getSize = sizes.filter((i: any) => {
            return i.id === sizeId;
        });
        setSelectedSize(getSize[0]);
        setSelectedStock(getSize[0].stock);
        setQty(1);
    };

    const addToCart = () => {
        const payload = {
            product: {
                id: product.id,
                slug: product.slug,
                name: product.name,
                images: product.images
            },
            size: selectedSize,
            qty
        };
        const cookiesItems = Cookies.get('cart-items') || undefined;
        const cartItems = cookiesItems ? JSON.parse(cookiesItems) : [];
        dispatch({ type: CONSTANT.ADD_ITEM_TO_CART_REQUEST });
        const existingItems = cartItems.filter((item: any) => {
            return item.product.id === payload.product.id && item.size.id === payload.size.id;
        });
        if (existingItems.length > 0) {
            const currentItem = cartItems.filter((item: any) => item.size.id !== payload.size.id);
            const updateItem = {
                product: existingItems[0].product,
                size: existingItems[0].size,
                qty: existingItems[0].qty + payload.qty
            };
            const items = [updateItem, ...currentItem];
            Cookies.set('cart-items', JSON.stringify(items));
            dispatch({ type: CONSTANT.UPDATE_CART_ITEM_SUCCESS, items });
            analytic.addToCart(payload);
            setTimeout(() => {
                closeDialog(true);
            }, 250);
        } else {
            const items = [payload, ...cartItems];
            Cookies.set('cart-items', JSON.stringify(items));
            dispatch({ type: CONSTANT.ADD_ITEM_TO_CART_SUCCESS, items });
            analytic.addToCart(payload);
            setTimeout(() => {
                closeDialog(true);
            }, 250);
        }
    };

    return (
        <>
            <Overlay />
            <ActionWrapper className={visible ? 'visible' : ''}>
                <ProductInfoWrapper>
                    <div className="thumb">
                        <img src={thumb.src} alt={product.name} />
                    </div>
                    <div className="info">
                        <p>{product.name}</p>
                        <p>{priceFormat(sizes[0].price)}</p>
                        <p>{`Stok: ${selectedStock}`}</p>
                    </div>
                    <CloseBtn>
                        <div role="button" onClick={() => closeDialog(false)}>
                            <Icon icon="x" />
                        </div>
                    </CloseBtn>
                </ProductInfoWrapper>
                <TitleField>Pilih Ukuran</TitleField>
                <SizeField>
                    {sizes.map((i: any) => (
                        <SizeItem key={i.id} className={selectedSize.id === i.id ? 'selected' : ''} disabled={i.stock === 0} onClick={() => handleSizeChange(i.id)} data-test={`SIZE-${i.name}`}>
                            {i.name}
                        </SizeItem>
                    ))}
                </SizeField>
                <QuantityField>
                    <TitleField>Jumlah</TitleField>
                    <QtyInputContainer>
                        <QtyBtn disabled={!selectedSize.id || qty < 2} onClick={() => qtyMin()}>
                            <Icon icon="minus" />
                        </QtyBtn>
                        <input type="text" disabled={!selectedSize.id} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleQty(event.target.value)} value={qty} name="qty" id="qty" />
                        <QtyBtn disabled={!selectedSize.id || qty === selectedStock || qty > selectedStock} onClick={() => qtyPlus()}>
                            <Icon icon="plus" />
                        </QtyBtn>
                    </QtyInputContainer>
                </QuantityField>
                {selectedStock === qty && (
                    <WarningText className="">Jumlah telah mencapai stok maksimum!</WarningText>
                )}
                <Button block fullWidth primary disabled={!selectedSize.id} onClick={() => addToCart()}>Konfirmasi</Button>
            </ActionWrapper>
        </>
    );
};

ActionDialog.defaultProps = {
    thumb: {},
    product: {},
    sizes: []
};

const mapStateToProps = (state: any) => {
    return {
        items: state.cartReducer.items
    };
};

export default connect(mapStateToProps)(ActionDialog);
