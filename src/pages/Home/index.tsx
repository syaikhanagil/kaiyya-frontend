import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ScrollContainer from 'react-indiana-drag-scroll';
import Main from '../../layouts/Main';
import Banner from './thisComponent/Banner';
import ProductCard from '../../components/ProductCard';
import ProductShimmer from '../../components/ProductShimmer';
import JoinMitra from './thisComponent/JoinMitra';
import Shimmer from '../../components/Shimmer';
import Icon from '../../components/Icon';
import API from '../../configs/api';
import HeaderHome from '../../components/HeaderHome';
// import Menu from './thisComponent/Menu';

const FeaturedWrapper = styled.section`
    position: relative;
    display: block;
    width: 100%;
    height: auto;
    background: var(--color-white);
    margin-top: 10px;
`;

const FeaturedHeader = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    padding: 10px 1rem 5px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    p, span, a {
        position: relative;
        display: block;
        width: auto;
        padding: 0;
        text-decoration: none;
        color: var(--color-black);
        user-select: none;
    }

    p {
        font-size: var(--font-small);
        font-weight: 600;
    }

    span {
        font-size: var(--font-extra-small);
        font-weight: 400;
    }

    a {
        color: var(--primary);
        font-size: var(--font-small);
        font-weight: 600;
        cursor: pointer;
    }
`;

const FeaturedBody = styled.div`
    position: relative;
    display: block;
    .scroll-container {
        position: relative;
        overflow: hidden;
        padding: 0 1rem;
        white-space: nowrap;
        overflow: hidden;
    }
`;

const FloatingWrapper = styled.div`
    position: sticky;
    display: block;
    width: 100%;
    height: 100%;
    background: var(--color-white);
    padding: 10px 0;
    top: 46px;
    left: 0;
    white-space: nowrap;
    overflow: hidden;
    border-bottom: 1px solid #eee;
    z-index: 10;

    .scroll-container {
        position: relative;
        display: flex;
        overflow: hidden;
        padding: 0 1rem;
        align-items: center;
    }
`;

const CategoryItem = styled('div') <{ active?: boolean }>`
    position: relative;
    display: inline-block;
    height: auto;
    width: auto;
    min-width: 120px;
    padding: 6px 10px;
    background: #eee;
    margin: 0 5px;
    border: ${(props) => (props.active ? '1px solid var(--primary)' : '1px solid var(--transparent)')};
    border-radius: 4px;
    user-select: none;
    cursor: pointer;

    .feather {
        fill: var(--primary);
        color: var(--primary-dark);
    }

    &:first-of-type {
        min-width: unset;
        margin-left: 0;
        padding: 5px;
    }
    &:last-of-type {
        margin-right: 0;
    }

