import React from 'react';
import styled from 'styled-components';

const SearchWrapper = styled.div`
    position: fixed;
    display: block;
    width: 100%;
    max-width: 480px;
    height: 100%;
    background: var(--color-white);
    top: 0;
    left: 50%;
    transform: transalateX(-50%);
    z-index: 100;

    @media only screen and (max-width: 768px) {
        max-width: 100%;
    }
`;

const SearchDialog = () => {
    return (
        <SearchWrapper>
            OKe
        </SearchWrapper>
    );
};

export default SearchDialog;
