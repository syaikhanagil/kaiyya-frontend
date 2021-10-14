import React from 'react';
import styled from 'styled-components';
import Icon from '../../../components/Icon';
import { Text } from '../../../components/Styled';
// import pushLocation from '../../../configs/routes/pushLocation';
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

const Badge = styled.div`
    position: absolute;
    top: 10px;
    right: 1rem;
    padding: 2px 10px;
    background: var(--primary-transparent);
    border-radius: 50px;
`;

interface Props {
    data: any,
    // eslint-disable-next-line no-unused-vars
    onSelect: (id: string) => void
}

const AddressItem = (props: Props) => {
    const { data, onSelect } = props;

    return (
        <AddressItemWrapper onClick={() => onSelect(data.id)}>
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
            {data.is_default && (
                <Badge>
                    <Text extraSmall>Alamat Utama</Text>
                </Badge>
            )}
        </AddressItemWrapper>
    );
};

export default AddressItem;
