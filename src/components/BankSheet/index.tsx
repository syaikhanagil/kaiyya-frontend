import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import action from '../../configs/redux/action';
import BottomSheet from '../BottomSheet';
import { Text } from '../Styled';

const BankAccountItem = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: auto;
`;

interface Props {
    // eslint-disable-next-line no-unused-vars
    onSubmit: (data: any) => void,
    // eslint-disable-next-line no-unused-vars
    handler: (visibility: boolean) => void,
    dispatch: any,
    banks: any
}

const BankSheet = (props: Props) => {
    const { onSubmit, handler, dispatch, banks } = props;

    useEffect(() => {
        dispatch(action.fetchAvailableBank());
    }, []);

    const handleSubmit = (data: any) => {
        onSubmit(data);
        setTimeout(() => {
            handler(false);
        }, 250);
    };

    return (
        <BottomSheet handler={handler} title="Pilih Bank">
            {banks.map((i: any, idx: any) => (
                // eslint-disable-next-line react/no-array-index-key
                <BankAccountItem key={idx} onClick={() => handleSubmit(i)}>
                    <Text block bold>{i.code}</Text>
                    <Text block extraSmall>{i.name}</Text>
                </BankAccountItem>
            ))}
        </BottomSheet>
    );
};

const mapStateToProps = (state: any) => {
    return {
        banks: state.bankReducer.banks
    };
};

export default connect(mapStateToProps)(BankSheet);
