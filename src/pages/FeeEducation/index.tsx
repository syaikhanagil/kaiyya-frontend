import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Main from '../../layouts/Main';
import IncomeItem from './thisComponent/IncomeItem';
import API from '../../configs/api';

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
    const today = new Date();
    const [items, setItems] = useState<any>([]);
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(new Date(new Date().setDate(today.getDate() - 30)));

    const handleStartDate = (date: any) => {
        setStartDate(date);
    };

    const handleEndDate = (date: any) => {
        setEndDate(date);
    };

    useEffect(() => {
        API.fetchReferralProfit().then((res: any) => {
            setItems(res.data);
        });
    }, []);

    useEffect(() => {
        console.log('start', moment(startDate).format('L'));
    }, [startDate]);

    useEffect(() => {
        console.log('end', moment(endDate).format('L'));
    }, [endDate]);

    return (
        <Main useHeader paddingTop title="Riwayat Imbalan">
            <FeeWrapper>
                <FeeHeader>
                    <div id="filter-date">
                        <DatePicker selected={startDate} onChange={(date: any) => handleStartDate(date)} />
                    </div>
                    <div id="filter-date">
                        <DatePicker selected={endDate} onChange={(date: any) => handleEndDate(date)} />
                    </div>
                    <div id="filter-date">
                        <button type="button" id="submit">Filter</button>
                    </div>
                </FeeHeader>
                {items.map((i: any, idx: any) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <IncomeItem key={idx} data={i} />
                ))}
            </FeeWrapper>
        </Main>
    );
};

export default FeeEducation;
