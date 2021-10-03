import React from 'react';
import styled from 'styled-components';
import Icon from '../../../components/Icon';
import pushLocation from '../../../configs/routes/pushLocation';
// import pushLocation from '../../../configs/routes/pushLocation';

const AddressItemWrapper = styled.div`
    position: relative;
    display: flex;
    padding: 10px 1.5rem;
    background: var(--color-white);
    border-bottom: 1px solid #eee;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    .areas {
        position: relative;
        p {
            padding: 0 5px 0 0;
        }
    }
    #info, #action {
        width: 100%;
    }
    #action {
        position: relative;
        display: flex;
        flex-direction: column;
        flex-basis: 20%;
        align-items: flex-end;
        justify-content: center;
    }
`;

const Text = styled('p') <{ bold?: boolean, extraSmall?: boolean, block?: boolean }>`
    position: relative;
    display: ${(props) => (props.block ? 'block' : 'inline-block')};
    font-weight: ${(props) => (props.bold ? '600' : '400')};
    font-size: ${(props) => (props.extraSmall ? 'var(--font-extra-small)' : 'var(--font-small)')};
`;

interface Props {
    data: any
}

const AddressItem = (props: Props) => {
    const { data } = props;

    return (
        <AddressItemWrapper onClick={() => pushLocation.path(`/account/address/edit/${data.id}`)}>
            <div id="info">
                <Text block bold>{data.name}</Text>
                <Text block bold extraSmall>{data.phone}</Text>
                <Text extraSmall>{data.detail}</Text>
                <div className="areas">
                    <Text extraSmall>{`${data.subdistrict}, `}</Text>
                    <Text extraSmall>{`${data.city}, `}</Text>
                    <Text extraSmall>{data.province}</Text>
                </div>
            </div>
            <div id="action">
                <Icon icon="edit" />
            </div>
        </AddressItemWrapper>
    );
};

export default AddressItem;
