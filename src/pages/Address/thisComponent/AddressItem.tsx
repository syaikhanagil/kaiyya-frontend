import React from 'react';
import styled from 'styled-components';

const AddressItemWrapper = styled.div`
    position: relative;
    padding: 10px 1.5rem;
    background: var(--color-white);
    border-bottom: 1px solid #eee;
    .areas {
        position: relative;
        p {
            padding: 0 5px 0 0;
        }
    }
`;

const Text = styled('p') <{ bold?: boolean, extraSmall?: boolean, block?: boolean }>`
    position: relative;
    display: ${(props) => (props.block ? 'block' : 'inline-block')};;
    font-weight: ${(props) => (props.bold ? '600' : '400')};
    font-size: ${(props) => (props.extraSmall ? 'var(--font-extra-small)' : 'var(--font-small)')};
`;

interface Props {
    data: any
}

const AddressItem = (props: Props) => {
    const { data } = props;

    return (
        <AddressItemWrapper>
            <Text block bold>{data.name}</Text>
            <Text block bold extraSmall>{data.phone}</Text>
            <Text extraSmall>{data.detail}</Text>
            <div className="areas">
                <Text extraSmall>{`${data.subdistrict}, `}</Text>
                <Text extraSmall>{`${data.city}, `}</Text>
                <Text extraSmall>{data.province}</Text>
            </div>
        </AddressItemWrapper>
    );
};

export default AddressItem;
