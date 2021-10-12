import React from 'react';
import styled from 'styled-components';
import ProductShimmer from '../../components/ProductShimmer';
import Main from '../../layouts/Main';

const PreorderWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    padding: 0;
`;

const PreorderItems = styled.div`
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

const Preorder = () => {
    return (
        <Main useHeader title="Preorder" paddingTop>
            <PreorderWrapper>
                <PreorderItems>
                    <ProductShimmer />
                    <ProductShimmer />
                    <ProductShimmer />
                    <ProductShimmer />
                    <ProductShimmer />
                    <ProductShimmer />
                    <ProductShimmer />
                    <ProductShimmer />
                    <ProductShimmer />
                    <ProductShimmer />
                </PreorderItems>
            </PreorderWrapper>
        </Main>
    );
};

export default Preorder;
