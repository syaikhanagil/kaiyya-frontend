import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import styled from 'styled-components';
import ProductCard from '../../../components/ProductCard';
import ProductShimmer from '../../../components/ProductShimmer';
import action from '../../../configs/redux/action';

const RelatedProductWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: auto;
    padding: 10px 0;

    .title {
        position: relative;
        display: flex;
        margin: 10px 0;
        align-items: center;
        padding: 0 1rem;
        p {
            width: 100%;
            text-align: center;
            font-weight: 600;
            margin: 0;
        }
        div {
            position: relative;
            width: 100%;
            height: 2px;
            background: var(--transparent);
            border-bottom: 2px dashed var(--color-black);
        }
    }
`;

const RelatedItems = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 10px 1rem;
    justify-content: space-between;
`;

interface Props {
    categoryId: string,
    slug: string,
    products: any
}

const RelatedProduct = (props: Props) => {
    const { categoryId, slug, products } = props;
    const dispatch = useDispatch();
    const [items, setItems] = useState([]);

    const filterProduct = () => {
        const filterItems = products.filter((item: any) => item.slug !== slug);
        if (filterItems.length > 0) {
            console.log(filterItems[0].slug, categoryId);
            setItems(filterItems.slice(0, 6));
        }
    };

    useEffect(() => {
        dispatch(action.fetchProduct());
    }, []);

    useEffect(() => {
        if (products.length > 0) {
            setTimeout(() => {
                filterProduct();
            }, 250);
        }
    }, [products]);

    return (
        <RelatedProductWrapper>
            <div className="title">
                <div />
                <p>Produk Lainnya</p>
                <div />
            </div>
            <RelatedItems>
                {items.length > 0 && items.map((i: any, idx: any) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <ProductCard key={idx} id={i.id} title={i.name} price={i.sizes[0].price} slug={i.slug} stock={i.stock} margin={false} />
                ))}
                {items.length < 1 && (
                    <>
                        <ProductShimmer />
                        <ProductShimmer />
                        <ProductShimmer />
                        <ProductShimmer />
                        <ProductShimmer />
                        <ProductShimmer />
                    </>
                )}
            </RelatedItems>
        </RelatedProductWrapper>
    );
};

const mapStateToProps = (state: any) => {
    return {
        products: state.productReducer.items
    };
};

export default connect(mapStateToProps)(RelatedProduct);
