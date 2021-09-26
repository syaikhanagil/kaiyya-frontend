import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import styled from 'styled-components';
// import Icon from '../../components/Icon';
import ProductCard from '../../components/ProductCard';
import ProductShimmer from '../../components/ProductShimmer';
import action from '../../configs/redux/action';
import Main from '../../layouts/Main';

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
    padding: 10px 0;
    border-bottom: 2px solid #eee;
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
    text-transform: uppercase;
    cursor: pointer;
    &.active {
        border-bottom: 2px solid var(--primary);
    }
    &:first-of-type {
        border-left: none;
    }
    &:last-of-type {
        border-right: none;
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
    const { dispatch, products } = props;
    const [baseItem, setBaseItem] = useState([]);
    const itemStart = 0;
    const itemShown = 4;
    const [lastIndex, setLastIndex] = useState(2);
    const [items, setItems] = useState([]);
    const [hasMoreItems, setHasMoreItems] = useState(true);
    const [loading, setLoading] = useState(false);
    const [sortActive, setSortActive] = useState('');

    useEffect(() => {
        dispatch(action.fetchProduct());
    }, []);

    useEffect(() => {
        setItems(baseItem.slice(itemStart, itemShown));
        setLastIndex(2);
    }, [baseItem]);

    useEffect(() => {
        if (products.length > 0) {
            setSortActive('newest');
            setBaseItem(products);
        }
    }, [products]);

    const loadMoreItems = (lastItem: number) => {
        setLoading(true);
        setTimeout(() => {
            if (items.length === baseItem.length || items.length > baseItem.length) {
                setHasMoreItems(false);
                setLoading(false);
                return;
            }
            const newLastIndex = items.length + lastItem;
            const newList = baseItem.slice(items.length, newLastIndex);
            const newItem = items.concat(newList);
            setLastIndex(newLastIndex);
            setItems(newItem);
            setHasMoreItems(true);
            setLoading(false);
        }, 1500);
    };

    const resetItems = () => {
        setItems([]);
        setLastIndex(2);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setItems(baseItem.slice(itemStart, itemShown));
            setLastIndex(2);
        }, 1200);
    };

    const onSortLowest = () => {
        if (sortActive !== 'lowest') {
            const sortItem = products.sort((first: any, last: any) => {
                return parseInt(first.sizes[0].price, 10) - parseInt(last.sizes[0].price, 10);
            });
            setBaseItem(sortItem);
            setSortActive('lowest');
            resetItems();
        }
    };

    const onSortHighest = () => {
        if (sortActive !== 'highest') {
            const sortItem = products.sort((first: any, last: any) => {
                return parseInt(last.sizes[0].price, 10) - parseInt(first.sizes[0].price, 10);
            });
            setBaseItem(sortItem);
            setSortActive('highest');
            resetItems();
        }
    };

    const onSortNewest = () => {
        if (sortActive !== 'newest') {
            setBaseItem(products);
            setSortActive('newest');
            resetItems();
        }
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
                            <StickyItem className={sortActive === 'newest' ? 'active' : ''} onClick={() => onSortNewest()}>Terbaru</StickyItem>
                            <StickyItem className={sortActive === 'lowest' ? 'active' : ''} onClick={() => onSortLowest()}>Harga Terendah</StickyItem>
                            <StickyItem className={sortActive === 'highest' ? 'active' : ''} onClick={() => onSortHighest()}>Harga Teringgi</StickyItem>
                        </StickyWrapper>
                        <ItemsWrapper>
                            {items.map((i: any) => (
                                <ProductCard key={i.id} id={i.id} title={i.name} price={i.sizes[0].price} slug={i.slug} margin={false} />
                            ))}
                            {loading && (
                                <>
                                    <ProductShimmer />
                                    <ProductShimmer />
                                </>
                            )}
                        </ItemsWrapper>
                    </ProductWrapper>
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
