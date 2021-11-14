import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import action from '../../configs/redux/action';
import BottomSheet from '../BottomSheet';
import { Button, Text } from '../Styled';

const Wrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: auto;
    padding: 10px 1rem;
`;

const SubmitWrapper = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 0;

    button {
        min-width: auto;
        flex-basis: 49%;
    }
`;

interface Props {
    id: string,
    // eslint-disable-next-line no-unused-vars
    handler: (visibility: boolean) => void
}
const OrderConfirmationSheet = (props: Props) => {
    const { id, handler } = props;
    const dispatch = useDispatch();

    return (
        <BottomSheet title="Konfirmasi Pesanan Diterima" handler={handler}>
            <Wrapper>
                <Text block>Pastikan anda telah menerima pesanan, pesanan akan ditandai telah selesai dengan anda mengkonfirmasi pesanan telah diterima.</Text>
                <SubmitWrapper>
                    <Button block fullWidth primary onClick={() => dispatch(action.confirmOrder(id))}>Konfirmasi</Button>
                    <Button block fullWidth outline onClick={() => handler(false)}>Batal</Button>
                </SubmitWrapper>
            </Wrapper>
        </BottomSheet>
    );
};

export default OrderConfirmationSheet;
