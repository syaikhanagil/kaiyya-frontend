import React from 'react';
import styled from 'styled-components';

const MitraItemWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: auto;
    background: var(--color-white);
    padding: 5px 10px;
    border-radius: 4px;
`;

const MitraItem = () => {
    return (
        <MitraItemWrapper>
            Mitra
        </MitraItemWrapper>
    );
};

export default MitraItem;
