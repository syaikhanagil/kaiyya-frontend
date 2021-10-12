import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import styled from 'styled-components';
import CategorySheet from '../../components/CategorySheet';
import Icon from '../../components/Icon';
import Loading from '../../components/Loading';
// import Icon from '../../components/Icon';
import ProductCard from '../../components/ProductCard';
import ProductShimmer from '../../components/ProductShimmer';
import SortProductSheet from '../../components/SortProductSheet';
import { Button, Text } from '../../components/Styled';
import action from '../../configs/redux/action';
import Main from '../../layouts/Main';

const ProductWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
`;

const FloatingWrapper = styled.div`
    position: sticky;
    display: flex;
    width: 100%;
    height: auto;
    background: var(--color-white);
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    top: 46px;
    z-index: 10;
`;

const FloatingItem = styled.div`
    width: 100%;
    text-align: center;
    padding: 10px 0;
    border-bottom: 2px solid #eee;
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
    text-transform: uppercase;
    cursor: pointer;
    .feather {
        margin-top: -2px;
        margin-right: 5px;
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

const FooterWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: auto;
    text-align: center;
    padding: 10px 0 20px;
`;

const Product = (props: any) => {
    const { dispatch, products } = props;
    const [baseItems, setBaseItems] = useState([]);
    const [categoryDialog, setCategoryDialog] = useState(false);
    const [sortDialog, setSortDialog] = useState(false);
    const itemStart = 0;
    const itemShown = 8;
    const [lastIndex, setLastIndex] = useState(8);
    const [items, setItems] = useState([]);
    const [hasMoreItems, setHasMoreItems] = useState(true);
    const [loading, setLoading] = useState(false);
    const [activeSort, setActiveSort] = useState('');

    useEffect(() => {
        dispatch(action.fetchProduct());
    }, []);

    useEffect(() => {
        setLastIndex(6);
        setItems(baseItems.slice(itemStart, itemShown));
    }, [baseItems]);

    useEffect(() => {
        if (products.length > 0) {
            setTimeout(() => {
                setBaseItems(products);
            }, 250);
        }
    }, [products]);

    useEffect(() => {
        if (activeSort === 'newest') {
            onSortNewest();
        }
        if (activeSort === 'lowest') {
            onSortLowest();
        }
        if (activeSort === 'highest') {
            onSortHighest();
        }
        if (activeSort === 'name') {
            onSortByName();
        }
    }, [activeSort]);

    const loadMoreItems = (lastItem: number) => {
        setLoading(true);
        setTimeout(() => {
            if (items.length === baseItems.length || items.length > baseItems.length) {
                setHasMoreItems(false);
                setLoading(false);
                return;
            }
            const newLastIndex = items.length + lastItem;
            const newList = baseItems.slice(items.length, newLastIndex);
            const newItem = items.concat(newList);
            setLastIndex(newLastIndex);
            setItems(newItem);
            setHasMoreItems(true);
            setTimeout(() => {
                setLoading(false);
            }, 250);
        }, 1500);
    };

    const resetItems = () => {
        setItems([]);
        setLoading(true);
        setLastIndex(8);
        setHasMoreItems(true);
        setTimeout(() => {
            setLoading(false);
            setItems(baseItems.slice(itemStart, itemShown));
        }, 1000);
    };

    const onSortLowest = () => {
        window.scrollTo(0, 0);
        const sortItem = baseItems.sort((first: any, last: any) => {
            return parseInt(first.sizes[0].price, 10) - parseInt(last.sizes[0].price, 10);
        });
        setBaseItems(sortItem);
        resetItems();
    };

    const onSortHighest = () => {
        window.scrollTo(0, 0);
        const sortItem = products.sort((first: any, last: any) => {
            return parseInt(last.sizes[0].price, 10) - parseInt(first.sizes[0].price, 10);
        });
        setBaseItems(sortItem);
        resetItems();
    };

    const onSortByName = () => {
        window.scrollTo(0, 0);
        const sortItem = products.sort((first: any, last: any) => {
            if (first.name.toLowerCase() > last.name.toLowerCase()) return 1;
            if (first.name.toLowerCase() < last.name.toLowerCase()) return -1;
            return 0;
        });
        setBaseItems(sortItem);
        resetItems();
    };

    const onSortNewest = () => {
        setBaseItems(products);
        resetItems();
    };

    return (
        <>
            <Helmet>
                <title>Produk | Kaiyya Dress</title>
            </Helmet>
            <Main useHeader paddingTop backTo="/" title="Produk" searchBtn>
                <>
                    <ProductWrapper>
                        <FloatingWrapper>
                            <FloatingItem onClick={() => setCategoryDialog(true)}>
                                <Icon icon="grid" />
                                Kategori
                            </FloatingItem>
                            <FloatingItem onClick={() => setSortDialog(true)}>
                                <Icon icon="chevrons-down" />
                                Urutkan
                            </FloatingItem>
                        </FloatingWrapper>
                        <ItemsWrapper id="product-list">
                            {items.length > 0 && items.map((i: any, idx: any) => (
                                // eslint-disable-next-line react/no-array-index-key
                                <ProductCard key={idx} id={i.id} title={i.name} price={i.sizes[0].price} slug={i.slug} stock={i.stock} margin={false} type={i.type} />
                            ))}
                            {items.length < 1 && loading && (
                                <>
                                    <ProductShimmer />
                                    <ProductShimmer />
                                    <ProductShimmer />
                                    <ProductShimmer />
                                </>
                            )}
                        </ItemsWrapper>
                    </ProductWrapper>
                    <FooterWrapper>
                        {!loading && hasMoreItems && (
                            <Button block primary alignCenter onClick={() => loadMoreItems(lastIndex)}>Tampilkan Lebih Banyak</Button>
                        )}
                        {loading && hasMoreItems && (
                            <>
                                <Loading type="ring" />
                            </>
                        )}
                        {!hasMoreItems && (
                            <Text block alignCenter marginY>Tidak ada data</Text>
                        )}
                    </FooterWrapper>
                    {categoryDialog && (
                        <CategorySheet activeCategory="" handler={(visibility: boolean) => setCategoryDialog(visibility)} />
                    )}
                    {sortDialog && (
                        <SortProductSheet activeSort={activeSort} handler={(visibility: boolean) => setSortDialog(visibility)} onSubmit={(sort: string) => setActiveSort(sort)} />
                    )}
                </>
            </Main>
        </>
    );
};

const mapStateToProps = (state: any) => {
    return {
        products: state.productReducer.items,
        isReady: state.productReducer.isReady
    };
};

export default connect(mapStateToProps)(Product);
