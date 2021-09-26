import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Shimmer from '../../../components/Shimmer';
import API from '../../../configs/api';
import pushLocation from '../../../configs/routes/pushLocation';
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
    cursor: pointer;

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

interface Props {
    slug: string,
    size: string,
    qty: number
}

const OrderDetailItem = (props: Props) => {
    const { slug, size, qty } = props;
    const [thumb, setThumb] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [sizeSelected, setSizeSelected] = useState<any>({});
    const [ready, setReady] = useState(false);

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
        <ItemWrapper onClick={() => pushLocation.path(`/product/${slug}`)}>
            {ready && (
                <>
                    <ItemThumb>
                        <img src={thumb} alt={name} />
                    </ItemThumb>
                    <div id="info">
                        <ItemName>{name}</ItemName>
                        <ItemSize>
                            <Text>Ukuran :</Text>
                            <Text>{sizeSelected.name}</Text>
                        </ItemSize>
                        <ItemPrice>{priceFormat(price)}</ItemPrice>
                        <ItemQty>
                            <Text>Jumlah :</Text>
                            <Text>{qty}</Text>
                        </ItemQty>
                    </div>
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
    );
};

export default OrderDetailItem;
