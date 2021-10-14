import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import BottomSheet from '../../../components/BottomSheet';
import { Button } from '../../../components/Styled';
import action from '../../../configs/redux/action';
import pushLocation from '../../../configs/routes/pushLocation';

const ActionWrapper = styled.div`
    position: relative;
    padding: 0 1rem 10px;
    button {
        margin-top: 10px;
    }
`;

interface Props {
    id: string,
    // eslint-disable-next-line no-unused-vars
    handler: (visibility: boolean) => void
}

const ActionDialog = (props: Props) => {
    const { id, handler } = props;
    const dispatch = useDispatch();

    return (
        <BottomSheet title="Pengaturan Alamat" handler={handler}>
            <ActionWrapper>
                <Button block fullWidth primary onClick={() => pushLocation.path(`/account/address/edit/${id}`)}>Edit Alamat</Button>
                <Button block fullWidth primary onClick={() => dispatch(action.setDefaultAddress(id))}>Jadikan Alamat Utama</Button>
                <Button block fullWidth outline onClick={() => dispatch(action.deleteAddress(id))}>Hapus Alamat</Button>
            </ActionWrapper>
        </BottomSheet>
    );
};

export default ActionDialog;
