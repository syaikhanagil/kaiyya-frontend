import React, { useState } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import Main from '../../layouts/Main';
import banner from '../../assets/img/banner-cherry.jpg';
import { Button, Input, InputWrapper, Label, Text } from '../../components/Styled';
import Icon from '../../components/Icon';

const ResetWrapper = styled.div`
    position: relative;
    width: 100%;
    min-height: 100vh;
    background: var(--color-white);
`;

const BannerWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    min-height: 230px;
    img {
        width: 100%;
    }
`;

const FormWrapper = styled.div`
    position: relative;
    display: block;
    padding: 20px 1.5rem;
    margin-top: -25px;
    background: var(--color-white);
    border-radius: 15px 15px 0 0;
    form {
        width: 100%;
        height: 100%;
    }
`;

const InfoWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: auto;
    padding: 0;
    margin: 10px 0;
    text-align: center;

    span {
        position: relative;
        font-size: var(--font-small);
        background: var(--color-white);
    }
`;

const TextWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    margin-bottom: 15px;
`;

const ResetPassword = () => {
    const [email, setEmail] = useState('');

    const submitForm = () => {
        if (email) {
            console.log(email);
        }
    };

    return (
        <>
            <Helmet>
                <title>Reset Password | Kaiyya Dress</title>
            </Helmet>
            <Main useHeader backTo="/login" transparentHeader title="Reset Password">
                <ResetWrapper>
                    <BannerWrapper>
                        <img src={banner} alt="Kaiyya Login" />
                    </BannerWrapper>
                    <FormWrapper>
                        <form onSubmit={() => submitForm()} method="post" autoComplete="off">
                            <TextWrapper>
                                <Text block>Masukkan email kamu yang sudah terdaftar di bawah ini untuk me-reset kata sandi</Text>
                            </TextWrapper>
                            <InputWrapper>
                                <Input floatingLabel name="email" id="email" placeholder="Email" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} value={email} />
                                <Label floatingLabel htmlFor="email">Email</Label>
                            </InputWrapper>
                            <Button type="submit" fullWidth block primary>Reset Password</Button>
                            <InfoWrapper>
                                <a href="/login">
                                    <Icon icon="chevron-left" />
                                    <span>Login</span>
                                </a>
                            </InfoWrapper>
                        </form>
                    </FormWrapper>
                </ResetWrapper>
            </Main>
        </>
    );
};

export default ResetPassword;
