import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Icon from '../Icon';
import Overlay from '../Overlay';
import { Text } from '../Styled';

const SheetWrapper = styled('div') <{ fullHeight?: boolean, visible?: boolean }>`
    position: fixed;
    width: 100%;
    max-width: 480px;
    height: ${(props) => (props.fullHeight ? '100%' : 'auto')};
    max-height: 95%;
    background: var(--color-white);
    padding: 0;
    left: 50%;
    bottom: -120%;
    border-radius: 12px 12px 0 0;
    transform: translateX(-50%);
    overflow-y: auto;
    transition: .25s ease;
    z-index: 100;

    ${(props) => (props.visible && `
        bottom: 0;
    `)}

    @media only screen and (max-width: 768px) {
        max-width: 100%;
    }
`;

const SheetHeader = styled.div`
    position: sticky;
    display: flex;
    width: 100%;
    height: auto;
    padding: 20px 1rem 10px;
    background: var(--color-white);
    border-bottom: 1px solid #eee;
    align-items: center;
    justify-content: space-between;
    top: 0;
    left: 0;
    z-index: 1;

    &::before {
        content: '';
        position: absolute;
        width: 50px;
        height: 5px;
        background: #eee;
        border-radius: 50px;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1;
    }
`;

const SheetBody = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: auto;
`;

const BaseBtn = styled.div`
    position: relative;
    display: flex;
    width: 30px;
    height: 30px;
    background: var(--color-white);
    padding: 4px;
    border-radius: 50px;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
        background: #eee;
    }
`;

const CloseBtn = styled(BaseBtn)`
    margin-right: 10px;
`;

const ActionBtn = styled(BaseBtn)`
    margin-left: 5px;
`;

const ActionTitle = styled.div`
    position: relative;
    display: flex;
    width: auto;
    height: 30px;
    background: var(--color-white);
    padding: 4px;
    border-radius: 4px;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
        background: #eee;
    }
`;

const ItemWrapper = styled.div`
    position: relative;
    display: flex;
    width: auto;
    align-items: center;
`;

interface Props {
    title: string,
    fullHeight?: boolean,
    actionBtn?: boolean,
    actionTitle?: string,
    actionIcon?: string,
    onActionClick?: () => void,
    children: any,
    // eslint-disable-next-line no-unused-vars
    handler: (visibility: boolean) => void
}

const BottomSheet = (props: Props) => {
    const { title, fullHeight, actionTitle, actionBtn, actionIcon, onActionClick, children, handler } = props;
    const [visible, setVisible] = useState(false);

    const hideBottomSheet = () => {
        setVisible(false);
        setTimeout(() => {
            handler(false);
        }, 250);
    };

    useEffect(() => {
        setTimeout(() => {
            setVisible(true);
        }, 250);
    }, []);

    return (
        <>
            <Overlay />
            <SheetWrapper visible={visible} fullHeight={fullHeight}>
                <SheetHeader>
                    <ItemWrapper>
                        <CloseBtn onClick={() => hideBottomSheet()}>
                            <Icon icon="x" />
                        </CloseBtn>
                        <Text bold>{title}</Text>
                    </ItemWrapper>
                    <ItemWrapper>
                        {actionTitle && (
                            <ActionTitle>
                                <Text bold onClick={onActionClick}>{actionTitle}</Text>
                            </ActionTitle>
                        )}
                        {actionBtn && (
                            <ActionBtn onClick={onActionClick}>
                                {actionIcon && (
                                    <Icon icon={actionIcon} />
                                )}
                            </ActionBtn>
                        )}
                    </ItemWrapper>
                </SheetHeader>
                <SheetBody>
                    {children}
                </SheetBody>
            </SheetWrapper>
        </>
    );
};

BottomSheet.defaultProps = {
    fullHeight: false,
    actionBtn: false,
    actionTitle: '',
    actionIcon: '',
    onActionClick: () => { }
};

export default BottomSheet;