`;

const Home = () => {
    const [products, setProducts] = useState([]);
    const [productReady, setProductReady] = useState(false);
    const [loadCategories, setLoadCategories] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoriesReady, setCategoriesReady] = useState(false);
    const [activeCategory, setActiveCategory] = useState('');

    const fetchProduct = async () => {
        const payload = {
            params: 'featured=true'
        };
        await API.fetchProductFeatured(payload).then((res: any) => {
            setProducts(res.data);
            setTimeout(() => {
                setProductReady(true);
            }, 1000);
        });
    };

    const fetchCategory = async () => {
        setLoadCategories(true);
        await API.fetchCategory().then((res: any) => {
            setCategories(res.data);
            setActiveCategory(res.data[0].id);
            setTimeout(() => {
                setCategoriesReady(true);
                setLoadCategories(false);
            }, 2000);
        });
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    window.onscroll = () => {
        // const featuredProduct = document.getElementById('featured-product')?.offsetHeight || 0;
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            if (!categoriesReady && productReady) {
                fetchCategory();
            }
        }
    };

    return (
        <>
            <Helmet>
                <title>Kaiyya Dress</title>
                <meta property="og:title" content="Kaiyya Dress" />
                <meta name="og:site_name" content="Kaiyya Dress" />
                <meta name="description" content="Kaiyya Dress - Busana muslim modern dan stylish." />
                <meta property="og:type" content="website" />
            </Helmet>
            <Main useNavigation paddingBottom activeMenu="home">
                <HeaderHome />
                <Banner />
                {/* <Menu /> */}
                <FeaturedWrapper id="featured-product">
                    {productReady && (
                        <>
                            <FeaturedHeader>
                                <div>
                                    <p>Produk Unggulan</p>
                                    <span>Produk populer by Kaiyya Dress</span>
                                </div>
                                <Link to="/product">Lihat semua</Link>
                            </FeaturedHeader>
                            <FeaturedBody>
                                <ScrollContainer hideScrollbars={false} className="scroll-container">
                                    {products.map((i: any) => (
                                        // eslint-disable-next-line no-underscore-dangle
                                        <ProductCard key={i.id} id={i.id} title={i.name} price={i.sizes[0].price} slug={i.slug} />
                                    ))}
                                </ScrollContainer>
                            </FeaturedBody>
                        </>
                    )}
                    {!productReady && (
                        <>
                            <FeaturedHeader>
                                <div>
                                    <Shimmer height="10px" width="100px" />
                                </div>
                                <div>
                                    <Shimmer height="10px" width="100px" />
                                </div>
                            </FeaturedHeader>
                            <FeaturedBody>
                                <ScrollContainer hideScrollbars={false} className="scroll-container">
                                    <ProductShimmer />
                                    <ProductShimmer />
                                    <ProductShimmer />
                                </ScrollContainer>
                            </FeaturedBody>
                        </>
                    )}
                </FeaturedWrapper>
                <JoinMitra />
                <FeaturedWrapper>
                    {categoriesReady && (
                        <>
                            <FeaturedHeader>
                                <div>
                                    <p>Kategory Unggulan</p>
                                    <span>Produk populer by Kaiyya Dress</span>
                                </div>
                                <Link to="/category">Lihat semua</Link>
                            </FeaturedHeader>
                            <FloatingWrapper>
                                <ScrollContainer className="scroll-container">
                                    <CategoryItem>
                                        <Icon icon="bookmark" />
                                    </CategoryItem>
                                    {categories.map((i: any, idx: any) => (
                                        // eslint-disable-next-line react/no-array-index-key
                                        <CategoryItem key={idx} active={i.id === activeCategory} onClick={() => setActiveCategory(i.id)}>
                                            {i.name}
                                        </CategoryItem>
                                    ))}
                                </ScrollContainer>
                            </FloatingWrapper>
                            <FeaturedBody>
                                <ProductShimmer />
                                <ProductShimmer />
                                <ProductShimmer />
                                <ProductShimmer />
                            </FeaturedBody>
                        </>
                    )}
                    {loadCategories && (
                        <>
                            <FeaturedHeader>
                                <div>
                                    <Shimmer height="10px" width="100px" />
                                </div>
                                <div>
                                    <Shimmer height="10px" width="100px" />
                                </div>
                            </FeaturedHeader>
                            <FloatingWrapper>
                                <ScrollContainer className="scroll-container">
                                    <CategoryItem>
                                        <Icon icon="bookmark" />
                                    </CategoryItem>
                                    <CategoryItem />
                                    <CategoryItem />
                                    <CategoryItem />
                                    <CategoryItem />
                                    <CategoryItem />
                                    <CategoryItem />
                                    <CategoryItem />
                                    <CategoryItem />
                                    <CategoryItem />
                                </ScrollContainer>
                            </FloatingWrapper>
                            <FeaturedBody>
                                <ProductShimmer />
                                <ProductShimmer />
                            </FeaturedBody>
                        </>
                    )}
                </FeaturedWrapper>
            </Main>
        </>
    );
};

export default Home;
