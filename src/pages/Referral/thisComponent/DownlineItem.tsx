import React from 'react';
import styled from 'styled-components';
import { Text } from '../../../components/Styled';

const DownlineItemWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: auto;
    padding: 5px 1rem;
    background: var(--color-white);
`;

interface Props {
    data: any
}

const DownlineItem = (props: Props) => {
    const { data } = props;
    return (
        <DownlineItemWrapper>
            <Text block bold marginY>{data.fullname}</Text>
        </DownlineItemWrapper>
    );
};

export default DownlineItem;
