import React from 'react';
import pushLocation from '../../configs/routes/pushLocation';
import BottomSheet from '../BottomSheet';

interface Props {
    // eslint-disable-next-line no-unused-vars
    handler: (visibility: boolean) => void
}
const BankAccountSheet = (props: Props) => {
    const { handler } = props;
    return (
        <BottomSheet handler={handler} title="Nomor Rekening" actionTitle="Tambah Rekening" onActionClick={() => pushLocation.path('/bank-account/new')}>
            Oke
        </BottomSheet>
    );
};

export default BankAccountSheet;
