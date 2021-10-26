import React from 'react';
import styled from 'styled-components';
import BottomSheet from '../../../components/BottomSheet';
import { Button, Text } from '../../../components/Styled';
import pushLocation from '../../../configs/routes/pushLocation';

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
    // eslint-disable-next-line no-unused-vars
    handler: (visibility: boolean) => void
}
const BackDialog = (props: Props) => {
    const { handler } = props;

    return (
        <BottomSheet title="Kembali" handler={handler}>
            <Wrapper>
                <Text block>Anda belum melakukan pembayaran, apakah anda ingin kembali kehalaman sebelumnya?</Text>
                <SubmitWrapper>
                    <Button block fullWidth primary onClick={() => pushLocation.path('/orders')}>Ya, Kembali.</Button>
                    <Button block fullWidth outline onClick={() => handler(false)}>Tidak.</Button>
                </SubmitWrapper>
            </Wrapper>
        </BottomSheet>
    );
};

export default BackDialog;
