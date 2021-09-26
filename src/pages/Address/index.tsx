import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import action from '../../configs/redux/action';
import Main from '../../layouts/Main';
import AddressItem from './thisComponent/AddressItem';

const AddressWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
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
