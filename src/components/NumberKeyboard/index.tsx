import React from 'react';
import styled from 'styled-components';
import Icon from '../Icon';

const NumberKeyboardWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: auto;
    background: var(--color-white);
    padding: 10px 0;
`;

const NumberKeyWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const NumberKeyItem = styled.div`
    position: relative;
    display: block;
    flex-basis: 33%;
    height: auto;
    padding: 15px 0;
    text-align: center;
    font-size: var(--font-small);
    font-weight: 600;
    user-select: none;
    border-radius: 4px;
    border: 1px solid #f9f9f9;
    margin-bottom: 5px;
    cursor: pointer;
    &:hover {
        background: #f7f7f7;
    }
`;

interface Props {
    value: string,
    // eslint-disable-next-line no-unused-vars
    onType: (val: string) => void
}

const NumberKeyboard = (props: Props) => {
    const { value, onType } = props;

    const onKeyClick = (val: string | number) => {
        const newValue = value.replaceAll(',', '').replaceAll('.', '');
        onType(newValue + val);
    };

    const onDeleteClick = () => {
        const defaultValue = value.replaceAll(',', '').replaceAll('.', '');
        const newValue = defaultValue.substring(0, defaultValue.length - 1);
        onType(newValue);
    };

    return (
        <NumberKeyboardWrapper>
            <NumberKeyWrapper>
                <NumberKeyItem onClick={() => onKeyClick(1)}>1</NumberKeyItem>
                <NumberKeyItem onClick={() => onKeyClick(2)}>2</NumberKeyItem>
                <NumberKeyItem onClick={() => onKeyClick(3)}>3</NumberKeyItem>
                <NumberKeyItem onClick={() => onKeyClick(4)}>4</NumberKeyItem>
                <NumberKeyItem onClick={() => onKeyClick(5)}>5</NumberKeyItem>
                <NumberKeyItem onClick={() => onKeyClick(6)}>6</NumberKeyItem>
                <NumberKeyItem onClick={() => onKeyClick(7)}>7</NumberKeyItem>
                <NumberKeyItem onClick={() => onKeyClick(8)}>8</NumberKeyItem>
                <NumberKeyItem onClick={() => onKeyClick(9)}>9</NumberKeyItem>
                <NumberKeyItem onClick={() => onKeyClick(0)}>0</NumberKeyItem>
                <NumberKeyItem onClick={() => onKeyClick('000')}>000</NumberKeyItem>
                <NumberKeyItem onClick={() => onDeleteClick()}>
                    <Icon icon="delete" />
                </NumberKeyItem>
            </NumberKeyWrapper>
        </NumberKeyboardWrapper>
    );
};

export default NumberKeyboard;
