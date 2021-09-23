import React from 'react';
import styled from 'styled-components';
import BottomSheet from '../../../components/BottomSheet';

const DescriptionWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    padding: 10px 1rem;
`;

interface Props {
    // eslint-disable-next-line no-unused-vars
    handler: (visibiliy: boolean) => void,
    content: any
}

const DescriptionSheet = (props: Props) => {
    const { handler, content } = props;

    return (
        <BottomSheet title="Deskripsi" fullHeight handler={handler}>
            <DescriptionWrapper dangerouslySetInnerHTML={{ __html: content }} />
        </BottomSheet>
    );
};

export default DescriptionSheet;
