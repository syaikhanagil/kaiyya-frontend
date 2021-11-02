import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import styled from 'styled-components';

const PhoneNumberWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    padding: 0 5px;
    border: 1px solid #c0c0c0;
    border-radius: 4px;

    .PhoneInput {
        .PhoneInputCountry {
            padding: 0 5px;
            border-right: 1px solid #c0c0c0;
        }
        input {
            position: relative;
            display: block;
            width: 100%;
            height: auto;
            min-height: 40px;
            padding: 0 5px;
            background: var(--transparent);
            font-size: var(--font-small);
            outline: none;
            transition: .25s ease;
        }
    }
`;

interface Props {
    // eslint-disable-next-line no-unused-vars
    onChange: (phone: string) => void
}

const PhoneNumberInput = (props: Props) => {
    const { onChange } = props;
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        onChange(phoneNumber);
    }, [phoneNumber]);

    return (
        <PhoneNumberWrapper>
            <PhoneInput international countryCallingCodeEditable={false} placeholder="812 3456 7890" defaultCountry="ID" value={phoneNumber} onChange={(val: string) => setPhoneNumber(val)} />
        </PhoneNumberWrapper>
    );
};

export default PhoneNumberInput;
