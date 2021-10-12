import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import styled from 'styled-components';
import ProductCard from '../../components/ProductCard';
import API from '../../configs/api';
// import action from '../../configs/redux/action';
import Main from '../../layouts/Main';
// import CatalogItem from './thisComponent/CatalogItem';

const CatalogWrapper = styled.div`
    position: relative;
    display: block;
`;

const BannerWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: auto;
    min-height: 230px;
    user-select: none;

    img {
        width: 100%;
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

const CatalogDetail = () => {
    const { slug } = useParams<any>();
    const [detail, setDetail] = useState<any>({});
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const data = {
            params: `/${slug}`
        };
        API.fetchCatalogDetail(data).then((res: any) => {
            setDetail(res.data);
            setTimeout(() => {
                setReady(true);
            }, 1000);
        });
    }, []);

    return (
        <Main useHeader transparentHeader backBtn title={ready ? detail.name : 'Katalog'}>
            <CatalogWrapper>
                {ready && (
                    <>
                        <BannerWrapper>
                            <img src={detail.banner.src} alt={detail.banner.name} />
                        </BannerWrapper>
                        <ItemsWrapper>
                            {detail.products && detail.products.length > 0 && detail.products.map((i: any) => (
                                <ProductCard key={i.id} id={i.id} title={i.name} price={i.sizes[0].price} stock={i.stock} slug={i.slug} margin={false} />
                            ))}
                        </ItemsWrapper>
                    </>
                )}
            </CatalogWrapper>
        </Main>
    );
};

const mapStateToProps = (state: any) => {
    return {
        items: state.catalogReducer.items
    };
};

export default connect(mapStateToProps)(CatalogDetail);
