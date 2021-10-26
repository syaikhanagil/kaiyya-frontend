import React from 'react';
import styled from 'styled-components';
import { Text } from '../../../components/Styled';

const CardWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: auto;
    background: var(--color-white);
    padding: 10px 1rem;
    margin: 0 0 10px;
    border-radius: 4px;
    border: 1px solid #eee;
    box-shadow: 0 2px 3px 1px rgba(0, 0, 0, .02);
    cursor: pointer;

    .role {
        background: rgba(0, 0, 0, .1);
        padding: 1px 10px;
        border-radius: 50px;
        margin-left: 10px;
    }
`;

interface Props {
    data: any
}

const CardDownlineItem = (props: Props) => {
    const { data } = props;
    return (
        <CardWrapper>
            <Text bold>{data.name}</Text>
            <Text extraSmall>{data.role}</Text>
            <Text block extraSmall>{data.downline.length}</Text>
        </CardWrapper>
    );
};

export default CardDownlineItem;
