import React from 'react';
import styled from 'styled-components';
import Shimmer from '../Shimmer';

const ProductShimmerWrapper = styled.div`
    position: relative;
    display: inline-block;
    width: 100%;
    max-width: 220px;
    padding: 0 0 15px;
    margin: 0 0 10px;
    background: var(--color-white);
    border: 1px solid #eee;
    box-shadow: 0 1px 1px 1px rgba(0, 0, 0, .0);
    border-radius: 6px;
    .thumb {
        height: auto;
    }
    .info {
        width: 100%;
        margin-top: 10px;
        padding: 0 10px;
    }
    @media only screen and (max-width: 465px) {
        max-width: 47.5%;
    }
`;

const ProductShimmer = () => {
    return (
        <ProductShimmerWrapper>
            <div className="thumb">
                <Shimmer height="220px" rounded />
            </div>
            <div className="info">
                <Shimmer height="15px" width="100px" />
                <Shimmer height="15px" width="100px" />
            </div>
        </ProductShimmerWrapper>
    );
};

export default ProductShimmer;
