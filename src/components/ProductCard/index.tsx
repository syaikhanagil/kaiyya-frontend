import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import API from '../../configs/api';
import priceFormat from '../../helpers/price';
import Shimmer from '../Shimmer';

const Thumbnail = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: auto;
    border-radius: 6px;
    overflow: hidden;
    cursor: pointer;
    img {
        position: relative;
        width: 100%;
        border-radius: 6px;
        transition: .25s ease;
    }
`;

const Wrapper = styled('div') <{useMargin?: boolean}>`
    position: relative;
    display: inline-block;
    width: 100%;
    max-width: 220px;
    padding: 0 0 15px;
    margin: ${(props) => (props.useMargin ? '10px 5px' : '0 0 10px')};
    background: var(--color-white);
    border: 1px solid #eee;
    box-shadow: 0 1px 1px 1px rgba(0, 0, 0, .0);
    border-radius: 6px;
    text-decoration: none;
    transition: .25s ease;
    user-select: none;

    @media only screen and (max-width: 465px) {
        max-width: 47.5%;
    }

    &:hover {
        box-shadow: 0 3px 6px 1px rgba(0, 0, 0, .05);
        background: #f7f7f7;
        ${Thumbnail} > img {
            transform: scale(1.2) rotate(5deg);
        }
        @media only screen and (max-width: 768px) {
            ${Thumbnail} > img {
                transform: none;
            }
        }
    }
`;

const LinkWrapper = styled(Link)`
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 1;
`;

const Title = styled.p`
    position: relative;
    display: block;
    width: 100%;
    margin: 10px 0 0;
    padding: 0 10px;
    font-size: var(--font-small);
    font-weight: 400;
`;

const Price = styled(Title)`
    margin: 0;
    font-weight: 600;
`;

interface Props {
    id: string,
    title: string,
    price: any,
    slug: string,
    margin?: boolean
}

const ProductCard = (props: Props) => {
    const { id, title, price, slug, margin } = props;
    const [thumb, setThumb] = useState<any>({});

    const getProductThumbnail = async () => {
        const payload = {
            params: id
        };
        await API.fetchThumbnail(payload).then((res: any) => {
            setThumb(res.data[0]);
        });
    };

    useEffect(() => {
        getProductThumbnail();
    }, []);

    return (
        <Wrapper useMargin={margin}>
            <LinkWrapper to={`/product/${slug}`} />
            <Thumbnail>
                {thumb !== '' && (<img src={thumb.src} alt={thumb.name} />)}
                {thumb === '' && (<Shimmer height="245px" />)}
            </Thumbnail>
            <div>
                <Title>{title}</Title>
                <Price>{priceFormat(price)}</Price>
            </div>
        </Wrapper>
    );
};

ProductCard.defaultProps = {
    margin: true
};

export default ProductCard;
