import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import action from '../../configs/redux/action';
import BottomSheet from '../BottomSheet';
import { Button } from '../Styled';

const ShareLinkWrapper = styled.div`
    position: relative;
    width: 100%;
    padding: 10px 1rem;
`;

interface Props {
    // eslint-disable-next-line no-unused-vars
    handler: (visibility: boolean) => void
}

const ShareLinkSheet = (props: Props) => {
    const { handler } = props;
    const dispatch = useDispatch();

    const onCopyClick = () => {
        const el = document.createElement('textarea');
        el.value = window.location.href;

        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);

        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        dispatch(action.showToast('Link berhasil disalin'));
        setTimeout(() => {
            handler(false);
        }, 250);
    };

    return (
        <BottomSheet title="Bagikan Link Produk" handler={handler}>
            <ShareLinkWrapper>
                <Button block fullWidth primary onClick={() => onCopyClick()}>Salin Tautan</Button>
            </ShareLinkWrapper>
        </BottomSheet>
    );
};

export default ShareLinkSheet;
