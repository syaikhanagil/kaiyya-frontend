import React from 'react';
import styled from 'styled-components';
import Main from '../../layouts/Main';
// import CatalogItem from './thisComponent/CatalogItem';

const CatalogWrapper = styled.div`
    position: relative;
    display: block;
`;

const CatalogHeading = styled.div`
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

const Catalog = () => {
    return (
        <Main backTo="/" title="Katalog">
            <CatalogWrapper>
                <BannerWrapper>
                    <img src="https://etanee.id/static/media/salad_sayur.df18ccc9.jpg" alt="Oke" />
                </BannerWrapper>
                <CatalogHeading>
                    <h3>Anaya Dress Series</h3>
                </CatalogHeading>
                {/* <CatalogItem thumb="https://etanee.id/static/media/salad_sayur.df18ccc9.jpg" title="Oke" /> */}
            </CatalogWrapper>
        </Main>
    );
};

export default Catalog;
