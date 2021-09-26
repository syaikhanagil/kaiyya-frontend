// verify?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MTRmOTVlZWNmYjE0ZjI5NGY4ZjJhODYiLCJpYXQiOjE2MzI2MDU2Nzh9.kV0ofp7s0oA6IBO-bZOKYbPwqZ70CtYa5vxBjqStgR8
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoadingOverlay from '../../components/LoadingOverlay';
import API from '../../configs/api';
import useQuery from '../../configs/routes/useQuery';
import Main from '../../layouts/Main';

interface ParamTypes {
    token: string
}

const Verify = () => {
    const { token } = useParams<ParamTypes>();
    const query = useQuery();
    console.log(query);

    const fetchData = async () => {
        const payload = {
            body: {
                token
            }
        };
        await API.verifyRequest(payload).then(() => {
            window.location.href = '/register?ref=true';
        }).catch(() => {
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

export default Verify;
