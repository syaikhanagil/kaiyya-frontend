import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import analytic from '../../configs/analytics';
import priceFormat from '../../helpers/price';
import Main from '../../layouts/Main';
import CartItem from './thisComponent/CartItem';
import QuantityEditSheet from '../../components/QuantityEditSheet';
import action from '../../configs/redux/action';

const CartWrapper = styled.div`
    position: relative;
    display: block;
    Width: 100%;
    height: 100%;
`;

const StickyWrapper = styled.div`
    position: sticky;
    display: flex;
    width: 100%;
    height: auto;
    background: var(--color-white);
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    top: 46px;
    z-index: 1;

    div {
        width: 100%;
        text-align: center;
        border-bottom: 1px solid #eee;
        padding: 10px 0;
        &:first-of-type {
            border-right: 1px solid #eee;
        }
    }
`;

const FloatingWrapper = styled.div`
    position: fixed;
    display: flex;
    width: 100%;
    max-width: 480px;
    height: auto;
    left: 50%;
    background: var(--color-white);
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

const SubtotalWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: auto;
    padding: 0 1rem;
    flex-basis: 60%;
    span {
        font-size: var(--font-extra-small);
    }
    p {
        font-weight: 600;
    }
`;

const CheckoutBtn = styled.button`
    position: relative;
    display: flex;
    width: 100%;
    height: 56px;
    padding: 10px 1rem;
    background: var(--primary);
    text-align: center;
    align-items: center;
    justify-content: center;
    color: var(--color-white);
    font-weight: 600;
    flex-basis: 40%;
    outline: none;
    border: none;
    cursor: pointer;

    &:disabled {
        background: #e7e7e7;
        color: var(--color-black);
        cursor: not-allowed;
    }
`;

const SoldWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: 100%;

    .top-title {
        position: relative;
        width: 100%;
        margin: 10px 0;
        
        p {
            position: relative;
            font-weight: 600;
            text-align: center;
            margin: 0;
            z-index: 2;
        }
        &::before {
            content: '';
            position: absolute;
            width: 80%;
            height: 2px;
            background: var(--color-black);
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 0;
        }
        &::after {
            content: '';
            position: absolute;
            width: 40%;
            height: 100%;
            background: #f0f0f0;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 1;
        }
    }
`;

const Cart = (props: any) => {
    const { dispatch, items } = props;
    // const [cartItems, setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [soldItems, setSoldItems] = useState<any>([]);
    const [checkedItems, setCheckedItems] = useState<any>([]);
    const [showSoldWrapper, setShowSoldWrapper] = useState(false);
    const [editItem, setEditItem] = useState({});
    const [showEditDialog, setShowEditDialog] = useState(false);
    // const [reload, setReload] = useState(false);

    const onItemChecked = (index: number) => {
        const existingCheckedItem = checkedItems.filter((item: any) => item.size.id === index);
        if (existingCheckedItem.length > 0) {
            const updateCheckedItem = checkedItems.filter((item: any) => item.size.id !== index);
            setCheckedItems(updateCheckedItem);
        } else {
            const checkedItem = items.filter((item: any) => item.size.id === index);
            setCheckedItems([checkedItem[0], ...checkedItems]);
        }
    };

    const onItemEdit = (index: number) => {
        const existingItem = items.filter((item: any) => {
            return item.size.id === index;
        });
        if (existingItem.length > 0) {
            setEditItem(existingItem[0]);
            setShowEditDialog(true);
        }
    };

    const onItemDelete = (index: number) => {
        dispatch(action.deleteCartItem(index));
    };

    const onItemSold = (index: number) => {
        const existingItem = items.filter((item: any) => {
            return item.size.id === index;
        });
        if (existingItem.length > 0) {
            const item = [existingItem[0], ...checkedItems];
            setSoldItems(item);
        }
    };

    useEffect(() => {
        analytic.pageView();
        Cookies.remove('checkout-items');
    }, []);

    useEffect(() => {
        let total = 0;
        if (checkedItems.length < 1) {
            setSubtotal(0);
        } else {
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < checkedItems.length; i++) {
                const price = checkedItems[i].qty * checkedItems[i].size.price;
                total += price;
                setSubtotal(total);
            }
        }
    }, [checkedItems]);

    useEffect(() => {
        if (soldItems.length > 0) {
            setShowSoldWrapper(true);
        } else {
            setShowSoldWrapper(false);
        }
    }, [soldItems]);

    // useEffect(() => {
    //     setReload(true);
    //     setCartItems(items);
    //     setTimeout(() => {
    //         setReload(false);
    //     }, 250);
    // }, [items]);

    const handleCheckout = () => {
        Cookies.set('checkout-items', JSON.stringify(checkedItems));
        window.location.href = '/checkout';
    };

    return (
        <>
            <Helmet>
                <title>Keranjang | Kaiyya Dress</title>
            </Helmet>
            <Main useHeader paddingTop backBtn title="Keranjang" activeMenu="cart">
                {items.length > 0 && (
                    <>
                        <StickyWrapper>
                            <div>
                                Centang produk yang ingin dibeli
                            </div>
                        </StickyWrapper>
                        <CartWrapper>
                            {items.map((i: any, idx: any) => (
                                // eslint-disable-next-line react/no-array-index-key
                                <CartItem key={idx} index={i.size.id} sold={false} slug={i.product.slug} size={i.size.name} qty={i.qty} onItemChecked={(index: number) => onItemChecked(index)} onItemEdit={(index: number) => onItemEdit(index)} onItemDelete={(index: number) => onItemDelete(index)} onItemSold={(index: number) => onItemSold(index)} />
                            ))}
                            {showSoldWrapper && (
                                <SoldWrapper>
                                    <div className="top-title">
                                        <p>Produk Habis Terjual</p>
                                    </div>
                                    {soldItems.map((i: any, idx: any) => (
                                        // eslint-disable-next-line react/no-array-index-key
                                        <CartItem key={idx} index={i.size.id} sold slug={i.product.slug} size={i.size.name} qty={i.qty} onItemChecked={(index: number) => onItemChecked(index)} onItemEdit={(index: number) => onItemEdit(index)} onItemDelete={(index: number) => onItemDelete(index)} onItemSold={() => { }} />
                                    ))}
                                </SoldWrapper>
                            )}
                            <FloatingWrapper>
                                <SubtotalWrapper>
                                    <span>Subtotal :</span>
                                    <p>{priceFormat(subtotal)}</p>
                                </SubtotalWrapper>
                                <CheckoutBtn onClick={() => handleCheckout()} disabled={checkedItems < 1}>
                                    Checkout
                                </CheckoutBtn>
                            </FloatingWrapper>
                        </CartWrapper>
                    </>
                )}
                {showEditDialog && (
                    <QuantityEditSheet item={editItem} handler={(visibility: boolean) => setShowEditDialog(visibility)} />
                )}
            </Main>
        </>
    );
};

const mapStateToProps = (state: any) => {
    return {
        items: state.cartReducer.items
    };
};

export default connect(mapStateToProps)(Cart);
