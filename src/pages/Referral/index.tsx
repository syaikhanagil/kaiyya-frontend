import React, { useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Main from '../../layouts/Main';
import Downline from './Downline';
import Income from './Income';

const ReferralWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
`;

const ReferralHeader = styled.div`
    position: sticky;
    display: flex;
    width: 100%;
    height: auto;
    background: var(--color-white);
    border-bottom: 1px solid #eee;
    padding: 0;
    top: 46px;
    overflow: hidden;
    user-select: none;
    z-index: 1;
`;

const ReferralFilter = styled.div`
    position: relative;
    display: block;
    width: 100%;
    padding: 10px 10px;
    margin: 0;
    text-align: center;
    white-space: nowrap;
    border-bottom: 2px solid var(--transparent);
    border-radius: 0;
    cursor: pointer;
    
    &.active {
        color: var(--primary);
        border-bottom: 2px solid var(--primary);
    }

    span {
        font-size: var(--font-small);
    }
`;

const ReferralBody = styled.div`
    position: relative;
    display: block;
    width: 100%;
`;

const Referral = () => {
    const [activeMenu, setActiveMenu] = useState('downline');
    const menuList = [
        { id: 0, type: 'downline', name: 'Jaringan', page: '/referral/downline' },
        { id: 1, type: 'income', name: 'Pendapatan', page: '/referral/income' }
    ];

    return (
        <Main useHeader paddingTop backBtn title="Referral">
            <ReferralWrapper>
                <ReferralHeader>
                    {menuList.map((i) => (
                        <ReferralFilter key={i.id} className={activeMenu === i.type ? 'active' : ''} onClick={() => setActiveMenu(i.type)}>
                            <span>{i.name}</span>
                        </ReferralFilter>
                    ))}
                </ReferralHeader>
            </ReferralWrapper>
            <ReferralBody>
                {activeMenu === 'downline' && (
                    <Downline />
                )}
                {activeMenu === 'income' && (
                    <Income />
                )}
            </ReferralBody>
        </Main>
    );
};

export default Referral;
