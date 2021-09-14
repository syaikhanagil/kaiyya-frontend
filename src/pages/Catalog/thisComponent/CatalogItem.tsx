import React from 'react';
import styled from 'styled-components';

const ItemWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: auto;
    padding: 10px;
`;

interface Props {
    thumb: string,
    title: string
}

const CatalogItem = (props: Props) => {
    const { thumb, title } = props;
    return (
        <ItemWrapper>
            <img src={thumb} alt={title} />
            <span>{title}</span>
        </ItemWrapper>
    );
};

export default CatalogItem;
