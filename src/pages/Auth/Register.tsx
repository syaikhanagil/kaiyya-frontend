import React from 'react';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Main from '../../layouts/Main';
import { Button, Input, InputWrapper, Label, Select, Text } from '../../components/Styled';
import Icon from '../../components/Icon';
import action from '../../configs/redux/action';
// import logo from '../../assets/img/logo-kaiyya.png';
import banner from '../../assets/img/banner-web-login.jpg';
import RulesSheet from '../../components/RulesSheet';
import validateEmail from '../../helpers/validateEmail';
import phoneInput from '../../helpers/phoneInput';
import PhoneNumberInput from '../../components/PhoneNumberInput';

const RegisterWrapper = styled.div`
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
    padding: 20px 1rem;
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
        width: 100%;
        height: 100%;
        text-align: default;
    }
    .ref {
        position: relative;
        display: inline-block;
        width: auto;
        margin: 0 auto 15px;
        text-align: center;
        padding: 4px 10px;
        span {
            font-weight: 600;
            margin-left: 5px;
        }
    }
`;

const RoleSelector = styled.div`
    position: relative;
    display: inline-flex;
    width: auto;
    margin: 0 auto 15px;
    background: #eee;
    border-radius: 50px;
    text-align: center;
    padding: 4px;

    span {
        display: block;
        padding: 2px 12px;
        margin: 0 4px;
        border-radius: 50px;
        user-select: none;
        cursor: pointer;
        border: 1px solid var(--transparent);
        &.active {
            border: 1px solid var(--primary);
        }
    }
`;

const InfoWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: auto;
    padding: 0;
    margin: 10px 0;
    user-select: none;
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

// const Logo = styled.div`
//     position: relative;
//     display: block;
//     width: 100%;
//     height: 60px;
//     text-align: center;
//     margin: auto;

//     img {
//         margin: auto;
//         height: 100%;
//     }
// `;

const AlertWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    text-align: left;
    margin-bottom: 10px;

    .feather {
        height: 14px;
        width: 14px;
        margin-right: 5px;
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

interface State {
    fullname: string,
    email: string,
    phone: string,
    role: string,
    password: string,
    passwordView: boolean,
    registerAs: string,
    rulesDialog: boolean,
    emailError: boolean
}

interface Props {
    dispatch: any,
    errorAt: string
}

class Register extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            fullname: '',
            email: '',
            phone: '',
            role: 'retail',
            password: '',
            passwordView: true,
            registerAs: 'personal',
            rulesDialog: false,
            emailError: false
        };
        this.handleInput = this.handleInput.bind(this);
        this.handlePhoneInput = this.handlePhoneInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // const { search } = window.location;
        const referralRole = Cookies.get('referral_role') || '';
        if (referralRole === 'distributor') {
            this.setState({ role: 'reseller' });
        }
        if (referralRole === 'reseller') {
            this.setState({ role: 'subreseller' });
        }
    }

    handleInput(event: { target: { id: any; value: any; }; }) {
        if (event.target.id === 'phone') {
            if (phoneInput(event.target.value)) {
                this.setState({ phone: event.target.value });
            }
            // const regex = /^[0-9]{0,13}$/;
            // if (regex.test(event.target.value)) {
            //     this.setState({ phone: event.target.value });
            // }
            return;
        }
        const newState = { [event.target.id]: event.target.value } as Pick<State, keyof State>;
        this.setState(newState);
    }

    handlePhoneInput = (phone: string) => {
        this.setState({ phone });
    }

    handleSubmit(event: any) {
        event.preventDefault();
        const { dispatch } = this.props;
        const { fullname, email, phone, role, password, registerAs } = this.state;
        const referralCode = Cookies.get('referral') || '';
        const referralRole = Cookies.get('referral_role') || '';
        let defaultRef = '';
        if (!referralCode) {
            if (role === 'distributor') defaultRef = '';
            if (role === 'reseller') defaultRef = 'kaiyya_distributor';
            if (role === 'subreselelr') defaultRef = 'kaiyya_reseller';
            if (role === '') defaultRef = 'kaiyya_subreseller';
        }
        if (!validateEmail(email)) {
            this.setState({ emailError: true });
            return;
        }
        const data = {
            fullname,
            email,
            phone,
            password,
            referralCode: Cookies.get('referral') || defaultRef,
            role
        };
        if (registerAs === 'personal' && referralRole === 'subreseller') {
            data.role = 'retail';
        }
        dispatch(action.register(data));
    }

    render() {
        const { errorAt } = this.props;
        const { fullname, email, phone, role, password, passwordView, registerAs, rulesDialog, emailError } = this.state;
        const referral = Cookies.get('referral') || '';
        const referralRole = Cookies.get('referral_role') || '';
        const referralName = Cookies.get('referral_name') || '';
        return (
            <>
                <Helmet>
                    <title>Register | Kaiyya Dress</title>
                </Helmet>
                <Main useHeader transparentHeader backTo="/login" title="Register">
                    <RegisterWrapper>
                        <BannerWrapper>
                            <img src={banner} alt="Kaiyya Register" />
                        </BannerWrapper>
                        <FormWrapper>
                            <p className="title">Selamat Datang!</p>
                            {!referral && !referralRole && (
                                <RoleSelector>
                                    <span role="button" onClick={() => this.setState({ registerAs: 'personal', role: 'retail' })} className={registerAs === 'personal' ? 'active' : ''}>Personal</span>
                                    <span role="button" onClick={() => this.setState({ registerAs: 'mitra', role: '' })} className={registerAs === 'mitra' ? 'active' : ''}>Mitra</span>
                                </RoleSelector>
                            )}
                            {referralName && (
                                <div className="ref">
                                    <Text block extraSmall>
                                        Anda diundang oleh
                                        <span>{referralName}</span>
                                    </Text>
                                </div>
                            )}
                            <form autoComplete="off" onSubmit={this.handleSubmit}>
                                <InputWrapper>
                                    <Input floatingLabel name="fullname" id="fullname" placeholder="Full Name" onChange={this.handleInput} autoComplete="off" style={{ textTransform: 'capitalize' }} value={fullname} />
                                    <Label floatingLabel htmlFor="fullname">Nama</Label>
                                </InputWrapper>
                                <InputWrapper error={errorAt === 'email' || emailError}>
                                    {errorAt === 'email' && (
                                        <ErrorWrapper id="error">
                                            <span>Alamat email sudah terdaftar</span>
                                        </ErrorWrapper>
                                    )}
                                    {emailError && (
                                        <ErrorWrapper id="error">
                                            <span>Alamat email tidak valid</span>
                                        </ErrorWrapper>
                                    )}
                                    <Input floatingLabel name="email" id="email" placeholder="Email" onChange={this.handleInput} value={email} />
                                    <Label floatingLabel htmlFor="email">Email</Label>
                                </InputWrapper>
                                <InputWrapper error={errorAt === 'phone'}>
                                    {errorAt === 'phone' && (
                                        <ErrorWrapper id="error">
                                            <span>Nomor HP sudah terdaftar</span>
                                        </ErrorWrapper>
                                    )}
                                    <PhoneNumberInput onChange={(value: string) => this.handlePhoneInput(value)} />
                                </InputWrapper>
                                {/* <InputWrapper error={errorAt === 'phone'}>
                                    {errorAt === 'phone' && (
                                        <ErrorWrapper id="error">
                                            <span>Nomor HP sudah terdaftar</span>
                                        </ErrorWrapper>
                                    )}
                                    <Input floatingLabel type="text" name="phone" id="phone" placeholder="Phone" onChange={this.handleInput} value={phone} />
                                    <Label floatingLabel htmlFor="phone">Nomor HP</Label>
                                </InputWrapper> */}
                                {registerAs === 'mitra' && !referral && (
                                    <InputWrapper>
                                        <Select name="role" id="role" placeholder="Role" value={role} onChange={this.handleInput}>
                                            <option value="">Pilih</option>
                                            <option value="distributor">Distributor</option>
                                            <option value="reseller">Reseller</option>
                                            <option value="subreseller">Sub-Reseller</option>
                                        </Select>
                                        <Label htmlFor="role">Mendaftar sebagai</Label>
                                    </InputWrapper>
                                )}
                                <InputWrapper>
                                    <Input floatingLabel type={passwordView ? 'password' : 'text'} name="password" id="password" placeholder="Password" onChange={this.handleInput} value={password} />
                                    <Label floatingLabel htmlFor="password">Password</Label>
                                    <div role="button" id="input-icon" onClick={() => this.setState({ passwordView: !passwordView })}>
                                        <Icon icon="eye" />
                                    </div>
                                </InputWrapper>
                                <AlertWrapper>
                                    <Icon icon="alert-circle" />
                                    <Text extraSmall>Pastikan anda sudah membaca </Text>
                                    <Text bold extraSmall style={{ margin: '0 5px', cursor: 'pointer' }} onClick={() => this.setState({ rulesDialog: true })}>Rules &amp; Kode Etik</Text>
                                    <Text extraSmall>Kaiyya</Text>
                                </AlertWrapper>
                                <Button type="submit" disabled={!email || !fullname || !phone || !password} fullWidth block primary onClick={this.handleSubmit}>Register</Button>
                                <InfoWrapper>
                                    <span>Sudah memiliki akun?</span>
                                </InfoWrapper>
                                <Button type="button" fullWidth block outline onClick={() => { window.location.href = '/login'; }}>Login</Button>
                            </form>
                        </FormWrapper>
                    </RegisterWrapper>
                    {rulesDialog && (
                        <RulesSheet handler={(visibility: boolean) => this.setState({ rulesDialog: visibility })} />
                    )}
                </Main>
            </>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        isRequest: state.authReducer.isRequest,
        isError: state.authReducer.isError,
        errorAt: state.authReducer.errorAt
    };
};

export default connect(mapStateToProps)(Register);
