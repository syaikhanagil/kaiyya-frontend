import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import BottomSheet from '../../../components/BottomSheet';
import { Button, Text } from '../../../components/Styled';
import action from '../../../configs/redux/action';

const Wrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    padding: 10px 1rem;
`;

const SubmitWrapper = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    padding: 10px 1rem;
    flex-direction: row;
    justify-content: space-between;

    button {
        width: 100%;
        flex-basis: 49%;
    }
`;

interface Props {
    id: string,
    // eslint-disable-next-line no-unused-vars
    handler: (visibility: boolean) => void
}

const OrderCancelDialog = (props: Props) => {
    const { id, handler } = props;
    const dispatch = useDispatch();

    const handleCancel = () => {
        dispatch(action.cancelOrder(id));
    };

    return (
        <BottomSheet title="Batalkan Pesanan" handler={handler}>
            <Wrapper>
                <Text>Apakah kamu ingin membatalkan pesanan ini?</Text>
            </Wrapper>
            <SubmitWrapper>
                <Button block primary onClick={() => handleCancel()}>Ya</Button>
                <Button block outline onClick={() => handler(false)}>Tidak</Button>
            </SubmitWrapper>
        </BottomSheet>
    );
};

export default OrderCancelDialog;
