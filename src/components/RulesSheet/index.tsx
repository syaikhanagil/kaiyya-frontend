import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import API from '../../configs/api';
import Accordion, { AccordionBody, AccordionHeader } from '../Accordion';
import BottomSheet from '../BottomSheet';
import Loading from '../Loading';

const RulesWrapper = styled.div`
    position: relative;
    width: 100%;
    padding: 10px 1rem;
`;

interface Props {
    // eslint-disable-next-line no-unused-vars
    handler: (visibility: boolean) => void
}

const RulesSheet = (props: Props) => {
    const { handler } = props;
    const [items, setItems] = useState([]);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        API.fetchRules().then((res: any) => {
            setItems(res.data);
            setTimeout(() => {
                setReady(true);
            }, 1000);
        });
    }, []);

    return (
        <BottomSheet title="Rules &amp; Kode Etik" handler={handler} fullHeight>
            <RulesWrapper>
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
            </RulesWrapper>
        </BottomSheet>
    );
};

export default RulesSheet;
