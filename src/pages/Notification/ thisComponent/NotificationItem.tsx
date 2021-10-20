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
    
    &.unread > p#title {
        color: var(--primary);
    }
    p#message {
        color: #777;
    }
    #indicator {
        position: relative;
        height: 10px;
        width: 10px;
        border-radius: 50px;
    }
`;

interface Props {
    data: any
}

const NotificationItem = (props: Props) => {
    const { data } = props;
    return (
        <NotificationItemWrapper className={data.status}>
            <Text block bold extraSmall id="title">
                {data.title}
                {data.status === 'unread' && (
                    <div id="indicator" />
                )}
            </Text>
            <Text block extraSmall id="message">{data.message}</Text>
        </NotificationItemWrapper>
    );
};

export default NotificationItem;
