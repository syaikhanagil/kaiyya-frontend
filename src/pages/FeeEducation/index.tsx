import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import Main from '../../layouts/Main';
import IncomeItem from './thisComponent/IncomeItem';

const FeeWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
`;

const FeeHeader = styled.div`
    position: sticky;
    display: flex;
    width: 100%;
    top: 46px;
    background: var(--color-white);
    border-bottom: 1px solid #eee;
    flex-direction: row;
    justify-content: space-between;
    z-index: 10;
    padding: 10px 1rem;

    #filter-date {
        position: relative;
        width: 100%;
        flex-basis: 30%;
        input {
            position: relative;
            display: block;
            width: 100%;
            height: auto;
            padding: 5px 15px;
            background: var(--transparent);
            font-size: var(--font-extra-small);
            text-align: center;
            border: 1px solid var(--primary);
            border-radius: 4px;
            outline: none;
        }
        #submit {
            position: relative;
            display: block;
            width: 100%;
            height: auto;
            padding: 5px;
            text-align: center;
            background: var(--primary);
            text-align: center;
            font-size: var(--font-extra-small);
            color: var(--color-white);
            border: 1px solid var(--primary);
            border-radius: 4px;
            outline: none;
            user-select: none;
            transition: .25s ease;
            cusror: pointer;
        }
    }
`;

const FeeEducation = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    return (
        <Main useHeader paddingTop title="Pendapatan">
            <FeeWrapper>
                <FeeHeader>
                    <div id="filter-date">
                        <DatePicker selected={startDate} onChange={(date: any) => setStartDate(date)} />
                    </div>
                    <div id="filter-date">
                        <DatePicker selected={endDate} onChange={(date: any) => setEndDate(date)} />
                    </div>
                    <div id="filter-date">
                        <button type="button" id="submit">Filter</button>
                    </div>
                </FeeHeader>
                <IncomeItem />
                <IncomeItem />
                <IncomeItem />
                <IncomeItem />
                <IncomeItem />
            </FeeWrapper>
        </Main>
    );
};

export default FeeEducation;
