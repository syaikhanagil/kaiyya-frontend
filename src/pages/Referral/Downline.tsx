import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import action from '../../configs/redux/action';

const Downline = (props: any) => {
    const { dispatch } = props;

    useEffect(() => {
        dispatch(action.fetchReferralDownline());
    }, []);

    return (
        <div>
            Downline
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        downline: state.referralReducer.downline
    };
};

export default connect(mapStateToProps)(Downline);
