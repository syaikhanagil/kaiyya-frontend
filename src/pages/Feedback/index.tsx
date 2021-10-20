import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Icon from '../../components/Icon';
import { Button, InputWrapper, Label, TextArea } from '../../components/Styled';
import action from '../../configs/redux/action';
import Main from '../../layouts/Main';

const FeedbackWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: auto;
    padding: 15px 1rem;
`;

const StarWrapper = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: auto;
    margin-bottom: 20px;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const StarBox = styled.div`
    position: relative;
    display: block;
    width: auto;
    margin: 0 5px;
    color: #ffae30;
    cursor: pointer;
    .feather {
        width: 36px;
        height: 36px;
        stroke-width: 1px;
    }
    &.active .feather {
        fill: #ffae30;
    }
`;

interface Props {
    loggedIn: boolean
    fullname: string,
    email: string,
    dispatch: any
}

interface State {
    message: string,
    star: number
}

class Feedback extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            message: '',
            star: 0
        };
        this.handleInput = this.handleInput.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    handleInput(event: { target: { id: any; value: any; }; }) {
        const newState = { [event.target.id]: event.target.value } as Pick<State, keyof State>;
        this.setState(newState);
    }

    handleStar(value: number) {
        this.setState({ star: value });
    }

    fetchData() {
        const { dispatch } = this.props;
        dispatch(action.fetchAccountDetail());
    }

    render() {
        // const { email, fullname } = this.props;
        const { message, star } = this.state;
        return (
            <Main useHeader backBtn title="Feedback" paddingTop backgroundWhite>
                <FeedbackWrapper>
                    <StarWrapper>
                        <StarBox className={star > 0 ? 'active' : ''} onClick={() => this.handleStar(1)}>
                            <Icon icon="star" />
                        </StarBox>
                        <StarBox className={star > 1 ? 'active' : ''} onClick={() => this.handleStar(2)}>
                            <Icon icon="star" />
                        </StarBox>
                        <StarBox className={star > 2 ? 'active' : ''} onClick={() => this.handleStar(3)}>
                            <Icon icon="star" />
                        </StarBox>
                        <StarBox className={star > 3 ? 'active' : ''} onClick={() => this.handleStar(4)}>
                            <Icon icon="star" />
                        </StarBox>
                        <StarBox className={star > 4 ? 'active' : ''} onClick={() => this.handleStar(5)}>
                            <Icon icon="star" />
                        </StarBox>
                    </StarWrapper>
                    <InputWrapper>
                        <TextArea required name="message" id="message" placeholder="Pesan" onChange={this.handleInput} rows={6} value={message} style={{ resize: 'none' }} />
                        <Label htmlFor="message">Pesan</Label>
                    </InputWrapper>
                    <Button block fullWidth primary disabled={!message}>Kirim Feedback</Button>
                </FeedbackWrapper>
            </Main>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        loggedIn: state.authReducer.loggedIn,
        fullname: state.accountReducer.fullname,
        email: state.accountReducer.email
    };
};

export default connect(mapStateToProps)(Feedback);
