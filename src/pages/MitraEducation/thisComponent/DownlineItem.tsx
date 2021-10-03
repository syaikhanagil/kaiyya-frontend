import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Icon from '../../../components/Icon';
import { Text } from '../../../components/Styled';
import API from '../../../configs/api';

const DownlineWrapper = styled.div<{ margin?: boolean, padding?: boolean }>`
    position: relative;
    display: block;
    width: 100%;
    height: auto;
    padding: ${(props) => (props.padding ? '5px .5rem' : '5px 0 5px 10px')};
    background: var(--color-white);
    margin: ${(props) => (props.margin ? '0 0 5px' : '0')};
    overflow: hidden;
    transition: height .3s ease;
    user-select: none;
    cursor: pointer;
`;

const DownlineItemWrapper = styled.div <{ border?: boolean }>`
    position: relative;
    display: flex;
    width: 100%;
    padding: 0 .5rem;
    justify-content: space-between;
    align-items: center;
    border-left: ${(props) => (props.border ? '2px dashed var(--primary)' : '2px solid var(--transparent)')};

    &.active > .feather {
        transform: rotate(180deg);
    }
`;

const SubDownlineWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: 0;
    padding: 0;
    background: var(--color-white);
    visibility: hidden;
    &.active {
        height: 100%;
        visibility: visible;
    }
`;

interface Props {
    data: any
}

const DownlineItem = (props: Props) => {
    const { data } = props;
    const [downline, setDownline] = useState<any>([]);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        const payload = {
            params: `/${data.username}`
        };
        API.fetchReferralDownline(payload).then((res: any) => {
            setDownline(res.data);
        });
    }, []);

    return (
        <DownlineWrapper margin padding>
            <DownlineItemWrapper className={expanded ? 'active' : ''} onClick={() => setExpanded(!expanded)}>
                <Text block bold marginY>{data.fullname}</Text>
                {downline.length > 0 && (
                    <Icon icon="chevron-down" />
                )}
            </DownlineItemWrapper>
            {downline.length > 0 && downline.map((i: any, idx: any) => (
                // eslint-disable-next-line react/no-array-index-key
                <SubDownlineWrapper key={idx} className={expanded ? 'active' : ''}>
                    <SecondDownline data={i} />
                </SubDownlineWrapper>
            ))}
        </DownlineWrapper>
    );
};

const SecondDownline = (props: Props) => {
    const { data } = props;
    const [downline, setDownline] = useState<any>([]);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        const payload = {
            params: `/${data.username}`
        };
        API.fetchReferralDownline(payload).then((res: any) => {
            setDownline(res.data);
        });
    }, []);

    return (
        <DownlineWrapper>
            <DownlineItemWrapper border className={expanded ? 'active' : ''} onClick={() => setExpanded(!expanded)}>
                <Text block bold marginY>{data.fullname}</Text>
                {downline.length > 0 && (
                    <Icon icon="chevron-down" />
                )}
            </DownlineItemWrapper>
            {downline.length > 0 && downline.map((i: any, idx: any) => (
                // eslint-disable-next-line react/no-array-index-key
                <SubDownlineWrapper key={idx} className={expanded ? 'active' : ''}>
                    <ThirdDownline data={i} />
                </SubDownlineWrapper>
            ))}
        </DownlineWrapper>
    );
};

const ThirdDownline = (props: Props) => {
    const { data } = props;
    return (
        <DownlineWrapper style={{ padding: '5px 0 5px 1rem' }}>
            <DownlineItemWrapper border>
                <Text block bold marginY>{data.fullname}</Text>
            </DownlineItemWrapper>
        </DownlineWrapper>
    );
};

export default DownlineItem;
