import React from 'react';
import styled from 'styled-components';
import { Text } from '../../../components/Styled';

const CardWrapper = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: auto;
    background: var(--color-white);
    padding: 10px 1rem;
    margin: 0 0 10px;
    align-items: center;
    cursor: pointer;
    
    div {
        position: relative;
        width: 100%;
    }
`;

interface Props {
    totalMitra: number,
    totalAllMitra: number
}

const CardDownlineItem = (props: Props) => {
    const { totalMitra, totalAllMitra } = props;
    return (
        <CardWrapper>
            <div>
                <Text bold block alignCenter>Total Mitra</Text>
                <Text bold block extraSmall alignCenter>{totalMitra}</Text>
            </div>
            <div>
                <Text bold block alignCenter>Total Semua Mitra</Text>
                <Text bold block extraSmall alignCenter>{totalAllMitra}</Text>
            </div>
        </CardWrapper>
    );
};

export default CardDownlineItem;
