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
    border-bottom: 1px solid #eee;
    cursor: pointer;
    
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
    data: any,
    // eslint-disable-next-line no-unused-vars
    onSelect: (payload: any) => void
}

const NotificationItem = (props: Props) => {
    const { data, onSelect } = props;
    return (
        <NotificationItemWrapper onClick={() => onSelect(data)} className={data.status}>
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
