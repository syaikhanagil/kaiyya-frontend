import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import Main from '../../layouts/Main';
import Banner from './thisComponent/Banner';
import ProductCard from '../../components/ProductCard';
import ProductShimmer from '../../components/ProductShimmer';
import Shimmer from '../../components/Shimmer';
import API from '../../configs/api';
import HeaderHome from '../../components/HeaderHome';
import Menu from './thisComponent/Menu';
import action from '../../configs/redux/action';
import ShareEducation from './thisComponent/ShareEducation';
import { Text } from '../../components/Styled';
import Icon from '../../components/Icon';
import tiktokIcon from '../../assets/svg/tiktok.svg';

const FeaturedWrapper = styled.section`
    position: relative;
    display: block;
    width: 100%;
    height: auto;
    background: var(--color-white);
    margin-top: 10px;
`;

const FeaturedHeader = styled.div <{ flex?: boolean }>`
    position: relative;
    display: ${(props) => (props.flex ? 'flex' : 'block')};
    width: 100%;
    padding: 10px 1rem 5px;
    ${(props) => (props.flex && `
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    `)}

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
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    flex-derection: row;
    justify-content: space-between;
    padding: 10px 1rem;
    @media only screen and (max-width: 768px) {
        padding: 10px .5rem;
    }
    .scroll-container {
        position: relative;
        overflow: hidden;
        padding: 0 1rem;
        white-space: nowrap;
        overflow: hidden;
    }
`;

const JoinMitraWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    margin: 10px 0;
    background: var(--color-white);
    padding: 15px 1rem;

    a {
        display: block;
        font-weight: 600;
        font-size: var(--font-small);
        color: var(--primary);
        text-decoration: none;
        margin: 10px 0 0;
    }
`;

const SocialMediaWrapper = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`;

const SocialMediaItem = styled.a`
    position: relative;
    display: block;
    width: 100%;
    height: auto;
    flex-basis: 48%;
    padding: 7px 10px;
    margin: 0 1% 5px;
    border: 1px solid #eee;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;

    &:hover {
        border: 1px solid var(--primary);
    }
    .feather {
        margin-right: 10px;
    }
    #icon-img {
        height: 20px;
        margin-right: 10px;
    }
`;

interface Props {
    dispatch: any,
    loggedIn: boolean,
    role: string
}

const Home = (props: Props) => {
    const { dispatch, loggedIn, role } = props;
    const [products, setProducts] = useState([]);
    const [productReady, setProductReady] = useState(false);
    // const [loadCategories, setLoadCategories] = useState(false);
    // const [categories, setCategories] = useState([]);
    // const [categoriesReady, setCategoriesReady] = useState(false);
    // const [activeCategory, setActiveCategory] = useState('');

    const fetchProduct = async () => {
        await API.fetchFeaturedProduct().then((res: any) => {
            setProducts(res.data);
            setTimeout(() => {
                setProductReady(true);
            }, 1000);
        });
    };

    useEffect(() => {
        fetchProduct();
        dispatch(action.fetchAccountDetail());
        Cookies.remove('checkout-items');
    }, []);

    // const getFeaturedProduct = () => {

    // };

    return (
        <>
            <Helmet>
                <title>Kaiyya Dress</title>
                <meta property="og:title" content="Kaiyya Dress" />
                <meta name="og:site_name" content="Kaiyya Dress" />
                <meta name="description" content="Kaiyya Dress - Busana muslim modern dan stylish." />
                <meta property="og:type" content="website" />
            </Helmet>
            <Main paddingTop useNavigation paddingBottom activeMenu="home">
                <HeaderHome />
                <Banner />
                <Menu />
                {!loggedIn && (
                    <JoinMitraWrapper>
                        <Text block bold>Join Mitra Kaiyya</Text>
                        <Text block extraSmall>Berikan edukasi yang bermanfaat kepada mitra anda, dan dapatkan penghasilan tambahan.</Text>
                        <a href="/join-mitra">Join sekarang</a>
                    </JoinMitraWrapper>
                )}
                {loggedIn && role !== '' && role !== 'retail' && (
                    <ShareEducation />
                )}
                <FeaturedWrapper id="featured-product">
                    {productReady && (
                        <>
                            <FeaturedHeader flex>
                                <div>
                                    <p>Produk Unggulan</p>
                                    <span>Produk populer by Kaiyya Dress</span>
                                </div>
                                <Link to="/product">Lihat semua</Link>
                            </FeaturedHeader>
                            <FeaturedBody>
                                {products.map((i: any) => (
                                    // eslint-disable-next-line no-underscore-dangle
                                    <ProductCard key={i.id} id={i.id} title={i.name} price={i.sizes[0].price} slug={i.slug} stock={i.stock} margin={false} />
                                ))}
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
                                <ProductShimmer />
                                <ProductShimmer />
                                <ProductShimmer />
                                <ProductShimmer />
                            </FeaturedBody>
                        </>
                    )}
                </FeaturedWrapper>

                <FeaturedWrapper>
                    <FeaturedHeader>
                        <div style={{ textAlign: 'center' }}>
                            <Text bold block alignCenter>Sosial Media</Text>
                            <span>Follow sosial media Kaiyya</span>
                        </div>
                    </FeaturedHeader>
                    <FeaturedBody>
                        <SocialMediaWrapper>
                            <SocialMediaItem target="_blank" href="https://www.instagram.com/kaiyyaofficial/" rel="noopener noreferrer">
                                <Icon icon="instagram" />
                                <Text>Instagram</Text>
                            </SocialMediaItem>
                            <SocialMediaItem target="_blank" href="https://www.facebook.com/Kaiyya-105215328056641/" rel="noopener noreferrer">
                                <Icon icon="facebook" />
                                <Text>Facebook</Text>
                            </SocialMediaItem>
                            <SocialMediaItem target="_blank" href="https://www.tiktok.com/@kaiyyaofficial?utm_medium=social&utm_source=Kaiyya&utm_campaign=tiktok" rel="noopener noreferrer">
                                <Icon custom icon={tiktokIcon} />
                                <Text>Tiktok</Text>
                            </SocialMediaItem>
                            <SocialMediaItem target="_blank" href="https://www.instagram.com/kaiyyaofficial/" rel="noopener noreferrer">
                                <Icon icon="youtube" />
                                <Text>Youtube</Text>
                            </SocialMediaItem>
                        </SocialMediaWrapper>
                    </FeaturedBody>
                </FeaturedWrapper>
            </Main>
        </>
    );
};

const mapStateToProps = (state: any) => {
    return {
        loggedIn: state.authReducer.loggedIn,
        role: state.accountReducer.role
    };
};

export default connect(mapStateToProps)(Home);
