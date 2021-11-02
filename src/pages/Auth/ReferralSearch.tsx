import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoadingOverlay from '../../components/LoadingOverlay';
import API from '../../configs/api';
import Main from '../../layouts/Main';

interface ParamTypes {
    code: string
}

const ReferralSearch = () => {
    const { code } = useParams<ParamTypes>();

    const fetchData = async () => {
        const payload = {
            body: {
                code
            }
        };
        await API.checkReferralCode(payload).then((res: any) => {
            const inTwoHours = new Date(new Date().getTime() + 119 * 60 * 1000);
            Cookies.set('referral', code, { expires: inTwoHours });
            Cookies.set('referral_name', res.data.fullname, { expires: inTwoHours });
            Cookies.set('referral_role', res.data.role, { expires: inTwoHours });
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

export default ReferralSearch;
