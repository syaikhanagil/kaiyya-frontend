import React from 'react';
// import briLogo from '../../assets/svg/bri-logo.svg';
// import bniLogo from '../../assets/svg/bni-logo.svg';
// import mandiriLogo from '../../assets/svg/mandiri-logo.svg';
// import bcaLogo from '../../assets/svg/bca-logo.svg';
// import qrisLogo from '../../assets/svg/qris-logo.svg';

interface Props {
    bankCode: string
}

const VirtualAccountCard = (props: Props) => {
    const { bankCode } = props;
    return (
        <div>{bankCode}</div>
    );
};

export default VirtualAccountCard;
