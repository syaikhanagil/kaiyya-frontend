import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import Main from '../../layouts/Main';
import banner from '../../assets/img/welcome-banner-3.jpg';
import { Button, Input, InputWrapper, Label } from '../../components/Styled';
import Icon from '../../components/Icon';
import action from '../../configs/redux/action';

const LoginWrapper = styled.div`
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
    text-align: center;

    .title {
        font-size: 22px;
        font-weight: 600;
        margin: 0 0 12px;
    }

    form {
        display: block;
        width: 100%;
        height: 100%;
        text-align: defalut;
    }
`;

const ErrorWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    span {
        font-size: var(--font-extra-small);
    }
`;

const ForgotPassword = styled.div`
    position: relative;
    display: block;
    width: 100%;
    margin: 10px 0;
    text-align: right;

    a {
        font-size: var(--font-small);
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
    &:before {
        content: '';
        position: absolute;
        display: block;
        width: 80%;
        height: 1px;
        background: var(--color-black);
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    span {
        position: relative;
        font-size: var(--font-small);
        background: var(--color-white);
        padding: 0 10px;
    }
`;

interface State {
    email: string,
    password: string,
    passwordView: boolean,
    // loginAs: string
}

class Login extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            password: '',
            passwordView: true
            // loginAs: 'personal'
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleRole = this.handleRole.bind(this);
    }

    handleInput(event: { target: { id: any; value: any; }; }) {
        const newState = { [event.target.id]: event.target.value } as Pick<State, keyof State>;
        this.setState(newState);
    }

    handleRole(event: any) {
        event.preventDefault();
        // this.setState({ loginAs: event.target.id });
    }

    handleSubmit(event: any) {
        event.preventDefault();
        const { dispatch } = this.props;
        const { email, password } = this.state;
        const payload = {
            email,
            password
        };
        dispatch(action.login(payload));
    }

    render() {
        const { isRequest, isError } = this.props;
        const { email, password, passwordView } = this.state;
        return (
            <>
                <Helmet>
                    <title>Login | Kaiyya Dress</title>
                </Helmet>
                <Main useHeader transparentHeader backTo="/" title="Login">
                    <LoginWrapper>
                        <BannerWrapper>
                            <img src={banner} alt="Kaiyya Login" />
                        </BannerWrapper>
                        <FormWrapper>
                            <p className="title">Selamat Datang!</p>
                            <form autoComplete="off" onSubmit={this.handleSubmit}>
                                <InputWrapper>
                                    <Input floatingLabel required name="email" id="email" placeholder="Email" onChange={this.handleInput} value={email} />
                                    <Label floatingLabel htmlFor="email">Email</Label>
                                </InputWrapper>
                                <InputWrapper>
                                    {isError && (
                                        <ErrorWrapper id="error">
                                            <span>Password salah</span>
                                        </ErrorWrapper>
                                    )}
                                    <Input floatingLabel required type={passwordView ? 'password' : 'text'} name="password" id="password" placeholder="Password" onChange={this.handleInput} value={password} />
                                    <Label floatingLabel htmlFor="password">Password</Label>
                                    <div id="input-icon" role="button" onClick={() => this.setState({ passwordView: !passwordView })}>
                                        <Icon icon="eye" />
                                    </div>
                                </InputWrapper>
                                <ForgotPassword>
                                    <a href="/reset-password">Reset Password</a>
                                </ForgotPassword>
                                <Button type="submit" disabled={isRequest} fullWidth block primary onClick={this.handleSubmit}>Login</Button>
                                <InfoWrapper>
                                    <span>Belum memiliki akun?</span>
                                </InfoWrapper>
                                <Button type="button" disabled={isRequest} fullWidth block outline onClick={() => { window.location.href = '/register'; }}>Register</Button>
                            </form>
                        </FormWrapper>
                    </LoginWrapper>
                </Main>
            </>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        isRequest: state.authReducer.isRequest,
        isError: state.authReducer.isError
    };
};

export default connect(mapStateToProps)(Login);
