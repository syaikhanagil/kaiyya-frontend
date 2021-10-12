import React from 'react';
import styled from 'styled-components';
import { Button, Text } from '../../components/Styled';
import pushLocation from '../../configs/routes/pushLocation';
import Main from '../../layouts/Main';

const PageWrapper = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    max-width: 480px;
    min-height: 100vh;
    margin: auto;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    h2 {
        font-size: 2rem;
        font-weight: 900;
    }
    p {
        margin-bottom: 10px;
    }
`;

const PageNotFound = () => {
    return (
        <Main backBtn>
            <PageWrapper>
                <h2>404</h2>
                <Text block>Halaman tidak ditemukan</Text>
                <Button primary onClick={() => pushLocation.path('/')}>Kembali</Button>
            </PageWrapper>
        </Main>
    );
};

export default PageNotFound;
