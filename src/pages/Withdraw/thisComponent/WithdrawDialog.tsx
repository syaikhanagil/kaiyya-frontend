import React from 'react';
import Dialog from '../../../components/Dialog';
import Icon from '../../../components/Icon';
import { Button, Text } from '../../../components/Styled';

interface Props {
    // eslint-disable-next-line no-unused-vars
    handler: (visibility: boolean) => void
}

const WithdrawDialog = (props: Props) => {
    const { handler } = props;
    return (
        <Dialog>
            <Icon icon="check" />
            <Text block alignCenter extraSmall>Permintaan penarikan berhasil, imbalan akan dikirim maskismal dalam 1x24 jam.</Text>
            <Button block fullWidth primary onClick={() => handler(false)} style={{ marginTop: 10 }}>Tutup</Button>
        </Dialog>
    );
};

export default WithdrawDialog;
