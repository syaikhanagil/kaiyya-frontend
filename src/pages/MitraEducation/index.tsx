import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import action from '../../configs/redux/action';
import DownlineItem from './thisComponent/DownlineItem';

const MitraEducationWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
`;

const MitraEducation = (props: any) => {
    const { dispatch, downline } = props;

    useEffect(() => {
        dispatch(action.fetchReferralDownline());
    }, []);

    return (
        <MitraEducationWrapper>
            {downline.map((item: any, idx: any) => (
                // eslint-disable-next-line react/no-array-index-key
                <DownlineItem key={idx} data={item} />
            ))}
        </MitraEducationWrapper>
    );
};

const mapStateToProps = (state: any) => {
    return {
        downline: state.referralReducer.downline
    };
};

export default connect(mapStateToProps)(MitraEducation);
