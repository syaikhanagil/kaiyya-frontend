import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import BankAccountSheet from '../../components/BankAccountSheet';
import Icon from '../../components/Icon';
import NumberKeyboard from '../../components/NumberKeyboard';
import { Button, Text } from '../../components/Styled';
import API from '../../configs/api';
import action from '../../configs/redux/action';
import priceFormat from '../../helpers/price';
import priceInput from '../../helpers/priceInput';
import Main from '../../layouts/Main';
import WithdrawDialog from './thisComponent/WithdrawDialog';
import pushLocation from '../../configs/routes/pushLocation';

const WithdrawWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: 100vh;
`;

const SectionWrapper = styled.div <{ flex?: boolean }>`
    position: relative;
    display: ${(props) => (props.flex ? 'flex' : 'block')};
    width: 100%;
    height: auto;
    background: var(--color-white);
    padding: 10px 1rem;
    margin-bottom: 5px;
    cursor: pointer;
    ${(props) => (props.flex && `
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    `)}
`;

const AmountWrapper = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    flex-direction: row;
    font-size: 20px;
    padding-bottom: 5px;
    border-bottom: 1px solid #eee;

    p {
        padding: 0 10px 0 0;
        font-weight: 600;
    }
`;

const AmountInput = styled.input`
    position: relative;
    display: block;
    width: 100%;
    outline: none;
    font-size: 20px;
    &:disabled {
        background: var(--color-white);
    }
`;

const FloatingWrapper = styled.div`
    position: fixed;
    display: flex;
    width: 100%;
    max-width: 480px;
    height: auto;
    background: var(--color-white);
    padding: 0 1rem 10px;
    left: 50%;
    bottom: 0;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 -3px 6px rgba(0, 0, 0, .1);
    transform: translateX(-50%);
    overflow: hidden;
    z-indeX: 1;

    @media only screen and (max-width: 768px) {
        max-width: 100%;
    }
`;

interface Props {
    dispatch: any
    addons: any
}

const Withdraw = (props: Props) => {
    const { dispatch, addons } = props;
    const [bankAccount, setBankAccount] = useState<any>({});
    const [amount, setAmount] = useState(0);
    const [total, setTotal] = useState('0');
    const [subtotal, setSubtotal] = useState(0);
    const [bankAccountDialog, setBankAccountDialog] = useState(false);
    const [withdrawDialog, setWithdrawDialog] = useState(false);

    useEffect(() => {
        dispatch(action.fetchAccountDetail());
        setBankAccount({
            bank_name_holder: ''
        });
    }, []);

    const handleInput = (value: any) => {
        if (value.length > 0) {
            const val = priceInput(value);
            if (val) setTotal(val);
            return;
        }
        setTotal('0');
    };

    useEffect(() => {
        const val = total.replaceAll(',', '').replaceAll('.', '');
        setAmount(parseInt(val, 10));
    }, [total]);

    useEffect(() => {
        if (amount > 6500) {
            setSubtotal(amount - 6500);
            return;
        }
        setSubtotal(0);
    }, [amount]);

    const handleSubmit = () => {
        const data = {
            body: {
                amount,
                bankCode: bankAccount.bank_code,
                bankNameHolder: bankAccount.bank_name_holder,
                bankNumber: bankAccount.bank_number
            }
        };
        dispatch(action.showFullscreenLoader());
        API.createWithdrawal(data).then(() => {
            dispatch(action.hideFullscreenLoader());
            dispatch(action.fetchAccountDetail());
            setWithdrawDialog(true);
        });
    };

    return (
        <Main useHeader backBtn title="Penarikan Imbalan" paddingTop paddingBottom moreBtn moreIcon="home" onMoreClick={() => pushLocation.path('/')}>
            <WithdrawWrapper>
                <SectionWrapper>
                    <Text block bold extraSmall style={{ marginBottom: 5 }}>{`Imbalan yang bisa ditarik adalah ${priceFormat(addons.referral_point)}`}</Text>
                    <Text block bold extraSmall>Silahkan masukkan jumlah penarikan imbalan</Text>
                    <AmountWrapper>
                        <p>Rp</p>
                        <AmountInput id="amount" disabled onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => event.preventDefault()} value={total} placeholder="0" autoComplete="off" />
                    </AmountWrapper>
                    <Text block extraSmall marginY>Jumlah minimum penarikan imbalan adalah Rp 25,000</Text>
                </SectionWrapper>
                <SectionWrapper flex onClick={() => setBankAccountDialog(true)}>
                    <div>
                        <Text block bold extraSmall>Rekening Penarikan</Text>
                        {!bankAccount.bank_name_holder && (
                            <Text extraSmall block>Pilih Rekening Penarikan</Text>
                        )}
                        {bankAccount.bank_name_holder && (
                            <>
                                <Text extraSmall style={{ marginRight: 5 }}>{bankAccount.bank_code}</Text>
                                <Text extraSmall>{bankAccount.bank_number}</Text>
                                <Text extraSmall block>{bankAccount.bank_name_holder}</Text>
                            </>
                        )}
                    </div>
                    <div>
                        <Icon icon="chevron-right" />
                    </div>
                </SectionWrapper>
                <SectionWrapper flex>
                    <div>
                        <Text block extraSmall>Jumlah penarikan</Text>
                        <Text block extraSmall>Biaya admin penarikan</Text>
                        <Text block extraSmall>Jumlah yang akan diterima</Text>
                    </div>
                    <div>
                        <Text block bold extraSmall alignRight>{priceFormat(amount)}</Text>
                        <Text block bold extraSmall alignRight>{priceFormat(6500)}</Text>
                        <Text block bold extraSmall alignRight>{priceFormat(subtotal)}</Text>
                    </div>
                </SectionWrapper>
                <FloatingWrapper>
                    <NumberKeyboard value={total} onType={(val: string) => handleInput(val)} />
                    <Button block fullWidth disabled={!amount || amount < 25000 || !bankAccount.bank_name_holder || amount > parseInt(addons.referral_point, 10)} primary onClick={() => handleSubmit()}>Lanjutkan</Button>
                </FloatingWrapper>
                {bankAccountDialog && (
                    <BankAccountSheet onSelect={(data: any) => setBankAccount(data)} handler={(visibility: boolean) => setBankAccountDialog(visibility)} />
                )}
                {withdrawDialog && (
                    <WithdrawDialog handler={(visibility: boolean) => setWithdrawDialog(visibility)} />
                )}
            </WithdrawWrapper>
        </Main>
    );
};

const mapStateToProps = (state: any) => {
    return {
        addons: state.accountReducer.addons,
        items: state.withdrawReducer.items
    };
};

export default connect(mapStateToProps)(Withdraw);
