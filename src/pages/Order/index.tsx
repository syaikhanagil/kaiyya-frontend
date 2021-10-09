import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import ScrollContainer from 'react-indiana-drag-scroll';
import Main from '../../layouts/Main';
import action from '../../configs/redux/action';
import OrderItem from './thisComponent/OrderItem';

const OrderWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
`;

const OrderHeader = styled.div`
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

    .scroll-container {
        display: flex;
        padding: 0 1rem;
    }
`;

const OrderFilter = styled.div`
    position: relative;
    display: block;
    width: 100%;
    padding: 10px 20px;
    margin: 0;
    text-align: center;
    white-space: nowrap;
    border-bottom: 2px solid var(--transparent);
    cursor: pointer;
    
    &.active {
        color: var(--primary);
        border-bottom: 2px solid var(--primary);
    }

    span {
        font-size: var(--font-small);
    }

    #counter {
        position: absolute;
        display: flex;
        width: 16px;
        height: 16px;
        font-size: 12px;
        background: var(--primary);
        color: var(--color-white);
        top: 5px;
        right: 0;
        justify-content: center;
        align-items: center;
        line-height: 1;
        border-radius: 50px;
        span {
            font-size: 12px;
        }
    }
`;

const OrderBody = styled.div`
    position: relative;
    display: block;
    width: 100%;
`;

const Order = (props: any) => {
    const { dispatch, orders } = props;
    const [activeMenu, setActiveMenu] = useState('unpaid');
    const [listItems, setListItems] = useState([]);
    const [filterList, setFilterList] = useState([
        { id: 0, type: 'unpaid', name: 'Belum Bayar', total: 0 },
        { id: 1, type: 'onprocess', name: 'Diproses', total: 0 },
        { id: 2, type: 'shipment', name: 'Dikirim', total: 0 },
        { id: 3, type: 'done', name: 'Selesai', total: 0 },
        { id: 4, type: 'cancel', name: 'Dibatalkan', total: 0 }
    ]);

    const onFilterClick = (type: string) => {
        setActiveMenu(type);
    };

    const fetchData = () => {
        dispatch(action.fetchOrder());
    };

    useEffect(() => {
        fetchData();
    }, []);

    const counterItem = () => {
        const unpaid = orders.filter((item: any) => item.status === 'unpaid');
        const onprocess = orders.filter((item: any) => item.status === 'onprocess');
        const shipment = orders.filter((item: any) => item.status === 'shipment');
        const done = orders.filter((item: any) => item.status === 'done');
        const cancel = orders.filter((item: any) => item.status === 'cancel');

        setFilterList([
            { id: 0, type: 'unpaid', name: 'Belum Bayar', total: unpaid.length },
            { id: 1, type: 'onprocess', name: 'Diproses', total: onprocess.length },
            { id: 2, type: 'shipment', name: 'Dikirim', total: shipment.length },
            { id: 3, type: 'done', name: 'Selesai', total: done.length },
            { id: 4, type: 'cancel', name: 'Dibatalkan', total: cancel.length }
        ]);
    };

    const filterItems = (key: string) => {
        const items = orders.filter((item: any) => {
            return item.status === key;
        });
        return items;
    };

    useEffect(() => {
        setListItems(filterItems(activeMenu));
        counterItem();
    }, [orders, activeMenu]);

    return (
        <Main useHeader paddingTop backTo="/" useNavigation paddingBottom activeMenu="orders" title="Pesanan">
            <OrderWrapper>
                <OrderHeader>
                    <ScrollContainer className="scroll-container">
                        {filterList.map((i) => (
                            <OrderFilter key={i.id} className={activeMenu === i.type ? 'active' : ''} onClick={() => onFilterClick(i.type)}>
                                <span>{i.name}</span>
                                {i.total > 0 && (
                                    <div id="counter">
                                        <span>{i.total}</span>
                                    </div>
                                )}
                            </OrderFilter>
                        ))}
                    </ScrollContainer>
                </OrderHeader>
                <OrderBody>
                    {listItems.map((i: any, idx: any) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <OrderItem key={idx} data={i} />
                    ))}
                </OrderBody>
            </OrderWrapper>
        </Main>
    );
};

const mapStateToProps = (state: any) => {
    return {
        orders: state.orderReducer.items
    };
};

export default connect(mapStateToProps)(Order);
