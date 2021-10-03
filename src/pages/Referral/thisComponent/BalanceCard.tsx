import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '../../../components/Icon';
import { Text } from '../../../components/Styled';
import action from '../../../configs/redux/action';
import pushLocation from '../../../configs/routes/pushLocation';
import priceFormat from '../../../helpers/price';

const BalanceWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    background: var(--color-white);
    color: var(--color-black);
    padding: 0;
    border-radius: 4px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, .05);
`;

const BalanceContent = styled.div`
    position: relative;
    display: flex;
    padding: 10px 1rem;
    justify-content: space-between;
    align-items: center;

    p {
        font-size: 24px;
        font-weight: 600;
        margin: 0;
    }
    .balance-counter {
        padding: 10px;
        border-radius: 4px;
        border: 2px dashed #eee;
    }
`;

const MenuBox = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const MenuItem = styled.div`
    position: relative;
    display: block;
    width: 100%;
    flex-basis: 30%;
    padding: 10px;
    border-radius: 4px;
    border: 2px dashed #eee;
`;

const BalanceFooter = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    border-top: 1px solid #eee;

    div, a {
        position: relative;
        display: flex;
        width: 100%;
        flex-basis: 50%;
        padding: 20px 1rem;
        cursor: pointer;
        justify-content: space-between;

        &:hover {
            background: #f7f7f7;
        }

        &:first-of-type {
            border-right: 1px solid #eee;
        }

        p {
            width: auto;
            .feather {
                height: 14px;
                width: 14px;
                vertical-align: middle;
                margin-top: -2px;
                margin-right: 5px;
            }
        }
    }
`;

interface Props {
    downline: any,
    dispatch: any
}

const BalanceCard = (props: Props) => {
    const { dispatch, downline } = props;
    const [mitra, setMitra] = useState([]);
    const [balance, setBalance] = useState(0);

    const fetchData = async () => {
        dispatch(action.fetchReferralDownline());
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (downline.length > 0) {
            setMitra(downline);
            setBalance(100000);
        }
    }, [downline]);

    return (
        <BalanceWrapper>
            <BalanceContent>
                <div className="balance-counter">
                    <p>{priceFormat(balance)}</p>
                </div>
                <MenuBox>
                    <MenuItem onClick={() => pushLocation.path('/withdraw')}>
                        <Icon icon="pocket" />
                    </MenuItem>
                </MenuBox>
            </BalanceContent>
            <BalanceFooter>
                <div>
                    <Text extraSmall>
                        <Icon icon="user" />
                        Mitra Saya
                    </Text>
                    <Text extraSmall alignRight>{`${mitra.length} Mitra`}</Text>
                </div>
                <Link to="/income-history">
                    <Text extraSmall>
                        <Icon icon="rotate-ccw" />
                        Pendapatan
                    </Text>
                    <Text extraSmall alignRight>
                        <Icon icon="chevron-right" />
                    </Text>
                </Link>
            </BalanceFooter>
        </BalanceWrapper>
    );
};

const mapStateToProps = (state: any) => {
    return {
        downline: state.referralReducer.downline
    };
};

export default connect(mapStateToProps)(BalanceCard);
