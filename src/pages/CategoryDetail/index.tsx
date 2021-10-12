import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
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

const CategoryWrapper = styled.div`
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

const CategoryDetail = (props: any) => {
    const { dispatch, products, productByCategory } = props;
    const { slug } = useParams<any>();
    // const [filteredProduct, setFilteredProduct] = useState([]);
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

    // const filterProduct = () => {
    //     const filterItems = productByCategory.filter((item: any) => item.category.slug === slug);
    //     if (filterItems.length > 0) {
    //         setFilteredProduct(filterItems);
    //         return;
    //     }
    //     setFilteredProduct([]);
    // };

    // useEffect(() => {
    //     if (filteredProduct.length > 0) {
    //         console.log('oke');
    //     }
    // }, [filteredProduct]);

    // useEffect(() => {
    //     dispatch(action.fetchCategoryDetail(slug, productByCategory));
    // }, []);

    useEffect(() => {
        if (baseItems.length > 0) {
            setTimeout(() => {
                setLastIndex(8);
                setItems(baseItems.slice(itemStart, itemShown));
            }, 250);
        }
    }, [baseItems]);

    useEffect(() => {
        setBaseItems([]);
        setItems([]);
        dispatch(action.fetchCategoryDetail(slug, products));
        setCategoryDialog(false);
    }, [slug]);

    useEffect(() => {
        if (productByCategory.length > 0) {
            setTimeout(() => {
                setBaseItems(productByCategory);
            }, 250);
        }
    }, [productByCategory]);

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
        const sortItem = productByCategory.sort((first: any, last: any) => {
            return parseInt(first.sizes[0].price, 10) - parseInt(last.sizes[0].price, 10);
        });
        setBaseItems(sortItem);
        resetItems();
    };

    const onSortHighest = () => {
        window.scrollTo(0, 0);
        const sortItem = productByCategory.sort((first: any, last: any) => {
            return parseInt(last.sizes[0].price, 10) - parseInt(first.sizes[0].price, 10);
        });
        setBaseItems(sortItem);
        resetItems();
    };

    const onSortByName = () => {
        window.scrollTo(0, 0);
        const sortItem = productByCategory.sort((first: any, last: any) => {
            if (first.name.toLowerCase() > last.name.toLowerCase()) return 1;
            if (first.name.toLowerCase() < last.name.toLowerCase()) return -1;
            return 0;
        });
        setBaseItems(sortItem);
        resetItems();
    };

    const onSortNewest = () => {
        setBaseItems(productByCategory);
        resetItems();
    };

    return (
        <>
            <Helmet>
                <title>Kategori | Kaiyya Dress</title>
            </Helmet>
            <Main useHeader paddingTop backTo="/" title="Produk" searchBtn>
                <>
                    <CategoryWrapper>
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
                    </CategoryWrapper>
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
                        <CategorySheet activeCategory={slug} handler={(visibility: boolean) => setCategoryDialog(visibility)} />
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
        productByCategory: state.categoryReducer.detail,
        isReady: state.categoryReducer.isReady
    };
};

export default connect(mapStateToProps)(CategoryDetail);
