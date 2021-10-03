import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Button } from '../../components/Styled';
import API from '../../configs/api';
import action from '../../configs/redux/action';
import pushLocation from '../../configs/routes/pushLocation';
import CONSTANT from '../../constant';
import Main from '../../layouts/Main';

const Wrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
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

interface Props {
    dispatch: any
}

interface State {
    username: string,
    fullname: string,
    phone: string,
    email: string
}

class AccountSettings extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            username: '',
            fullname: '',
            phone: '',
            email: ''
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.fetchData();
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

    handleSubmit() {
        const { dispatch } = this.props;
        const { fullname, email, phone } = this.state;
        const data = {
            body: {
                fullname,
                email,
                phone
            }
        };
        dispatch(action.showFullscreenLoader());
        API.editProfile(data).then((res: any) => {
            dispatch(action.hideFullscreenLoader());
            if (res.status === false) {
                console.log(res);
            }
        });
    }

    async fetchData() {
        const { dispatch } = this.props;
        dispatch(action.showFullscreenLoader());
        dispatch({ type: CONSTANT.FETCH_ACCOUNT_DETAIL_REQUEST });
        API.fetchProfile().then((res: any) => {
            const { data } = res;
            dispatch({ type: CONSTANT.FETCH_ACCOUNT_DETAIL_SUCCESS, data });
            dispatch(action.hideFullscreenLoader());
            this.setState({
                username: data.username,
                fullname: data.fullname,
                phone: data.phone,
                email: data.email
            });
        });
    }

    render() {
        const { username, fullname, phone, email } = this.state;
        return (
            <Main useHeader paddingTop backBtn title="Pengaturan Akun">
                <Wrapper>
                    <SectionWrapper>
                        <div>
                            <p>Username</p>
                            <span>{username}</span>
                        </div>
                    </SectionWrapper>
                    <SectionWrapper>
                        <div>
                            <label htmlFor="fullname">Nama Lengkap</label>
                            <input type="text" required name="fullname" id="fullname" autoComplete="off" placeholder="Nama Lengkap" onChange={this.handleInput} value={fullname} />
                        </div>
                    </SectionWrapper>
                    <SectionWrapper>
                        <div>
                            <label htmlFor="email">Alamat Email</label>
                            <input type="email" required name="email" id="email" autoComplete="off" placeholder="email" onChange={this.handleInput} value={email} />
                        </div>
                    </SectionWrapper>
                    <SectionWrapper>
                        <div>
                            <label htmlFor="phone">Nomor HP</label>
                            <input type="text" required name="phone" id="phone" autoComplete="off" placeholder="Nomor HP" onChange={this.handleInput} value={phone} />
                        </div>
                    </SectionWrapper>
                    <SectionWrapper onClick={() => pushLocation.path('/settings/password')}>
                        <div>
                            <p>Password</p>
                            <span>Ketuk untuk merubah password</span>
                        </div>
                    </SectionWrapper>
                    <SubmitWrapper>
                        <Button disabled={!username || !fullname || !phone} block fullWidth primary onClick={this.handleSubmit}>Simpan</Button>
                    </SubmitWrapper>
                </Wrapper>
            </Main>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        username: state.accountReducer.username,
        defaultFullname: state.accountReducer.fullname,
        defaultPhone: state.accountReducer.phone,
        role: state.accountReducer.role
    };
};

export default connect(mapStateToProps)(AccountSettings);
