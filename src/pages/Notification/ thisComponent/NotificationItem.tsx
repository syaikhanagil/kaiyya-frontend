import React from 'react';
import styled from 'styled-components';
import { Text } from '../../../components/Styled';

const NotificationItemWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    padding: 10px 1rem;
    background: var(--color-white);
`;

interface Props {
    data: any
}

const NotificationItem = (props: Props) => {
    const { data } = props;
    return (
        <NotificationItemWrapper>
            <Text block bold extraSmall>{data.title}</Text>
            <Text block extraSmall>{data.message}</Text>
        </NotificationItemWrapper>
    );
};

export default NotificationItem;
