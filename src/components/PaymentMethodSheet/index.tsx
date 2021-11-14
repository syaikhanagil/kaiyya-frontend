import React, { useState } from 'react';
import styled from 'styled-components';
import BottomSheet from '../BottomSheet';
import { Button } from '../Styled';
import briLogo from '../../assets/svg/bri-logo.svg';
import bniLogo from '../../assets/svg/bni-logo.svg';
import mandiriLogo from '../../assets/svg/mandiri-logo.svg';
import permataLogo from '../../assets/svg/permata-logo.svg';
import cimbLogo from '../../assets/svg/cimb-logo.svg';
import sampoernaLogo from '../../assets/img/bss-logo.png';
import bcaLogo from '../../assets/svg/bca-logo.svg';
import bjbLogo from '../../assets/svg/bjb-logo.svg';
import bsiLogo from '../../assets/svg/bsi-logo.svg';
import qrisLogo from '../../assets/svg/qris-logo.svg';

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

const PaymentList = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    flex-direction: row;
    padding: 15px 1rem;
    justify-content: space-between;
    flex-wrap: wrap;
`;

const PaymentItem = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: auto;
    padding: 15px 10px;
    margin-bottom: 10px;
    border: 1px solid #e7e7e7;
    border-radius: 4px;
    flex-basis: 30%;
    cursor: pointer;

    .logo {
        position: relative;
        display: block;
        height: auto;
        text-align: center;
        img {
            position: relative;
            height: 25px;
            margin: auto;
        }
    }

    span {
        position: absolute;
        display: block;
        white-space: nowrap;
        left: 50%;
        bottom: 0;
        font-size: var(--font-extra-small);
        transform: translateX(-50%);
    }

    .check-icon {
        position: absolute;
        top: 50%;
        right: 5px;
        transform: translateY(-50%);
    }

    &.active {
        border-color: var(--primary);
    }
    &.disabled {
        position: relavive;
        background: #eee;
        cursor: not-allowed;
        .logo {
            opacity: .8;
        }
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
                <Title>Virtual Account</Title>
                <PaymentList>
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
                    </PaymentItem>
                    <PaymentItem
                        className={selectedMethod === 'PERMATA VA' ? 'active' : ''}
                        onClick={() => {
                            setSelectedMethod('PERMATA VA');
                            setSelectedMethodCode('PERMATA');
                            setSelectedMethodType('virtual-account');
                        }}
                    >
                        <div className="logo">
                            <img src={permataLogo} alt="permata-va" />
                        </div>
                    </PaymentItem>
                    <PaymentItem
                        className={selectedMethod === 'SAHABAT SAMPOERNA VA' ? 'active' : ''}
                        onClick={() => {
                            setSelectedMethod('SAHABAT SAMPOERNA VA');
                            setSelectedMethodCode('SAHABAT_SAMPOERNA');
                            setSelectedMethodType('virtual-account');
                        }}
                    >
                        <div className="logo">
                            <img src={sampoernaLogo} alt="sahabat-sampoerna-va" />
                        </div>
                    </PaymentItem>
                    <PaymentItem
                        className={selectedMethod === 'BANK SYARIAH INDONESIA VA' ? 'active' : ''}
                        onClick={() => {
                            setSelectedMethod('BANK SYARIAH INDONESIA VA');
                            setSelectedMethodCode('BSI');
                            setSelectedMethodType('virtual-account');
                        }}
                    >
                        <div className="logo">
                            <img src={bsiLogo} alt="bsi-va" />
                        </div>
                    </PaymentItem>
                    {/* <PaymentItem
                        className={selectedMethod === 'BJB VA' ? 'active' : ''}
                        onClick={() => {
                            setSelectedMethod('BJB VA');
                            setSelectedMethodCode('BJB');
                            setSelectedMethodType('virtual-account');
                        }}
                    >
                        <div className="logo">
                            <img src={bjbLogo} alt="bjb-va" />
                        </div>
                    </PaymentItem> */}
                    <PaymentItem className="disabled">
                        <div className="logo">
                            <img src={bjbLogo} alt="bjb-va" />
                        </div>
                        <span>Tidak Tersedia</span>
                    </PaymentItem>
                    {/* <PaymentItem
                        className={selectedMethod === 'CIMB NIAGA VA' ? 'active' : ''}
                        onClick={() => {
                            setSelectedMethod('CIMB NIAGA VA');
                            setSelectedMethodCode('CIMB');
                            setSelectedMethodType('virtual-account');
                        }}
                    >
                        <div className="logo">
                            <img src={cimbLogo} alt="cimb-va" />
                        </div>
                    </PaymentItem> */}
                    <PaymentItem className="disabled">
                        <div className="logo">
                            <img src={cimbLogo} alt="cimb-va" />
                        </div>
                        <span>Tidak Tersedia</span>
                    </PaymentItem>
                    {/* <PaymentItem className="disabled">
                        <div className="logo">
                            <img src={bniLogo} alt="bni-va" />
                        </div>
                        <span>Tidak Tersedia</span>
                    </PaymentItem> */}
                    <PaymentItem className="disabled">
                        <div className="logo">
                            <img src={bcaLogo} alt="bca-va" />
                        </div>
                        <span>Tidak Tersedia</span>
                    </PaymentItem>
                </PaymentList>
                <Title space>Lainnya</Title>
                <PaymentList>
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
                    </PaymentItem>
                </PaymentList>
                <ConfirmWrapper>
                    <Button block fullWidth primary disabled={selectedMethod === ''} onClick={() => handleSubmit()}>Konfirmasi</Button>
                </ConfirmWrapper>
            </PaymentMethodWrapper>
        </BottomSheet>
    );
};

export default PaymentMethodSheet;
