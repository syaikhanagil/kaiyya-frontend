import React, { useState } from 'react';
import styled from 'styled-components';
import BottomSheet from '../BottomSheet';
import { Button, FlexBox } from '../Styled';
import briLogo from '../../assets/svg/bri-logo.svg';
import bniLogo from '../../assets/svg/bni-logo.svg';
import mandiriLogo from '../../assets/svg/mandiri-logo.svg';
import bcaLogo from '../../assets/svg/bca-logo.svg';
import qrisLogo from '../../assets/svg/qris-logo.svg';
import Icon from '../Icon';

const PaymentMethodWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
`;

const Title = styled('p') <{ space?: boolean }>`
    position: relative;
    display: block;
    width: 100%;
    font-weight: 600;
    padding: 10px 1rem;
    ${(props) => (props.space ? 'border-top: 10px solid #e7e7e7;' : '')}
    border-bottom: 1px solid #e7e7e7;
`;

const PaymentItem = styled.div`
    position: relative;
    display: flex;
    width: auto;
    border-bottom: 1px solid #e7e7e7;
    padding: 15px 1rem;
    align-items: center;
    cursor: pointer;

    .logo {
        position: relative;
        height: 22px;
        img {
            height: 100%;
        }
    }

    span {
        padding-left: 10px;
        font-size: var(--font-extra-small);
    }
    .check-icon {
        position: absolute;
        top: 50%;
        right: 1rem;
        transform: translateY(-50%);
    }

    &.disabled {
        position: relavive;
        background: #f7f7f7;
        cursor: not-allowed;
    }
`;

const ConfirmWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    padding: 10px 1rem;
`;

interface Props {
    // eslint-disable-next-line no-unused-vars
    onSubmit: (method: string, code: string, type: string) => void,
    // eslint-disable-next-line no-unused-vars
    handler: (visibility: boolean) => void
}

const PaymentMethodSheet = (props: Props) => {
    const { onSubmit, handler } = props;
    const [selectedMethod, setSelectedMethod] = useState('');
    const [selectedMethodCode, setSelectedMethodCode] = useState('');
    const [selectedMethodType, setSelectedMethodType] = useState('');

    const handleSubmit = () => {
        if (selectedMethod) {
            onSubmit(selectedMethod, selectedMethodCode, selectedMethodType);
            setTimeout(() => {
                handler(false);
            }, 250);
        }
    };

    return (
        <BottomSheet title="Metode Pembayaran" handler={handler}>
            <PaymentMethodWrapper>
                <FlexBox column>
                    <Title>Virtual Account</Title>
                    <PaymentItem
                        className={selectedMethod === 'BRI VA' ? 'active' : ''}
                        onClick={() => {
                            setSelectedMethod('BRI VA');
                            setSelectedMethodCode('BRI');
                            setSelectedMethodType('virtual-account');
                        }}
                    >
                        <div className="logo">
                            <img src={briLogo} alt="bri-va" />
                        </div>
                        {selectedMethod === 'BRI VA' && (
                            <div className="check-icon">
                                <Icon icon="check" />
                            </div>
                        )}
                    </PaymentItem>
                    <PaymentItem
                        className={selectedMethod === 'BNI VA' ? 'active' : ''}
                        onClick={() => {
                            setSelectedMethod('BNI VA');
                            setSelectedMethodCode('BNI');
                            setSelectedMethodType('virtual-account');
                        }}
                    >
                        <div className="logo">
                            <img src={bniLogo} alt="bni-va" />
                        </div>
                        {selectedMethod === 'BNI VA' && (
                            <div className="check-icon">
                                <Icon icon="check" />
                            </div>
                        )}
                    </PaymentItem>
                    <PaymentItem
                        className={selectedMethod === 'MANDIRI VA' ? 'active' : ''}
                        onClick={() => {
                            setSelectedMethod('MANDIRI VA');
                            setSelectedMethodCode('MANDIRI');
                            setSelectedMethodType('virtual-account');
                        }}
                    >
                        <div className="logo">
                            <img src={mandiriLogo} alt="mandiri-va" />
                        </div>
                        {selectedMethod === 'MANDIRI VA' && (
                            <div className="check-icon">
                                <Icon icon="check" />
                            </div>
                        )}
                    </PaymentItem>
                    <PaymentItem className="disabled">
                        <div className="logo">
                            <img src={bcaLogo} alt="bca-va" />
                        </div>
                        <span>Saat Ini Belum Tersedia</span>
                        {selectedMethod === 'BCA VA' && (
                            <div className="check-icon">
                                <Icon icon="check" />
                            </div>
                        )}
                    </PaymentItem>
                    <Title space>Lainnya</Title>
                    <PaymentItem
                        className={selectedMethod === 'QRIS' ? 'active' : ''}
                        onClick={() => {
                            setSelectedMethod('QRIS');
                            setSelectedMethodCode('QRIS');
                            setSelectedMethodType('qris');
                        }}
                    >
                        <div className="logo">
                            <img src={qrisLogo} alt="qris" />
                        </div>
                        {selectedMethod === 'QRIS' && (
                            <div className="check-icon">
                                <Icon icon="check" />
                            </div>
                        )}
                    </PaymentItem>
                </FlexBox>
                <ConfirmWrapper>
                    <Button block fullWidth primary disabled={selectedMethod === ''} onClick={() => handleSubmit()}>Konfirmasi</Button>
                </ConfirmWrapper>
            </PaymentMethodWrapper>
        </BottomSheet>
    );
};

export default PaymentMethodSheet;
