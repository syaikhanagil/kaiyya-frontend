import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import briLogo from '../../../assets/svg/bri-logo.svg';
import bniLogo from '../../../assets/svg/bni-logo.svg';
import mandiriLogo from '../../../assets/svg/mandiri-logo.svg';
import bcaLogo from '../../../assets/svg/bca-logo.svg';
import { Text } from '../../../components/Styled';
import priceFormat from '../../../helpers/price';
import MandiriContent from './MandiriContent';
import BriContent from './BriContent';
import BniContent from './BniContent';
import action from '../../../configs/redux/action';
import clipboardCopy from '../../../helpers/clipboard';

const VirtualAccountWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: 100vh;
    align-items: center;
    padding: 46px 0 15px;
`;

const TotalWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    background: var(--color-white);
    padding: 20px 0;
    border-bottom: 1px solid #eee;

    p {
        text-align: center;
        font-size: 20px;
        color: var(--primary);
    }
`;

const VirtualAccountInfo = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    align-items: center;
    padding: 10px 1.5rem;
    background: var(--color-white);
    border-bottom: 1px solid #eee;
    
    .logo {
        position: relative;
        width: 50px;

        img {
            width: 100%;
        }
    }
    .va {
        position: relative;
        width: 100%;
        padding: 0 10px;

        .title {
            position: relative;
            padding-bottom: 5px;
            margin-bottom: 5px;
            border-bottom: 1px solid #eee;
        }
    }
    .copy {
        position: relative;
        display: flex;
        width: auto;
        align-items: center;
        
        span {
            background: #eee;
            padding: 0 5px;
            cursor: pointer;
            border-radius: 2px;
        }
    }
`;

const HowToPayWrapper = styled.div`
    position: relative;
    display: block;
    background: var(--color-white);
`;

const TabHeader = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
`;

const TabItem = styled.div`
    position: relative;
    display: block;
    width: 100%;
    padding: 10px 15px;
    text-align: center;
    border-bottom: 2px solid var(--transparent);
    cursor: pointer;

    &.active {
        color: var(--primary);
        border-bottom: 2px solid var(--primary);
    }
`;

const TabContent = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: auto;
    padding: 10px 1rem 20px;
`;

// const SubmitWrapper = styled.div`
//     position: relative;
//     display: block;
//     width: 100%;
//     padding: 10px 1rem;
// `;

interface Props {
    data: any
}

const VirtualAccountMethod = (props: Props) => {
    const { data } = props;
    const [tab, setTabs] = useState('m-banking');
    const dispatch = useDispatch();

    const onCopyClick = () => {
        clipboardCopy(data.virtual_account_number);
        dispatch(action.showToast('Berhasil disalin!'));
        // console.log('copy clicked');
    };

    return (
        <VirtualAccountWrapper>
            <TotalWrapper>
                <Text block bold marginY>{priceFormat(data.amount)}</Text>
            </TotalWrapper>
            <VirtualAccountInfo>
                <div className="logo">
                    {data.bank_code === 'BRI' && (
                        <img src={briLogo} alt="kaiyya-bri-va" />
                    )}
                    {data.bank_code === 'BNI' && (
                        <img src={bniLogo} alt="kaiyya-bri-va" />
                    )}
                    {data.bank_code === 'BCA' && (
                        <img src={bcaLogo} alt="kaiyya-bri-va" />
                    )}
                    {data.bank_code === 'MANDIRI' && (
                        <img src={mandiriLogo} alt="kaiyya-bri-va" />
                    )}
                </div>
                <div className="va">
                    <Text block extraSmall className="title">{`${data.bank_code} VIRTUAL ACCOUNT`}</Text>
                    <Text block>{data.virtual_account_number}</Text>
                </div>
                <div className="copy">
                    <span role="button" onClick={() => onCopyClick()}>Salin</span>
                </div>
            </VirtualAccountInfo>
            <HowToPayWrapper>
                <TabHeader>
                    <TabItem className={tab === 'm-banking' ? 'active' : ''} onClick={() => setTabs('m-banking')}>
                        <Text>M-BANKING</Text>
                    </TabItem>
                    <TabItem className={tab === 'i-banking' ? 'active' : ''} onClick={() => setTabs('i-banking')}>
                        <Text>I-BANKING</Text>
                    </TabItem>
                    <TabItem className={tab === 'atm' ? 'active' : ''} onClick={() => setTabs('atm')}>
                        <Text>ATM</Text>
                    </TabItem>
                </TabHeader>
                <TabContent>
                    {data.bank_code === 'BRI' && (
                        <BriContent tabActive={tab} vaNumber={data.virtual_account_number} />
                    )}
                    {data.bank_code === 'MANDIRI' && (
                        <MandiriContent tabActive={tab} vaNumber={data.virtual_account_number} />
                    )}
                    {data.bank_code === 'BNI' && (
                        <BniContent tabActive={tab} vaNumber={data.virtual_account_number} />
                    )}
                </TabContent>
            </HowToPayWrapper>
            {/* <SubmitWrapper>
                <Button block fullWidth primary onClick={() => }>Selesai</Button>
            </SubmitWrapper> */}
        </VirtualAccountWrapper>
    );
};

export default VirtualAccountMethod;
