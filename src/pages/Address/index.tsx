import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Icon from '../../components/Icon';
import { Text } from '../../components/Styled';
import action from '../../configs/redux/action';
import Main from '../../layouts/Main';
import AddressItem from './thisComponent/AddressItem';

const AddressWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
`;

const NoItemWrapper = styled.div`
    position: relative;
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .feather {
        height: 45px;
        width: 45px;
    }
`;

const Address = (props: any) => {
    const { dispatch, items } = props;

    const fetchData = () => {
        dispatch(action.fetchAddress());
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Main useHeader paddingTop backTo="/" title="Alamat" moreBtn moreIcon="plus" onMoreClick={() => { window.location.href = '/account/address/new'; }}>
            <AddressWrapper>
                {items.length < 1 && (
                    <NoItemWrapper>
                        <Icon icon="map-pin" />
                        <Text bold block alignCenter marginY>Belum ada alamat yang disimpan</Text>
                    </NoItemWrapper>
                )}
                {items.map((item: any, idx: any) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <AddressItem key={idx} data={item} />
                ))}
            </AddressWrapper>
        </Main>
    );
};

const mapStateToProps = (state: any) => {
    return {
        items: state.addressReducer.items
    };
};

export default connect(mapStateToProps)(Address);
