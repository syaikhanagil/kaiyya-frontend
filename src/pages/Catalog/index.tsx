import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import CatalogShimmer from '../../components/CatalogShimmer';
import action from '../../configs/redux/action';
import Main from '../../layouts/Main';
import CatalogItem from './thisComponent/CatalogItem';

const CatalogWrapper = styled.div`
    position: relative;
    display: flex;
    padding: 10px 1rem;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
`;

const Catalog = (props: any) => {
    const { dispatch, items } = props;
    const [ready, setReady] = useState(false);

    useEffect(() => {
        dispatch(action.fetchCatalog());
    }, []);

    useEffect(() => {
        if (items.length > 0) {
            setTimeout(() => {
                setReady(true);
            }, 1000);
        }
    }, [items]);

    return (
        <Main useHeader paddingTop backTo="/" title="Katalog" useNavigation paddingBottom activeMenu="catalog">
            <CatalogWrapper>
                {!ready && (
                    <>
                        <CatalogShimmer />
                        <CatalogShimmer />
                        <CatalogShimmer />
                        <CatalogShimmer />
                        <CatalogShimmer />
                        <CatalogShimmer />
                        <CatalogShimmer />
                    </>
                )}
                {ready && items.length > 0 && items.map((i: any, idx: any) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <CatalogItem key={idx} data={i} />
                ))}
            </CatalogWrapper>
        </Main>
    );
};

const mapStateToProps = (state: any) => {
    return {
        items: state.catalogReducer.items
    };
};

export default connect(mapStateToProps)(Catalog);
