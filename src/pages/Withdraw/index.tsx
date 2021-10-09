import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import BankAccountSheet from '../../components/BankAccountSheet';
import Icon from '../../components/Icon';
import { Button, Text } from '../../components/Styled';
import action from '../../configs/redux/action';
import priceFormat from '../../helpers/price';
import priceInput from '../../helpers/priceInput';
import Main from '../../layouts/Main';

const WithdrawWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
`;

const SectionWrapper = styled.div <{ flex?: boolean }>`
    position: relative;
    display: ${(props) => (props.flex ? 'flex' : 'block')};
    width: 100%;
    height: 100%;
    background: var(--color-white);
    padding: 10px 1rem;
    margin-bottom: 10px;
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
    font-size: 24px;
    padding-bottom: 10px;
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
    font-size: 24px;
`;

const FloatingWrapper = styled.div`
    position: fixed;
    display: flex;
    width: 100%;
    max-width: 480px;
    height: auto;
    background: var(--color-white);
    padding: 10px 1rem;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    align-items: center;
    overflow: hidden;
    box-shadow: 0 -3px 6px rgba(0, 0, 0, .1);
    z-indeX: 1;

    @media only screen and (max-width: 768px) {
        max-width: 100%;
    }
`;

interface Props {
    dispatch: any,
    addons: any
}

const Withdraw = (props: Props) => {
    const { dispatch, addons } = props;
    const [bankAccount, setBankAccount] = useState<any>({});
    const [amount, setAmount] = useState('0');
    const [banckAccountDialog, setBankAccountDialog] = useState(true);

    useEffect(() => {
        dispatch(action.fetchAccountDetail());
        setBankAccount({
            name: ''
        });
    }, []);

    const handleInput = (value: any) => {
        if (value.length > 0) {
            const total = priceInput(value);
            if (total) setAmount(total);
            return;
        }
        setAmount('0');
    };

    return (
        <Main useHeader backBtn title="Penarikan Imbalan" paddingTop>
            <WithdrawWrapper>
                <SectionWrapper flex onClick={() => setBankAccountDialog(true)}>
                    <div>
                        <Text block bold extraSmall>Tarik Imbalan ke Rekening</Text>
                        {!bankAccount.name && (
                            <Text block>Pilih Rekening Penarikan</Text>
                        )}
                        {bankAccount.name && (
                            <Text block>{bankAccount.name}</Text>
                        )}
                    </div>
                    <div>
                        <Icon icon="chevron-right" />
                    </div>
                </SectionWrapper>
                <SectionWrapper>
                    <Text block bold extraSmall>Jumlah Penarikan Dana</Text>
                    <AmountWrapper>
                        <p>Rp</p>
                        <AmountInput id="amount" onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInput(event.target.value)} value={amount} placeholder="0" autoComplete="off" />
                    </AmountWrapper>
                    <Text block marginY>{`Jumlah imbalan saat ini ${priceFormat(addons.referral_point)}`}</Text>
                </SectionWrapper>
                <SectionWrapper flex>
                    <div>
                        <Text block bold extraSmall>Biaya Admin</Text>
                        <Text block extraSmall>Biaya admin yang dikenakan untuk penarikan</Text>
                    </div>
                    <div>
                        <Text block bold extraSmall>{priceFormat(5000)}</Text>
                    </div>
                </SectionWrapper>
                <FloatingWrapper>
                    <Button block fullWidth disabled={!amount || amount.length < 6} primary>Lanjutkan</Button>
                </FloatingWrapper>
                {banckAccountDialog && (
                    <BankAccountSheet handler={(visibility: boolean) => setBankAccountDialog(visibility)} />
                )}
            </WithdrawWrapper>
        </Main>
    );
};

const mapStateToProps = (state: any) => {
    return {
        addons: state.accountReducer.addons
    };
};

export default connect(mapStateToProps)(Withdraw);
