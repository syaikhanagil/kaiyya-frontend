import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import action from '../../configs/redux/action';
import Main from '../../layouts/Main';
import BalanceCard from './thisComponent/BalanceCard';
import DownlineItem from './thisComponent/DownlineItem';

const ReferralWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
`;

const ReferralHeader = styled.div`
    position: relative;
    display: block;
    width: 100%;
    padding: 50px 1.5rem 0;
    margin-bottom: 10px;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 90%;
        background: var(--primary);
    }
`;

const ReferralBody = styled.div`
    position: relative;
    display: block;
    width: 100%;
`;

const Referral = (props: any) => {
    const { dispatch, downline } = props;

    useEffect(() => {
        dispatch(action.fetchAccountDetail());
        dispatch(action.fetchReferralDownline());
    }, []);

    return (
        <Main useHeader transparentHeader backBtn title="Fee Edukasi" backgroundWhite>
            <ReferralWrapper>
                <ReferralHeader>
                    <BalanceCard />
                </ReferralHeader>
                <ReferralBody>
                    {downline.map((item: any, idx: any) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <DownlineItem key={idx} data={item} />
                    ))}
                </ReferralBody>
            </ReferralWrapper>
        </Main>
    );
};

const mapStateToProps = (state: any) => {
    return {
        downline: state.referralReducer.downline,
        fullname: state.accountReducer.fullname,
        username: state.accountReducer.username,
        addons: state.accountReducer.addons
    };
};

export default connect(mapStateToProps)(Referral);
