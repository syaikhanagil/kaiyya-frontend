import React from 'react';
import styled from 'styled-components';
import Icon from '../Icon';

const DialogWrapper = styled.div`
    position: fixed;
    display: flex;
    width: 100%;
    max-width: 220px;
    height: 100%;
    max-height: 220px;
    background: rgba(255, 255, 255, .9);
    flex-direction: column;
    padding: 10px;
    align-items: center;
    justify-content: center;
    color: var(--primary);
    top: 50%;
    left: 50%;
    border-radius: 6px;
    transform: translate(-50%, -50%);
    z-index: 9;
    
    p {
        display: block;
        font-size: var(--font-small);
        margin-top: 10px;
        text-align: center;
    }

    .feather {
        width: 40px;
        height: 40px;
    }
`;

const AddToCartDialog = () => {
    return (
        <DialogWrapper>
            <Icon icon="check" />
            <p>Produk ditambahkan ke Keranjang</p>
        </DialogWrapper>
    );
};

export default AddToCartDialog;
