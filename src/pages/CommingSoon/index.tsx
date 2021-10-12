import React from 'react';
import styled from 'styled-components';
import Main from '../../layouts/Main';
import soonIcon from '../../assets/svg/radio-outline.svg';
import { Button, Text } from '../../components/Styled';
import pushLocation from '../../configs/routes/pushLocation';

const CommingSoonWrapper = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    padding: 0 1.5rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const CommingSoonImg = styled.div`
    position: relative;
    display: block;
    height: 120px;
    width: 100%;
    text-align: center;
    img {
        position: relative;
        height: 100%;
        margin: 0 auto;
    }
`;

const CommingSoon = () => {
    return (
        <Main backgroundWhite useHeader backBtn title="Comming Soon">
            <CommingSoonWrapper>
                <CommingSoonImg>
                    <img src={soonIcon} alt="kaiyya-soon" />
                </CommingSoonImg>
                <Text block bold alignCenter marginY>Comming Soon</Text>
                <Button block fullWidth primary onClick={() => pushLocation.path('/')}>Kembali</Button>
            </CommingSoonWrapper>
        </Main>
    );
};

export default CommingSoon;
