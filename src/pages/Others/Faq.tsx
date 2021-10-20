/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Accordion, { AccordionBody, AccordionHeader } from '../../components/Accordion';
import Loading from '../../components/Loading';
import API from '../../configs/api';
import Main from '../../layouts/Main';

const Wrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    padding: 10px 0 0;
`;

const Faq = () => {
    const [items, setItems] = useState([]);
    const [ready, setReady] = useState(false);
    useEffect(() => {
        API.fetchFaq().then((res: any) => {
            setItems(res.data);
            setTimeout(() => {
                setReady(true);
            }, 1000);
        });
    }, []);

    return (
        <Main useHeader paddingTop backBtn title="Faq" paddingBottom backgroundWhite>
            <Wrapper>
                {ready && items.map((i: any, idx: any) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Accordion key={idx}>
                        <AccordionHeader id={`acc-${idx}`}>{i.title}</AccordionHeader>
                        <AccordionBody id={`acc-${idx}-content`}>
                            <div dangerouslySetInnerHTML={{ __html: i.content }} />
                        </AccordionBody>
                    </Accordion>
                ))}
                {!ready && (
                    <Loading type="ring" alignCenter />
                )}
            </Wrapper>
        </Main>
    );
};

export default Faq;
