import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import action from '../../configs/redux/action';
import Main from '../../layouts/Main';
import CatalogItem from './thisComponent/CatalogItem';

const CatalogWrapper = styled.div`
    position: relative;
    display: block;
    padding: 10px 0;
`;

const Catalog = (props: any) => {
    const { dispatch, items } = props;
    useEffect(() => {
        dispatch(action.fetchCatalog());
    }, []);

    return (
        <Main useHeader paddingTop backTo="/" title="Katalog" useNavigation activeMenu="catalog">
            <CatalogWrapper>
                {items.map((i: any, idx: any) => (
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
