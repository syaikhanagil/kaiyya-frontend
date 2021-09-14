import React from 'react';
import styled from 'styled-components';
import Icon from '../Icon';

const CardWrapper = styled('div') <{ shadow?: boolean, rounded?: boolean, border?: boolean, margin?: boolean }>`
    position: relative;
    display: block;
    width: 100%;
    height: auto;
    padding: 10px 1rem;
    background: var(--color-white);
    margin: ${(props) => (props.margin ? '10px 0' : '0')};
    border-radius: ${(props) => (props.rounded ? '6px' : '0')};
    ${(props) => (props.shadow && 'box-shadow: 0 4px 8px 2px rgba(0, 0, 0, .05);')}
    ${(props) => (props.border && 'border: 1px solid #e0e0e0;')}
`;

const CardHeader = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    padding-bottom: 10px;
    margin-bottom: 10px;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid #eee;
    cursor: pointer;
`;

const ActionBtn = styled.div`
    position: relative;
    width: auto;
    cursor: pointer;
`;

interface Props {
    shadow?: boolean,
    rounded?: boolean,
    border?: boolean,
    header?: boolean,
    title?: string,
    action?: () => void,
    actionIcon?: string,
    margin?: boolean,
    children: any,
}

const Card = (props: Props) => {
    const { children, shadow, rounded, border, header, title, action, margin, actionIcon } = props;
    return (
        <CardWrapper shadow={shadow} rounded={rounded} border={border} margin={margin}>
            {header && (
                <CardHeader>
                    {title && (<span>{title}</span>)}
                    {actionIcon && (
                        <ActionBtn onClick={action}>
                            <Icon icon={actionIcon || 'chevron-right'} />
                        </ActionBtn>
                    )}
                </CardHeader>
            )}
            {children}
        </CardWrapper>
    );
};

Card.defaultProps = {
    shadow: false,
    rounded: false,
    border: false,
    header: false,
    title: '',
    action: () => { },
    actionIcon: '',
    margin: false
};

export default Card;
