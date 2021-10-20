import React, { useState } from 'react';
import styled from 'styled-components';
// import moment from 'moment';
// import 'moment/locale/id';
import { useDispatch } from 'react-redux';
import briLogo from '../../../assets/svg/bri-logo.svg';
import bniLogo from '../../../assets/svg/bni-logo.svg';
import sampoernaLogo from '../../../assets/img/bss-logo.png';
import mandiriLogo from '../../../assets/svg/mandiri-logo.svg';
import bcaLogo from '../../../assets/svg/bca-logo.svg';
import permataLogo from '../../../assets/svg/permata-logo.svg';
import { Button, Text } from '../../../components/Styled';
import priceFormat from '../../../helpers/price';
import MandiriContent from './MandiriContent';
import BriContent from './BriContent';
import BniContent from './BniContent';
import action from '../../../configs/redux/action';
import clipboardCopy from '../../../helpers/clipboard';
import PermataContent from './PermataContent';
import stamp from '../../../assets/img/stempel.png';
import Countdown from '../../../components/Countdown';
import BackDialog from './BackDialog';
import pushLocation from '../../../configs/routes/pushLocation';
import SampoernaContent from './SampoernaContent';

const VirtualAccountWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    align-items: center;
    padding: 46px 0 65px;
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

const ExpiredWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    text-align: center;
    padding: 5px 0;
    background: var(--color-white);
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

const PaidStamp = styled.div`
    position: absolute;
    display: block;
    width: 70px;
    top: 0;
    right: 4rem;
    transform: rotate(10deg);
    z-index: 1;
    img {
        width: 100%;
        -webkit-filter: grayscale(1) invert(1);
        filter: grayscale(1) invert(1);
    }
`;

const SubmitWrapper = styled.div`
    position: fixed;
    display: block;
    width: 100%;
    max-width: 480px;
    background: var(--color-white);
    padding: 10px 1rem;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
`;

interface Props {
    data: any,
    expired: string,
    paid: boolean
}

const VirtualAccountMethod = (props: Props) => {
    const { data, paid, expired } = props;
    const [backDialog, setBackDialog] = useState(false);
    const [tab, setTabs] = useState('m-banking');
    const dispatch = useDispatch();

    const onCopyClick = () => {
        clipboardCopy(data.virtual_account_number);
        dispatch(action.showToast('Berhasil disalin!'));
    };

    return (
        <VirtualAccountWrapper>
            <TotalWrapper>
                <Text block bold marginY>{priceFormat(data.amount)}</Text>
            </TotalWrapper>
            {!paid && expired !== '' && (
                <ExpiredWrapper>
                    <Text block bold>Bayar Sebelum</Text>
                    <Countdown endTime={expired} alignCenter />
                </ExpiredWrapper>
            )}
            <VirtualAccountInfo>
                <div className="logo">
                    {data.bank_code === 'BRI' && (
                        <img src={briLogo} alt="kaiyya-bri-va" />
                    )}
                    {data.bank_code === 'BNI' && (
                        <img src={bniLogo} alt="kaiyya-bni-va" />
                    )}
                    {data.bank_code === 'MANDIRI' && (
                        <img src={mandiriLogo} alt="kaiyya-bri-va" />
                    )}
                    {data.bank_code === 'BCA' && (
                        <img src={bcaLogo} alt="kaiyya-bca-va" />
                    )}
                    {data.bank_code === 'PERMATA' && (
                        <img src={permataLogo} alt="kaiyya-permata-va" />
                    )}
                    {data.bank_code === 'SAHABAT_SAMPOERNA' && (
                        <img src={sampoernaLogo} alt="kaiyya-sampoerna-va" />
                    )}
                </div>
                <div className="va">
                    <Text block extraSmall className="title">{`${data.bank_code} VIRTUAL ACCOUNT`}</Text>
                    <Text block>{data.virtual_account_number}</Text>
                </div>
                <div className="copy">
                    <span role="button" onClick={() => onCopyClick()}>Salin</span>
                </div>
                <PaidStamp>
                    {paid && (
                        <img src={stamp} alt="kaiyya-stamp" />
                    )}
                </PaidStamp>
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
                    {data.bank_code === 'PERMATA' && (
                        <PermataContent tabActive={tab} vaNumber={data.virtual_account_number} />
                    )}
                    {data.bank_code === 'SAHABAT_SAMPOERNA' && (
                        <SampoernaContent tabActive={tab} vaNumber={data.virtual_account_number} />
                    )}
                </TabContent>
            </HowToPayWrapper>
            <SubmitWrapper>
                {!paid && (
                    <Button block fullWidth primary onClick={() => setBackDialog(true)}>Kembali</Button>
                )}
                {paid && (
                    <Button block fullWidth primary onClick={() => pushLocation.goBack()}>Kembali</Button>
                )}
            </SubmitWrapper>
            {backDialog && (
                <BackDialog handler={(visibility: boolean) => setBackDialog(visibility)} />
            )}
        </VirtualAccountWrapper>
    );
};

export default VirtualAccountMethod;
