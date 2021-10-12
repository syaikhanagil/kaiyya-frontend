import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import styled from 'styled-components';
import BankSheet from '../../components/BankSheet';
import Icon from '../../components/Icon';
import { Button } from '../../components/Styled';
import action from '../../configs/redux/action';
import Main from '../../layouts/Main';

const Wrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    background: var(--color-white);
`;

const SectionWrapper = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    padding: 10px 1.5rem;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    cursor: pointer;

    &:last-of-type {
        margin-bottom: 5px;
        border: none;
    }

    div {
        position: relative;
        display: block;
        width: 100%;

        &#icon-action {
            text-align: right;
            width: 20%;
        }
    }

    p,
    label {
        position: relative;
        display: block;
        margin: 0;
        font-weight: 600;
    }

    label {
        cursor: pointer;
    }

    input, textarea {
        position: relative;
        display: block;
        width: 100%;
        outline: none;
        border: none;
    }
    
    textarea {
        width: 100%;
        resize: none;
    }

    span, input {
        font-size: var(--font-extra-small);
    }
`;

const SubmitWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    padding: 0 1.5rem;
    margin: 10px 0;
`;

const BankAccountForm = () => {
    const dispatch = useDispatch();
    const [bankDialog, setBankDialog] = useState(false);
    const [bankName, setBankName] = useState('');
    const [bankData, setBankData] = useState<any>({});
    const [bankNumber, setBankNumber] = useState('');

    const handleSubmit = () => {
        const data = {
            bankNameHolder: bankName,
            bankCode: bankData.code,
            bankNumber
        };
        dispatch(action.createBankAccount(data));
    };

    return (
        <Main useHeader paddingTop title="Tambah Rekening Bank">
            <Wrapper>
                <SectionWrapper>
                    <div>
                        <label htmlFor="name">Nama Pemilik Rekening</label>
                        <input type="text" required name="name" id="name" autoComplete="off" placeholder="Nama Pemilik Rekening" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setBankName(event.target.value)} value={bankName} />
                    </div>
                </SectionWrapper>
                <SectionWrapper onClick={() => setBankDialog(true)}>
                    <div>
                        <p>Pilih Bank</p>
                        {!bankData.code && (
                            <span>Pilih Bank</span>
                        )}
                        {bankData.code && (
                            <span>{bankData.name}</span>
                        )}
                    </div>
                    <div id="icon-action">
                        <Icon icon="chevron-right" />
                    </div>
                </SectionWrapper>
                <SectionWrapper>
                    <div>
                        <label htmlFor="number">Nomor Rekening</label>
                        <input
                            type="text"
                            required
                            name="number"
                            id="number"
                            autoComplete="off"
                            placeholder="Nomor Rekening"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const regex = /^[0-9]{0,20}$/;
                                if (regex.test(event.target.value)) {
                                    setBankNumber(event.target.value);
                                }
                            }}
                            value={bankNumber}
                        />
                    </div>
                </SectionWrapper>
            </Wrapper>
            <SubmitWrapper>
                <Button block fullWidth primary disabled={!bankNumber || !bankName || !bankData} onClick={() => handleSubmit()}>Simpan</Button>
            </SubmitWrapper>
            {bankDialog && (
                <BankSheet onSelect={(i: any) => setBankData(i)} handler={(visibility: boolean) => setBankDialog(visibility)} />
            )}
        </Main>
    );
};

export default connect(null)(BankAccountForm);
