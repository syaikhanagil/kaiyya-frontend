import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import styled from 'styled-components';
import action from '../../configs/redux/action';
import pushLocation from '../../configs/routes/pushLocation';
import BottomSheet from '../BottomSheet';
import Loading from '../Loading';
import { Text } from '../Styled';

const BankAccountItem = styled.div`
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
    items: any,
    isReady: boolean
}

const BankAccountSheet = (props: Props) => {
    const { onSelect, handler, items, isReady } = props;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(action.fetchBankAccount());
    }, []);

    const handleSelect = (data: any) => {
        onSelect(data);
        setTimeout(() => {
            handler(false);
        }, 250);
    };

    return (
        <BottomSheet fullHeight handler={handler} title="Nomor Rekening" actionTitle="Tambah Rekening" onActionClick={() => pushLocation.path('/bank-account/new')}>
            {isReady && items.length > 0 && items.map((i: any, idx: any) => (
                // eslint-disable-next-line react/no-array-index-key
                <BankAccountItem key={idx} onClick={() => handleSelect(i)}>
                    <Text block bold>{i.bank_code}</Text>
                    <Text block extraSmall>{i.bank_name_holder}</Text>
                    <Text block extraSmall>{i.bank_number}</Text>
                </BankAccountItem>
            ))}
            {!isReady && items.length < 1 && (
                <Loading type="ring" alignCenter />
            )}
        </BottomSheet>
    );
};

const mapStateToProps = (state: any) => {
    return {
        items: state.bankReducer.items,
        isReady: state.bankReducer.isReady
    };
};

export default connect(mapStateToProps)(BankAccountSheet);
