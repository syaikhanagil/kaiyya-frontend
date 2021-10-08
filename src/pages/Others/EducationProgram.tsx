import React from 'react';
import styled from 'styled-components';
import Main from '../../layouts/Main';

const Wrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: auto;
    padding: 0 1.5rem;
`;

const EducationProgram = () => {
    return (
        <Main useHeader paddingTop backBtn title="Program Edukasi Mitra">
            <Wrapper>
                Oke
            </Wrapper>
        </Main>
    );
};

export default EducationProgram;
