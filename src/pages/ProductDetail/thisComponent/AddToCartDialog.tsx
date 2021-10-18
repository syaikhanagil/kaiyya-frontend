import React from 'react';
import Dialog from '../../../components/Dialog';
import Icon from '../../../components/Icon';
import { Text } from '../../../components/Styled';

const AddToCartDialog = () => {
    return (
        <Dialog>
            <Icon icon="check" />
            <Text block alignCenter extraSmall>Produk ditambahkan ke Keranjang</Text>
        </Dialog>
    );
};

export default AddToCartDialog;
