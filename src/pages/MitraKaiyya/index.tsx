import React from 'react';
import styled from 'styled-components';
import Main from '../../layouts/Main';
import MitraItem from './thisComponent/MitraItem';

const MitraKaiyyaWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    padding: 10px 1rem;
`;

class MitraKaiyya extends React.Component {
    render() {
        return (
            <Main useHeader backBtn title="Mitra Kaiyya" paddingTop>
                <MitraKaiyyaWrapper>
                    <MitraItem />
                </MitraKaiyyaWrapper>
            </Main>
        );
    }
}

export default MitraKaiyya;
