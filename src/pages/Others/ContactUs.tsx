import React from 'react';
import styled from 'styled-components';
import { Text } from '../../components/Styled';
import Main from '../../layouts/Main';

const ContactUsWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    padding: 0 1rem;
`;

const ContactUs = () => {
    return (
        <Main useHeader backBtn paddingTop title="Hubungi Kami" backgroundWhite>
            <ContactUsWrapper>
                <Text block bold marginY>Admin Kaiyya</Text>
                <Text block extraSmall>Retail 628118085127</Text>
                <Text block extraSmall>Mitra 628118085128</Text>
                <Text block bold marginY>Kantor Kaiyya</Text>
                <Text block extraSmall>Kantor Kaiyya</Text>
            </ContactUsWrapper>
        </Main>
    );
};

export default ContactUs;
