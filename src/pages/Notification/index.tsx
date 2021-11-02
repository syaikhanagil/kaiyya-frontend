import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Loading from '../../components/Loading';
import NotificationDetailSheet from '../../components/NotificationDetailSheet';
import { Text } from '../../components/Styled';
import action from '../../configs/redux/action';
import Main from '../../layouts/Main';
import NotificationItem from './ thisComponent/NotificationItem';

const NotificationHeader = styled.div`
    position: sticky;
    width: 100%;
    height: auto;
    padding: 0 1rem;
    background: var(--color-white);
    top: 46px;
    overflow: hidden;
    user-select: none;
    border-bottom: 1px solid #eee;
    z-index: 1;
`;

const MenuWrapper = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
`;

const MenuItem = styled.div`
    position: relative;
    display: block;
    width: auto;
    padding: 10px 20px;
    margin: 0;
    text-align: center;
    white-space: nowrap;
    border-bottom: 2px solid var(--transparent);
    cursor: pointer;
    z-index: 1;

    &.active {
        color: var(--primary);
        border-bottom: 2px solid var(--primary);
    }
`;

interface Props {
    notifications: any,
    dispatch: any
}

const Notification = (props: Props) => {
    const { notifications, dispatch } = props;
    const [ready, setReady] = useState(false);
    const [activeMenu, setActiveMenu] = useState('order');
    const [listItems, setListItems] = useState([]);
    const [detailDialog, setDetailDialog] = useState(false);
    const [selectedId, setSelectedId] = useState('');
    const [filterList, setFilterList] = useState([
        { id: 0, type: 'order', equal: false, name: 'Pesanan', total: 0 },
        { id: 1, type: 'promo', equal: false, name: 'Promo', total: 0 },
        { id: 2, type: 'other', equal: false, name: 'Lainnya', total: 0 }
    ]);

    useEffect(() => {
        dispatch(action.fetchNotification());
    }, []);

    const filterItems = (key: string, equal: boolean) => {
        const items = notifications.filter((item: any) => {
            if (equal) {
                return item.channel === key;
            }
            return item.channel !== key;
        });
        return items;
    };

    useEffect(() => {
        setTimeout(() => {
            setReady(true);
        }, 1000);
    }, [listItems]);

    useEffect(() => {
        setReady(false);
        handleActiveMenu('order', 'order', true);
        setFilterList([
            { id: 0, type: 'order', equal: true, name: 'Pesanan', total: 2 },
            { id: 1, type: 'promo', equal: true, name: 'Promo', total: 0 },
            { id: 2, type: 'other', equal: false, name: 'Lainnya', total: 0 }
        ]);
    }, []);

    useEffect(() => {
        handleActiveMenu(activeMenu, activeMenu, activeMenu !== 'other');
    }, [notifications]);

    const handleActiveMenu = (menu: string, channel: string, equal: boolean) => {
        setReady(false);
        setActiveMenu(menu);
        setListItems(filterItems(channel, equal));
    };

    const handleDialog = (id: string) => {
        setSelectedId(id);
        setDetailDialog(true);
    };

    return (
        <Main useHeader paddingTop backBtn title="Notifikasi" backgroundWhite>
            <NotificationHeader>
                <MenuWrapper>
                    {filterList.map((item: any) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <MenuItem key={item.id} className={activeMenu === item.type ? 'active' : ''} onClick={() => handleActiveMenu(item.type, item.channel, item.equal)}>
                            {item.name}
                        </MenuItem>
                    ))}
                </MenuWrapper>
            </NotificationHeader>
            {ready && listItems.map((i: any, idx: any) => (
                // eslint-disable-next-line react/no-array-index-key
                <NotificationItem key={idx} data={i} onSelect={(data: any) => handleDialog(data)} />
            ))}
            {ready && listItems.length < 1 && (
                <Text block alignCenter marginY>Belum ada notifikasi</Text>
            )}
            {!ready && (
                <Loading type="ring" alignCenter />
            )}
            {detailDialog && (
                <NotificationDetailSheet data={selectedId} handler={(visibility: boolean) => setDetailDialog(visibility)} />
            )}
        </Main>
    );
};

const mapStateToProps = (state: any) => {
    return {
        notifications: state.notificationReducer.items
    };
};

export default connect(mapStateToProps)(Notification);
