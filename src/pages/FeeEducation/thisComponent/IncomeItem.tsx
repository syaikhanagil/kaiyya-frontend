import React from 'react';
import styled from 'styled-components';
import { Text } from '../../../components/Styled';
import dateFormat from '../../../helpers/date';
import priceFormat from '../../../helpers/price';

const IncomeWrapper = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    background: var(--color-white);
    padding: 5px 1rem;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    
    div {
        position: relative;
        display: block;
        width: 100%;
        flex-basis: 50%;
        &#income-info {
            text-align: right;
        }
    }
`;

interface Props {
    data: any
}
const IncomeItem = (props: Props) => {
    const { data } = props;
    // console.log(data);
    return (
        <IncomeWrapper>
            <div id="income-content">
                <Text block bold extraSmall>Tambahan Imbalan</Text>
                <Text block style={{ color: 'var(--primary)' }} extraSmall>{priceFormat(data.amount)}</Text>
            </div>
            <div id="income-info">
                <Text block bold extraSmall>{dateFormat(data.createdAt)}</Text>
                <Text block style={{ color: 'var(--primary)' }} extraSmall>{data.referral_account.fullname}</Text>
            </div>
        </IncomeWrapper>
    );
};

export default IncomeItem;
