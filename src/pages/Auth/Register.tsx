import React from 'react';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import Main from '../../layouts/Main';
import { Button, Input, InputWrapper, Label, Select } from '../../components/Styled';
import Icon from '../../components/Icon';
import action from '../../configs/redux/action';
// import logo from '../../assets/img/logo-kaiyya.png';
import banner from '../../assets/img/banner-cherry.jpg';

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
    padding: 25px 1rem;
    margin-top: -25px;
    background: var(--color-white);
    border-radius: 15px 15px 0 0;
    text-align: center;
    form {
        width: 100%;
        height: 100%;
        text-align: default;
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

interface State {
    fullname: string,
    email: string,
    phone: string,
    role: string,
    password: string,
    passwordView: boolean,
    registerAs: string
}

class Register extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            fullname: '',
            email: '',
            phone: '',
            role: '',
            password: '',
            passwordView: true,
            registerAs: 'personal'
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { location } = this.props;
        if (location.search !== '?ref=true') {
            Cookies.remove('referral');
            Cookies.remove('referral_role');
        }
    }

    handleInput(event: { target: { id: any; value: any; }; }) {
        if (event.target.id === 'phone') {
            const regex = /^[0-9]{0,13}$/;
            if (regex.test(event.target.value)) {
                this.setState({ phone: event.target.value });
            }
            return;
        }
        const newState = { [event.target.id]: event.target.value } as Pick<State, keyof State>;
        this.setState(newState);
    }

    handleSubmit(event: any) {
        event.preventDefault();
        const { dispatch } = this.props;
        const { fullname, email, phone, role, password, registerAs } = this.state;
        const data = {
            fullname,
            email,
            phone,
            password,
            referralCode: Cookies.get('referral') || '',
            role
        };
        if (registerAs === 'personal') {
            data.role = 'retail';
        }
        dispatch(action.register(data));
    }

    render() {
        const { fullname, email, phone, role, password, passwordView, registerAs } = this.state;
        const referral = Cookies.get('referral') || '';
        const referralRole = Cookies.get('referral_role') || '';
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
                            <RoleSelector>
                                <span role="button" onClick={() => this.setState({ registerAs: 'personal', role: '' })} className={registerAs === 'personal' ? 'active' : ''}>Personal</span>
                                <span role="button" onClick={() => this.setState({ registerAs: 'mitra', role: '' })} className={registerAs === 'mitra' ? 'active' : ''}>Mitra</span>
                            </RoleSelector>
                            <form autoComplete="off" onSubmit={this.handleSubmit}>
                                <InputWrapper>
                                    <Input floatingLabel name="fullname" id="fullname" placeholder="Full Name" onChange={this.handleInput} value={fullname} />
                                    <Label floatingLabel htmlFor="fullname">Nama</Label>
                                </InputWrapper>
                                <InputWrapper>
                                    <Input floatingLabel name="email" id="email" placeholder="Email" onChange={this.handleInput} value={email} />
                                    <Label floatingLabel htmlFor="email">Email</Label>
                                </InputWrapper>
                                <InputWrapper>
                                    <Input floatingLabel type="text" name="phone" id="phone" placeholder="Phone" onChange={this.handleInput} value={phone} />
                                    <Label floatingLabel htmlFor="phone">Nomor HP</Label>
                                </InputWrapper>
                                {registerAs === 'mitra' && (
                                    <InputWrapper>
                                        <Select name="role" id="role" placeholder="Role" value={role} onChange={this.handleInput}>
                                            <option value="">Pilih</option>
                                            {referral && referralRole === 'distributor' && (
                                                <>
                                                    <option value="reseller">Reseller</option>
                                                    <option value="subreseller">Sub-Reseller</option>
                                                </>
                                            )}
                                            {referral && referralRole === 'reseller' && (
                                                <>
                                                    <option value="subreseller">Sub-Reseller</option>
                                                </>
                                            )}
                                            {!referral && (
                                                <>
                                                    <option value="distributor">Distributor</option>
                                                    <option value="reseller">Reseller</option>
                                                    <option value="subreseller">Sub-Reseller</option>
                                                </>
                                            )}
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
                                <Button type="submit" disabled={!email && !fullname && !phone && !password} fullWidth block primary onClick={this.handleSubmit}>Register</Button>
                                <InfoWrapper>
                                    <span>Sudah memiliki akun?</span>
                                </InfoWrapper>
                                <Button type="button" fullWidth block outline onClick={() => { window.location.href = '/login'; }}>Login</Button>
                            </form>
                        </FormWrapper>
                    </RegisterWrapper>
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

export default withRouter(connect(mapStateToProps)(Register));
