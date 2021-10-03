import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Button } from '../../components/Styled';
import API from '../../configs/api';
import Main from '../../layouts/Main';

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    min-height: 100vh;
    background: var(--color-white);
`;

const SectionWrapper = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    padding: 10px 1.5rem;
    flex-direction: row;
    align-items: center;
    background: var(--color-white);
    justify-content: space-between;
    border-bottom: 1px solid #eee;

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
    span {
        color: #888888;
    }
`;

const SubmitWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    padding: 15px 1rem;
`;

interface State {
    password: string,
    passwordConfirm: string,
    oldPassword: string
}

class PasswordSettings extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            password: '',
            passwordConfirm: '',
            oldPassword: ''
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
        const { password, oldPassword } = this.state;
        // const uid = Cookies.get('kis-reset-uid') || '';
        const data = {
            body: {
                newPassword: password,
                oldPassword
            }
        };
        API.resetPasswordConfirm(data).then((res: any) => {
            console.log(res);
        }).catch((err: any) => {
            console.log(err);
        });
    }

    render() {
        const { password, passwordConfirm, oldPassword } = this.state;
        return (
            <>
                <Helmet>
                    <title>Password Baru | Kaiyya Dress</title>
                </Helmet>
                <Main useHeader paddingTop backBtn title="Password">
                    <Wrapper>
                        <SectionWrapper>
                            <div>
                                <label htmlFor="oldPassword">Password Saat Ini</label>
                                <input type="password" required name="oldPassword" id="oldPassword" autoComplete="off" placeholder="Ketik password anda saat ini" onChange={this.handleInput} value={oldPassword} />
                            </div>
                        </SectionWrapper>
                        <SectionWrapper>
                            <div>
                                <label htmlFor="password">Password Baru</label>
                                <input type="password" required name="password" id="password" autoComplete="off" placeholder="Ketik password baru" onChange={this.handleInput} value={password} />
                            </div>
                        </SectionWrapper>
                        <SectionWrapper>
                            <div>
                                <label htmlFor="passwordConfirm">Konfirmasi Password Baru</label>
                                <input type="password" required name="passwordConfirm" id="passwordConfirm" autoComplete="off" placeholder="Konfirmasi password baru anda" onChange={this.handleInput} value={passwordConfirm} />
                            </div>
                        </SectionWrapper>
                        <SubmitWrapper>
                            <Button disabled={!oldPassword || !password || !passwordConfirm || password !== passwordConfirm} block fullWidth primary onClick={this.handleSubmit}>Simpan</Button>
                        </SubmitWrapper>
                    </Wrapper>
                </Main>
            </>
        );
    }
}

export default PasswordSettings;
