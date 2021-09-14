import React from 'react';
import styled from 'styled-components';
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
`;

const PageNotFound = () => {
    return (
        <Main backBtn>
            <PageWrapper>
                <h2>404</h2>
                <p>Page Not Found</p>
            </PageWrapper>
        </Main>
    );
};

export default PageNotFound;
