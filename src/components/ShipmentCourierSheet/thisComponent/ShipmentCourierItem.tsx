import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import API from '../../../configs/api';
import priceFormat from '../../../helpers/price';
import Icon from '../../Icon';

const Item = styled.div`
    position: relative;
    display: flex;
    padding: 10px 1.5rem;
    background: var(--color-white);
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    cursor: pointer;

    &:hover {
        background: #f0f0f0;
    }

    div {
        position: relative;
        width: 100%;
        &#icon {
            width: 20px;
            text-align: right;
        }
    }
    .areas {
        position: relative;
        display: block;
        width: 100%;
        p {
            padding: 0 5px 0 0;
        }
    }
    &.active {
        border-bottom: 1px solid #fff;

        #icon {
            transform: rotate(180deg);
        }
    }
`;

// const ShimmerWrapper = styled.div`
//     position: relative;
//     display: block;
//     padding: 5px 1.6rem;
// `;

const ServiceItem = styled.div`
    position: relative;
    display: flex;
    padding: 5px 1.6rem;
    background: #f7f7f7;
    border-bottom: 1px solid #eee;
    align-items: center;

    div {
        position: relative;
        width: 100%;
        &#icon {
            width: 20px;
            text-align: right;
        }
    }

    &.active {
        border-bottom: 1px solid #fff;
        
        #icon {
            transform: rotate(0deg);
        }
    }
    
    &:hover {
        background: #f0f0f0;
    }
`;

const Text = styled('p') <{ bold?: boolean, extraSmall?: boolean, block?: boolean }>`
    position: relative;
    display: ${(props) => (props.block ? 'block' : 'inline-block')};;
    font-weight: ${(props) => (props.bold ? '600' : '400')};
    font-size: ${(props) => (props.extraSmall ? 'var(--font-extra-small)' : 'var(--font-small)')};
`;

interface Props {
    destination: string,
    weight: number,
    activeService: string,
    courierName: string,
    courierCode: string,
    // eslint-disable-next-line no-unused-vars
    onCourierSelect: (name: string, code: string) => void,
    // eslint-disable-next-line no-unused-vars
    onServiceSelect: (data: any, index: string) => void
}

const ShipmentCourierItem = (props: Props) => {
    const { destination, weight, activeService, courierName, courierCode, onCourierSelect, onServiceSelect } = props;
    const [serviceItems, setServiceItems] = useState([]);
    const [ready, setReady] = useState(false);
    const [open, setOpen] = useState(false);

    const fetchData = () => {
        const payload = {
            body: {
                courier: courierCode,
                weight,
                destination
            }
        };
        API.fetchShipmentCost(payload).then((res: any) => {
            setServiceItems(res.data[0].costs);
            setTimeout(() => {
                setReady(true);
            }, 1000);
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSelect = (data: any, index: string) => {
        onCourierSelect(courierName, courierCode);
        onServiceSelect(data, index);
    };

    return (
        <>
            <Item className={open ? 'active' : ''} onClick={() => setOpen(!open)}>
                <div>
                    <Text block bold>{courierName}</Text>
                </div>
                <div id="icon">
                    <Icon icon="chevron-down" />
                </div>
            </Item>
            {ready && open && serviceItems.map((i: any, idx: any) => (
                // eslint-disable-next-line react/no-array-index-key
                <ServiceItem key={idx} className={activeService === i.service ? 'active' : ''} onClick={() => handleSelect(i, i.service)}>
                    <div>
                        <Text block extraSmall>{`${i.service} - ${i.description}`}</Text>
                        <Text block extraSmall>{priceFormat(i.cost[0].value)}</Text>
                    </div>
                    {activeService === i.service && (
                        <div id="icon">
                            <Icon icon="check" />
                        </div>
                    )}
                </ServiceItem>
            ))}
        </>
    );
};

export default ShipmentCourierItem;
