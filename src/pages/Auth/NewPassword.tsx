import React from 'react';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import Main from '../../layouts/Main';
import banner from '../../assets/img/banner-cherry.jpg';
import { Button, Input, InputWrapper, Label, Text } from '../../components/Styled';
import Icon from '../../components/Icon';
import API from '../../configs/api';

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

interface State {
    password: string,
    passwordConfirm: string,
    passwordView: boolean
}

class NewPassword extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            password: '',
            passwordConfirm: '',
            passwordView: true
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
        const { password } = this.state;
        const uid = Cookies.get('kis-reset-uid') || '';
        const data = {
            body: {
                uid,
                password
            }
        };
        API.resetPasswordConfirm(data).then((res: any) => {
            window.location.href = '/login';
            console.log(res);
        }).catch((err: any) => {
            console.log(err);
        });
    }

    render() {
        const { password, passwordConfirm, passwordView } = this.state;
        return (
            <>
                <Helmet>
                    <title>Password Baru | Kaiyya Dress</title>
                </Helmet>
                <Main useHeader backTo="/login" transparentHeader title="Password Baru">
                    <ResetWrapper>
                        <BannerWrapper>
                            <img src={banner} alt="Kaiyya Login" />
                        </BannerWrapper>
                        <FormWrapper>
                            <form onSubmit={this.handleSubmit} method="post" autoComplete="off">
                                <TextWrapper>
                                    <Text block alignCenter>Buat password baru anda</Text>
                                </TextWrapper>
                                <InputWrapper>
                                    <Input floatingLabel required type={passwordView ? 'password' : 'text'} name="password" id="password" placeholder="Password" onChange={this.handleInput} value={password} />
                                    <Label floatingLabel htmlFor="password">Password Baru</Label>
                                    <div id="input-icon" role="button" onClick={() => this.setState({ passwordView: !passwordView })}>
                                        <Icon icon="eye" />
                                    </div>
                                </InputWrapper>
                                <InputWrapper>
                                    <Input floatingLabel required type={passwordView ? 'password' : 'text'} name="passwordConfirm" id="passwordConfirm" placeholder="Password" onChange={this.handleInput} value={passwordConfirm} />
                                    <Label floatingLabel htmlFor="passwordConfirm">Konfirmasi Password Baru</Label>
                                    <div id="input-icon" role="button" onClick={() => this.setState({ passwordView: !passwordView })}>
                                        <Icon icon="eye" />
                                    </div>
                                </InputWrapper>
                                <Button type="submit" disabled={!password || !passwordConfirm || password !== passwordConfirm} fullWidth block primary onClick={this.handleSubmit}>Reset Password</Button>
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

export default connect(null)(NewPassword);
