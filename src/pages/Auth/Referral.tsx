import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoadingOverlay from '../../components/LoadingOverlay';
import API from '../../configs/api';
import Main from '../../layouts/Main';

interface ParamTypes {
    code: string
}

const Referral = () => {
    const { code } = useParams<ParamTypes>();

    const fetchData = async () => {
        const payload = {
            body: {
                referralCode: code
            }
        };
        await API.checkReferralCode(payload).then((res: any) => {
            Cookies.set('referral', res.data.code);
            Cookies.set('referral_role', res.data.role);
            window.location.href = '/register?ref=true';
        }).catch(() => {
            Cookies.set('referral', '');
            window.location.href = '/register';
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Main useHeader={false} paddingTop={false}>
            <LoadingOverlay />
        </Main>
    );
};

export default Referral;
