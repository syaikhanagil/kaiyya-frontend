import React from 'react';
import moment from 'moment';
import 'moment/locale/id';
import styled from 'styled-components';

const CountdownWrapper = styled.div <{ alignCenter?: boolean }>`
    position: relative;
    display: flex;
    padding: 5px 0;
    width: auto;
    justify-content: ${(props) => (props.alignCenter ? 'center' : 'flex-start')};
`;

const CountdownTime = styled.div`
    position: relative;
    display: flex;
    height: 30px;
    width: 40px;
    margin: 0 2.5px;
    background: var(--color-black);
    color: var(--color-white);
    align-items: center;
    justify-content: center;
    &:firts-of-type {
        margin-left: 0;
    }
    &:end-of-type {
        margin-right: 0;
    }
`;

interface Props {
    endTime: string,
    alignCenter?: boolean
}

interface State {
    hours: string,
    minutes: string,
    seconds: string
}

class Countdown extends React.Component<Props, State> {
    intervalCountdown: any = {};

    constructor(props: Props) {
        super(props);
        this.state = {
            hours: '',
            minutes: '',
            seconds: ''
        };
    }

    componentDidMount() {
        const { endTime } = this.props;
        this.intervalCountdown = setInterval(() => {
            const then: any = moment(endTime);
            const now: any = moment();
            const countdown = moment(then - now);
            const hours = countdown.utc().format('HH');
            const minutes = countdown.utc().format('mm');
            const seconds = countdown.utc().format('ss');
            this.setState({ hours, minutes, seconds });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalCountdown);
    }

    render() {
        const { alignCenter } = this.props;
        const { hours, minutes, seconds } = this.state;
        return (
            <CountdownWrapper alignCenter={alignCenter}>
                <CountdownTime>{hours}</CountdownTime>
                <CountdownTime>{minutes}</CountdownTime>
                <CountdownTime>{seconds}</CountdownTime>
            </CountdownWrapper>
        );
    }
}

export default Countdown;
