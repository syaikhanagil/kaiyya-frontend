import React from 'react';
import styled from 'styled-components';
import Icon from '../../../components/Icon';
import mitra from '../../../assets/svg/mitra-blue.svg';

const JoinWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    margin: 10px 0;
    background: var(--color-white);
    justify-content: space-between;
    align-items: center;
    padding: 15px 1rem;
`;

const Desc = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    flex-basis: 75%;
    p {
        font-weight: 700;
        font-size: var(--font-small);
    }
    span {
        font-size: var(--font-extra-small);
    }
    a {
        display: block;
        font-weight: 600;
        font-size: var(--font-small);
        color: var(--primary);
        text-decoration: none;
        margin: 10px 0 0;
    }
`;

const IconWraper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    text-align: right;
    flex-basis: 25%;
`;

const JoinMitra = () => {
    return (
        <JoinWrapper>
            <Desc>
                <p>Join Mitra Kaiyya</p>
                <span>Berikan edukasi yang bermanfaat kepada mitra anda, dan dapatkan penghasilan tambahan.</span>
                <a href="/join-mitra">Join sekarang</a>
            </Desc>
            <IconWraper>
                <Icon custom icon={mitra} />
            </IconWraper>
        </JoinWrapper>
    );
};

export default JoinMitra;
