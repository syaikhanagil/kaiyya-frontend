import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ProductCard from '../../components/ProductCard';
import action from '../../configs/redux/action';
import Main from '../../layouts/Main';
import FilterDrawer from './thisComponent/FilterDrawer';

const ProductWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
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
`;

const StickyItem = styled.div`
    width: 100%;
    text-align: center;
    border-bottom: 1px solid #eee;
    padding: 10px 0;
    &:first-of-type {
        border-right: 1px solid #eee;
    }
`;
const ItemsWrapper = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    flex-derection: row;
    justify-content: space-between;
    padding: 10px 1rem;
    @media only screen and (max-width: 768px) {
        padding: 10px .5rem;
    }
`;

const Product = (props: any) => {
    const [filterDrawer, showFilterDrawer] = useState(false);
    const { dispatch, products } = props;
    const itemStart = 0;
    const itemShown = 4;
    const [lastIndex, setLastIndex] = useState(2);
    const [items, setItems] = useState([]);
    const [hasMoreItems, setHasMoreItems] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(action.fetchProduct());
    }, []);

    useMemo(() => {
        setItems(products.slice(itemStart, itemShown));
        setLastIndex(2);
    }, [products]);

    const loadMoreItems = (lastItem: number) => {
        setLoading(true);
        setTimeout(() => {
            if (items.length === products.length || items.length > products.length) {
                setHasMoreItems(false);
                setLoading(false);
                return;
            }
            const newLastIndex = items.length + lastItem;
            const newList = products.slice(items.length, newLastIndex);
            const newItem = items.concat(newList);
            setLastIndex(newLastIndex);
            setItems(newItem);
            setHasMoreItems(true);
            setLoading(false);
        }, 1500);
    };

    window.onscroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            if (hasMoreItems) {
                loadMoreItems(lastIndex);
            }
        }
    };

    return (
        <>
            <Helmet>
                <title>Produk | Kaiyya Dress</title>
            </Helmet>
            <Main useHeader paddingTop backTo="/" title="Produk" searchBtn>
                <>
                    <ProductWrapper>
                        <StickyWrapper>
                            <StickyItem onClick={() => showFilterDrawer(true)}>FILTER</StickyItem>
                            <StickyItem>CATEGORY</StickyItem>
                        </StickyWrapper>
                        <ItemsWrapper>
                            {items.map((i: any) => (
                                <ProductCard key={i.id} id={i.id} title={i.name} price={i.sizes[0].price} slug={i.slug} margin={false} />
                            ))}
                        </ItemsWrapper>
                    </ProductWrapper>
                    {filterDrawer && (
                        <FilterDrawer handler={(visibility: boolean) => showFilterDrawer(visibility)} />
                    )}
                    {loading && hasMoreItems && (
                        <p className="text-center">Loading...</p>
                    )}
                    {!hasMoreItems && (
                        <p className="text-center">Tidak ada data</p>
                    )}
                </>
            </Main>
        </>
    );
};

const mapStateToProps = (state: any) => {
    return {
        products: state.productReducer.items
    };
};

export default connect(mapStateToProps)(Product);
