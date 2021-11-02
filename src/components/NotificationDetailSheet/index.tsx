import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import API from '../../configs/api';
import action from '../../configs/redux/action';
import BottomSheet from '../BottomSheet';
import { Text } from '../Styled';

interface Props {
    data: any,
    // eslint-disable-next-line no-unused-vars
    handler: (visibility: boolean) => void
}

const NotificationDetailSheet = (props: Props) => {
    const { data, handler } = props;
    const dispatch = useDispatch();

    const fetchData = () => {
        const payload = {
            params: `/${data.id}`
        };
        API.fetchNotificationDetail(payload).then(() => {
            dispatch(action.fetchNotification());
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <BottomSheet title="Notifikasi" handler={handler}>
            <Text>{data.message}</Text>
        </BottomSheet>
    );
};

export default NotificationDetailSheet;
