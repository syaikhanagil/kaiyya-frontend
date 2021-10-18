import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import action from '../../configs/redux/action';
import Main from '../../layouts/Main';
import NotificationItem from './ thisComponent/NotificationItem';

interface Props {
    items: any,
    dispatch: any
}
const Notification = (props: Props) => {
    const { items, dispatch } = props;

    useEffect(() => {
        dispatch(action.fetchNotification());
    }, []);

    return (
        <Main useHeader paddingTop backBtn title="Notifikasi">
            {items.map((i: any, idx: any) => (
                // eslint-disable-next-line react/no-array-index-key
                <NotificationItem key={idx} data={i} />
            ))}
        </Main>
    );
};

const mapStateToProps = (state: any) => {
    return {
        items: state.notificationReducer.items
    };
};

export default connect(mapStateToProps)(Notification);
