// verify?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MTRmOTVlZWNmYjE0ZjI5NGY4ZjJhODYiLCJpYXQiOjE2MzI2MDU2Nzh9.kV0ofp7s0oA6IBO-bZOKYbPwqZ70CtYa5vxBjqStgR8
import React, { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import LoadingOverlay from '../../components/LoadingOverlay';
import API from '../../configs/api';
import useQuery from '../../configs/routes/useQuery';
import Main from '../../layouts/Main';

const Verify = () => {
    const query = useQuery();
    const token = query.get('token');

    const fetchData = async () => {
        const payload = {
            body: {
                token
            }
        };
        await API.verifyRequest(payload).then(() => {
            window.location.href = '/account';
            // console.log('ok');
        }).catch(() => {
            console.log('no ok');
            window.location.href = '/account';
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

export default Verify;
