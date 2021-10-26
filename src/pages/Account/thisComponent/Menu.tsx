import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '../../../components/Icon';
import { Text } from '../../../components/Styled';
import priceFormat from '../../../helpers/price';

const MenuWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    padding: 0 1rem;
    margin-top: -20px;
`;

const MenuList = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    background: var(--color-white);
    flex-direction: row;
    padding: 10px;
    border-radius: 4px;
`;

const MenuItem = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    flex-direction: column;
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
    justify-content: center;
    align-items: center;

    a {
        width: 100%;
        height: 100%;
        text-align: center;
    }

    &:first-of-type {
        border-left: none;
    }
    &:last-of-type {
        border-right: none;
    }

    .header {
        .feather {
            witdh: 16px;
            height: 16px;
            margin-right: 5px;
        }
    }
`;

interface Props {
    role: string,
    addons: any
}

const Menu = (props: Props) => {
    const { role, addons } = props;

    return (
        <MenuWrapper>
            <MenuList>
                <MenuItem>
                    <div className="header">
                        <Icon icon="award" />
                        <Text extraSmall>K-Poin</Text>
                    </div>
                    <Text extraSmall bold>0 Poin</Text>
                </MenuItem>
                <MenuItem>
                    <Link to={role && role !== 'retail' ? '/fee-education' : '/join-mitra'}>
                        <div className="header">
                            <Icon icon="pocket" />
                            <Text extraSmall>Fee Edukasi</Text>
                        </div>
                        {role && role !== 'retail' ? (
                            <Text extraSmall bold>{priceFormat(addons.referral_point)}</Text>
                        ) : (
                            <Text extraSmall bold>Lihat Detail</Text>
                        )}
                    </Link>
                </MenuItem>
            </MenuList>
        </MenuWrapper>
    );
};

const mapStateToProps = (state: any) => {
    return {
        addons: state.accountReducer.addons,
        role: state.accountReducer.role
    };
};

export default connect(mapStateToProps)(Menu);
