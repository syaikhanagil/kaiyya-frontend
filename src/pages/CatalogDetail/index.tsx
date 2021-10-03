import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import action from '../../configs/redux/action';
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

const CatalogDetail = (props: any) => {
    const { dispatch, items } = props;
    useEffect(() => {
        dispatch(action.fetchCatalog());
    }, []);

    return (
        <Main backTo="/" title="Katalog">
            <CatalogWrapper>
                <BannerWrapper>
                    <img src="https://etanee.id/static/media/salad_sayur.df18ccc9.jpg" alt="Oke" />
                </BannerWrapper>
                <CatalogHeading>
                    {items.map((i: any, idx: any) => {
                        // eslint-disable-next-line react/no-array-index-key
                        return <p key={idx}>{i.name}</p>;
                    })}
                </CatalogHeading>
                {/* <CatalogItem thumb="https://etanee.id/static/media/salad_sayur.df18ccc9.jpg" title="Oke" /> */}
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
