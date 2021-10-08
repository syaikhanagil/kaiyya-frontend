import React from 'react';
import styled from 'styled-components';
import { Text } from '../../../components/Styled';
import pushLocation from '../../../configs/routes/pushLocation';

const ItemWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: auto;
    flex-basis: 48%;
    background: var(--color-white);
    padding: 0;
    border-radius: 4px;
    margin-bottom: 10px;
    box-shadow: 0 4px 8px 2px rgba(0, 0, 0, .05);
    cursor: pointer;
`;

const Thumbnail = styled.div`
    position: relative;
    display: block;
    width: 100%;
    border-radius: 4px;

    img {
        width: 100%;
        border-radius: 4px;

    }
`;

const Description = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    padding: 10px 1rem;
`;

interface Props {
    data: any
}

const CatalogItem = (props: Props) => {
    const { data } = props;
    return (
        <ItemWrapper onClick={() => pushLocation.path(`/catalog/${data.slug}`)}>
            <Thumbnail>
                <img src={data.banner.src} alt={data.banner.name} />
            </Thumbnail>
            <Description>
                <Text bold block extraSmall>{data.name}</Text>
            </Description>
        </ItemWrapper>
    );
};

export default CatalogItem;
