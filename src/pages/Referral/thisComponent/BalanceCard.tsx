import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '../../../components/Icon';
import { Text } from '../../../components/Styled';
import action from '../../../configs/redux/action';
// import pushLocation from '../../../configs/routes/pushLocation';
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

    .balance {
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
    margin: 0 5px;
    border-radius: 4px;
    border: 2px dashed #eee;
    text-align: center;
    cursor: pointer;
    .feather {
        width: 20px;
        height: 20px;
    }
    a {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
        padding: 10px 15px;
    }
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
    dispatch: any,
    addons: any
}

const BalanceCard = (props: Props) => {
    const { dispatch, downline, addons } = props;
    const [mitra, setMitra] = useState([]);

    const fetchData = async () => {
        dispatch(action.fetchReferralDownline());
        dispatch(action.fetchAccountDetail());
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (downline.length > 0) {
            setMitra(downline);
        }
    }, [downline]);

    return (
        <BalanceWrapper>
            <BalanceContent>
                <div className="balance-counter">
                    <p className="balance">{priceFormat(addons.referral_point)}</p>
                </div>
                <MenuBox>
                    <MenuItem>
                        <Link to="/withdraw">
                            <Icon icon="pocket" />
                            <Text block extraSmall>Tarik</Text>
                        </Link>
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
                        Riwayat Imbalan
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
        downline: state.referralReducer.downline,
        addons: state.accountReducer.addons
    };
};

export default connect(mapStateToProps)(BalanceCard);
