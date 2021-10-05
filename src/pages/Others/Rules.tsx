import React from 'react';
import styled from 'styled-components';
import Accordion, { AccordionBody, AccordionHeader } from '../../components/Accordion';
import Main from '../../layouts/Main';

const Wrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    padding: 0;
`;

const Rules = () => {
    return (
        <Main useHeader paddingTop backTo="/" title="Rules &amp; Kode Etik">
            <Wrapper>
                <Accordion>
                    <AccordionHeader id="acc-1">Halo</AccordionHeader>
                    <AccordionBody id="acc-1-content">
                        Oke
                    </AccordionBody>
                </Accordion>
            </Wrapper>
        </Main>
    );
};

export default Rules;
