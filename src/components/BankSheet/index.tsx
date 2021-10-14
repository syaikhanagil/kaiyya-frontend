import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import action from '../../configs/redux/action';
import BottomSheet from '../BottomSheet';
import Loading from '../Loading';
import { Text } from '../Styled';

const BankItem = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: auto;
    padding: 5px 1rem;
    border-bottom: 1px solid #eee;
    cursor: pointer;

    &.disabled {
        background: #f0f0f0;
        cursor: not-allowed;
    }
`;

interface Props {
    // eslint-disable-next-line no-unused-vars
    onSelect: (data: any) => void,
    // eslint-disable-next-line no-unused-vars
    handler: (visibility: boolean) => void,
    dispatch: any,
    banks: any,
    isReady: boolean
}

const BankSheet = (props: Props) => {
    const { onSelect, handler, dispatch, banks, isReady } = props;

    useEffect(() => {
        dispatch(action.fetchAvailableBank());
    }, []);

    const handleSelect = (data: any) => {
        onSelect(data);
        setTimeout(() => {
            handler(false);
        }, 250);
    };

    return (
        <BottomSheet handler={handler} fullHeight title="Pilih Bank">
            {isReady && banks.length > 0 && banks.map((i: any, idx: any) => (
                // eslint-disable-next-line react/no-array-index-key
                <BankItem key={idx} onClick={() => handleSelect(i)}>
                    <Text block bold>{i.code.replaceAll('_', ' ')}</Text>
                    <Text block extraSmall>{i.name}</Text>
                </BankItem>
            ))}
            {!isReady && banks.length < 1 && (
                <Loading type="ring" alignCenter />
            )}
        </BottomSheet>
    );
};

const mapStateToProps = (state: any) => {
    return {
        banks: state.bankReducer.banks,
        isReady: state.bankReducer.isReady
    };
};

export default connect(mapStateToProps)(BankSheet);
