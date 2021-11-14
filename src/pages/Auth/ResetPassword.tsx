import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import Main from '../../layouts/Main';
import banner from '../../assets/img/banner-web-login.jpg';
import { Button, Input, InputWrapper, Label, Text } from '../../components/Styled';
import Icon from '../../components/Icon';
import API from '../../configs/api';
import CONSTANT from '../../constant';

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

const ErrorWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    span {
        font-size: var(--font-extra-small);
    }
`;

interface State {
    email: string,
    submit: boolean,
    success: boolean,
    error: boolean
}

class ResetPassword extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            submit: false,
            success: false,
            error: false
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(event: { target: { id: any; value: any; }; }) {
        const newState = { [event.target.id]: event.target.value } as Pick<State, keyof State>;
        this.setState(newState);
    }

    handleSubmit(event: any) {
        event.preventDefault();
        const { dispatch } = this.props;
        const { email } = this.state;
        const data = {
            body: {
                email
            }
        };
        dispatch({ type: CONSTANT.SET_FULLSCREEN_LOADER, visible: true });
        API.resetPasswordRequest(data).then(() => {
            dispatch({ type: CONSTANT.SET_FULLSCREEN_LOADER, visible: false });
            this.setState({ submit: false, error: false, success: true });
        }).catch(() => {
            dispatch({ type: CONSTANT.SET_FULLSCREEN_LOADER, visible: false });
            this.setState({ submit: false, error: true, success: false });
        });
    }

    render() {
        const { email, success, error, submit } = this.state;
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
                            <form onSubmit={this.handleSubmit} method="post" autoComplete="off">
                                <TextWrapper>
                                    <Text block>Masukkan email kamu yang sudah terdaftar di bawah ini untuk me-reset kata sandi</Text>
                                </TextWrapper>
                                <InputWrapper error={error}>
                                    {error && (
                                        <ErrorWrapper id="error">
                                            <span>Alamat email tidak terdaftar</span>
                                        </ErrorWrapper>
                                    )}
                                    <Input floatingLabel name="email" id="email" placeholder="Email" onChange={this.handleInput} value={email} />
                                    <Label floatingLabel htmlFor="email">Email</Label>
                                </InputWrapper>
                                {success && (
                                    <Text block extraSmall style={{ marginBottom: 20 }}>Link untuk perubahan kata sandi telah dikirim, silahkan cek email anda.</Text>
                                )}
                                <Button type="submit" fullWidth block primary disabled={submit} onClick={this.handleSubmit}>Reset Password</Button>
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
    }
}

export default connect(null)(ResetPassword);
