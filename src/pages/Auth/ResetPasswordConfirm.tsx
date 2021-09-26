import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoadingOverlay from '../../components/LoadingOverlay';
import API from '../../configs/api';
import Main from '../../layouts/Main';

interface ParamTypes {
    token: string
}

const ResetPasswordConfirm = () => {
    const { token } = useParams<ParamTypes>();

    const fetchData = async () => {
        const payload = {
            body: {
                token
            }
        };
        await API.resetPasswordVerify(payload).then((res: any) => {
            Cookies.set('kis-reset-uid', res.data.uid);
            window.location.href = '/create-password';
        }).catch(() => {
            Cookies.set('kis-reset-token', '');
            Cookies.set('kis-reset-uid', '');
            window.location.href = '/reset-password';
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

export default ResetPasswordConfirm;
