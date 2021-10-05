import React from 'react';
import styled from 'styled-components';
import Main from '../../layouts/Main';

const WithdrawWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
`;

const Withdraw = () => {
    return (
        <Main useHeader backBtn title="Cairkan Imbalan">
            <WithdrawWrapper>
                Oke
            </WithdrawWrapper>
        </Main>
    );
};

export default Withdraw;
