import React from 'react';
import styled from 'styled-components';
import ProductShimmer from '../../components/ProductShimmer';
import Main from '../../layouts/Main';

const NewReleaseWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    padding: 0;
`;

const NewReleaseItems = styled.div`
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

const NewRelease = () => {
    return (
        <Main useHeader title="New Release" paddingTop>
            <NewReleaseWrapper>
                <NewReleaseItems>
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
                </NewReleaseItems>
            </NewReleaseWrapper>
        </Main>
    );
};

export default NewRelease;
