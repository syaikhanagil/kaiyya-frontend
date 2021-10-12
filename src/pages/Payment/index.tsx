import React from 'react';
// import { useParams } from 'react-router-dom';
// import Cookies from 'js-cookie';
import styled from 'styled-components';
import LoadingOverlay from '../../components/LoadingOverlay';
import API from '../../configs/api';
import Main from '../../layouts/Main';
import QrisMethod from './thisComponent/QrisMethod';
import VirtualAccountMethod from './thisComponent/VirtualAccountMethod';

const PaymentWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
`;

interface Props {
    match: any
}

interface State {
    data: any,
    paid: boolean,
    expired: string,
    checking: boolean,
    ready: boolean
}

class Payment extends React.Component<Props, State> {
    intervalCheck: any = {};

    constructor(props: Props) {
        super(props);
        this.state = {
            data: {},
            paid: false,
            expired: '',
            checking: false,
            ready: false
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    componentWillUnmount() {
        const { checking } = this.state;
        if (checking) clearInterval(this.intervalCheck);
    }

    startChecking = () => {
        const { match: { params: { paymentId } } } = this.props;
        this.intervalCheck = setInterval(() => {
            API.checkPaymentSuccess({
                params: `/${paymentId}`
            }).then((res: any) => {
                if (res.payment_status === 'paid') {
                    window.location.href = `/payment-success/${paymentId}`;
                }
            });
        }, 10000);
    }

    fetchData = () => {
        const { match: { params: { paymentId } } } = this.props;
        const payload = {
            params: `/${paymentId}`
        };
        API.fetchPayment(payload).then((res: any) => {
            this.setState({ data: res.data.detail, expired: res.data.expired });
            if (res.data.status === 'paid') {
                this.setState({ paid: true });
            }
            if (res.data.status !== 'paid') {
                this.setState({ paid: false, checking: true });
                this.startChecking();
            }
            setTimeout(() => {
                this.setState({ ready: true });
            }, 1000);
        });
    }

    render() {
        const { data, paid, expired, ready } = this.state;
        return (
            <Main useHeader backTo="/orders" title="Pembayaran">
                <PaymentWrapper>
                    {data.method === 'qris' && (
                        <QrisMethod data={data} />
                    )}
                    {data.method === 'virtual-account' && (
                        <>
                            <VirtualAccountMethod data={data} expired={expired} paid={paid} />
                        </>
                    )}
                </PaymentWrapper>
                {!ready && (
                    <LoadingOverlay />
                )}
            </Main>
        );
    }
}

// const Payment = () => {
//     const { paymentId } = useParams<any>();
//     const [data, setData] = useState<any>({});
//     const [expired, setExpired] = useState('');
//     const [paid, setPaid] = useState(false);
//     const [ready, setReady] = useState(false);
//     const [checkRunning, setCheckRunning] = useState(false);
//     let intervalCheck = setInterval(() => {
//         API.checkPaymentSuccess({
//             params: `/${paymentId}`
//         }).then((res: any) => {
//             if (res.payment_status === 'unpaid') {
//                 console.log(res);
//             }
//             if (res.payment_status === 'paid') {
//                 window.location.href = '/success-payment';
//             }
//         });
//     }, 10000);

//     const fetchData = () => {
//         const payload = {
//             params: `/${paymentId}`
//         };
//         API.fetchPayment(payload).then((res: any) => {
//             setData(res.data.detail);
//             setExpired(res.data.expired);
//             if (res.data.status === 'paid') {
//                 setPaid(true);
//             }
//             if (res.data.status !== 'paid') {
//                 setCheckRunning(true);
//             }
//             setTimeout(() => {
//                 setReady(true);
//             }, 1000);
//         });
//     };

//     useEffect(() => {
//         Cookies.remove('checkout-items');
//         if (paymentId) {
//             fetchData();
//         } else {
//             window.location.href = '/not-found';
//         }
//     }, []);

//     useEffect(() => {
//         if (checkRunning) {
//             startChecking();
//         } else {
//             stopChecking();
//         }
//     }, [checkRunning]);

//     const startChecking = () => {
//         intervalCheck = setInterval(() => {
//             API.checkPaymentSuccess({
//                 params: `/${paymentId}`
//             }).then((res: any) => {
//                 if (res.payment_status === 'unpaid') {
//                     console.log(res);
//                 }
//                 if (res.payment_status === 'paid') {
//                     window.location.href = '/success-payment';
//                 }
//             });
//         }, 10000);
//     };

//     const stopChecking = () => {
//         clearInterval(intervalCheck);
//     };

//     return (
//         <Main useHeader backTo="/orders" title="Pembayaran">
//             <PaymentWrapper>
//                 {data.method === 'qris' && (
//                     <QrisMethod data={data} />
//                 )}
//                 {data.method === 'virtual-account' && (
//                     <>
//                         <VirtualAccountMethod data={data} expired={expired} paid={paid} />
//                     </>
//                 )}
//             </PaymentWrapper>
//             {!ready && (
//                 <LoadingOverlay />
//             )}
//         </Main>
//     );
// };

export default Payment;
