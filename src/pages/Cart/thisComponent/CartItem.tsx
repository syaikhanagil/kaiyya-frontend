import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Icon from '../../../components/Icon';
import Shimmer from '../../../components/Shimmer';
import API from '../../../configs/api';
import discount from '../../../helpers/discount';
import priceFormat from '../../../helpers/price';

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

const ItemCheck = styled.input`
    position: relative;
    display: block;
    width: 24px;
    height: 24px;
    margin-right: 10px;
    cursor: pointer;
    &.active {
        background: var(--primary);
    }
    &:disabled {
        cursor: not-allowed;
    }
`;

const ItemThumb = styled.div`
    position: relative;
    display: block;
    width: 100px;
    height: auto;
    padding: 0;
    border-radius: 6px;

    img {
        width: 100%;
    }
`;

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

const ItemQty = styled.div`
    position: relative;
    display: flex;
    width: auto;
    align-items: center;
    ${Text} {
        width: auto;
        display: inline-block;
        margin: 0;
        vertical-align: middle;
        &:nth-child(1) {
            padding-right: 5px;
        }
    }
`;

const ActionWrapper = styled.div`
    position: relative;
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ActionBtn = styled.button`
    position: relative;
    display: flex;
    width: 36px;
    height: 36px;
    border: 1px solid #eee;
    border-radius: 50px;
    align-items: center;
    justify-content: center;

    &:first-of-type {
        margin-bottom: 10px;
    }
`;

interface Props {
    index: number,
    sold: boolean,
    slug: string,
    size: string,
    qty: number,
    // eslint-disable-next-line no-unused-vars
    onItemChecked: (index: number) => void,
    // eslint-disable-next-line no-unused-vars
    onItemEdit: (index: number) => void,
    // eslint-disable-next-line no-unused-vars
    onItemDelete: (index: number) => void,
    // eslint-disable-next-line no-unused-vars
    onItemSold: (index: number) => void,
    addons: any
}

const CartItem = (props: Props) => {
    const { index, sold, slug, size, qty, onItemChecked, onItemDelete, onItemEdit, onItemSold, addons } = props;
    const [thumb, setThumb] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [sizeSelected, setSizeSelected] = useState<any>({});
    const [ready, setReady] = useState(false);
    const [availableStock, setAvailableStock] = useState(0);

    const fetchData = async () => {
        const payload = {
            params: slug
        };
        await API.fetchProductDetail(payload).then((res: any) => {
            const { sizes, images } = res.data;
            setName(res.data.name);
            const filterSize = sizes.filter((item: any) => {
                return item.name === size;
            });
            setThumb(images[0].src);
            setPrice(filterSize[0].price);
            if (!sold) {
                if (filterSize[0].stock < 1) {
                    onItemSold(filterSize[0].id);
                }
            }
            setAvailableStock(filterSize[0].stock);
            setSizeSelected(filterSize[0]);
            setTimeout(() => {
                setReady(true);
            }, 1000);
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {!sold && availableStock > 0 && (
                <ItemWrapper>
                    {ready && (
                        <>
                            {qty <= availableStock && (
                                <ItemCheck type="checkbox" id={slug + qty + size} onClick={() => onItemChecked(index)} />
                            )}
                            {qty > availableStock && (
                                <ItemCheck type="checkbox" id={slug + qty + size} disabled onClick={() => onItemChecked(index)} />
                            )}
                            <ItemThumb>
                                <img src={thumb} alt={name} />
                            </ItemThumb>
                            <div id="info">
                                <ItemName>{name}</ItemName>
                                <ItemSize>
                                    <Text>Ukuran :</Text>
                                    <Text>{sizeSelected.name}</Text>
                                </ItemSize>
                                <ItemPrice>{priceFormat(discount(price, addons.discount))}</ItemPrice>
                                <ItemQty>
                                    <Text>Jumlah :</Text>
                                    <Text>{qty}</Text>
                                </ItemQty>
                                {qty > availableStock && (
                                    <Text style={{ color: 'red' }}>Jumlah melebihi stok tersedia</Text>
                                )}
                            </div>
                            <ActionWrapper>
                                <ActionBtn onClick={() => onItemEdit(index)}>
                                    <Icon icon="edit-2" />
                                </ActionBtn>
                                <ActionBtn onClick={() => onItemDelete(index)}>
                                    <Icon icon="trash-2" />
                                </ActionBtn>
                            </ActionWrapper>
                        </>
                    )}
                    {!ready && (
                        <>
                            <Shimmer height="110px" width="90px" />
                            <div id="info">
                                <Shimmer height="14px" width="120px" />
                                <Shimmer height="14px" width="100px" />
                                <Shimmer height="14px" width="80px" />
                                <Shimmer height="14px" width="100px" />
                            </div>
                        </>
                    )}
                </ItemWrapper>
            )}
            {sold && availableStock < 1 && (
                <ItemWrapper disabled>
                    {ready && (
                        <>
                            {qty <= availableStock && (
                                <ItemCheck type="checkbox" id={slug + qty + size} onClick={() => onItemChecked(index)} />
                            )}
                            {qty > availableStock && (
                                <ItemCheck type="checkbox" id={slug + qty + size} disabled onClick={() => onItemChecked(index)} />
                            )}
                            <ItemThumb>
                                <img src={thumb} alt={name} />
                            </ItemThumb>
                            <div id="info">
                                <ItemName>{name}</ItemName>
                                <ItemSize>
                                    <Text>Ukuran :</Text>
                                    <Text>{sizeSelected.name}</Text>
                                </ItemSize>
                                {/* {add} */}
                                <ItemPrice>{priceFormat(price)}</ItemPrice>
                                <ItemQty>
                                    <Text>Jumlah :</Text>
                                    <Text>{qty}</Text>
                                </ItemQty>
                            </div>
                            <ActionWrapper>
                                <ActionBtn onClick={() => onItemEdit(index)}>
                                    <Icon icon="edit-2" />
                                </ActionBtn>
                                <ActionBtn onClick={() => onItemDelete(index)}>
                                    <Icon icon="trash-2" />
                                </ActionBtn>
                            </ActionWrapper>
                        </>
                    )}
                    {!ready && (
                        <>
                            <Shimmer height="110px" width="90px" />
                            <div id="info">
                                <Shimmer height="14px" width="120px" />
                                <Shimmer height="14px" width="100px" />
                                <Shimmer height="14px" width="80px" />
                                <Shimmer height="14px" width="100px" />
                            </div>
                        </>
                    )}
                </ItemWrapper>
            )}
        </>
    );
};

const mapStateToProps = (state: any) => {
    return {
        items: state.cartReducer.items,
        role: state.accountReducer.role,
        addons: state.accountReducer.addons
    };
};

export default connect(mapStateToProps)(CartItem);
