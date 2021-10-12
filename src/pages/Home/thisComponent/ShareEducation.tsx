import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Text } from '../../../components/Styled';
import action from '../../../configs/redux/action';
import clipboardCopy from '../../../helpers/clipboard';

const ShareEducationWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    margin: 10px 0;
    background: var(--color-white);
    padding: 15px 1rem;
`;

const LinkWrapper = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    user-select: none;
    #link {
        position: relative;
        width: auto;
        padding: 2px 5px;
        background: #f0f0f0;
        border-radius: 4px;
    }
    #copy {
        border: 1px solid #eee;
        padding: 2px 10px;
        border-radius: 4px;
        cursor: pointer;
        &:hover {
            background: #f0f0f0;
        }
    }
`;

interface Props {
    dispatch: any,
    username: string
}

const ShareEducation = (props: Props) => {
    const { dispatch, username } = props;

    const handleCopy = () => {
        const value = `https://kaiyya.com/ref/${username}`;
        clipboardCopy(value);
        dispatch(action.showToast('Berhasil disalin!'));
    };

    return (
        <ShareEducationWrapper>
            <Text block bold>Link Edukasi</Text>
            <Text block extraSmall marginY>Bagikan link edukasi</Text>
            <LinkWrapper>
                <Text extraSmall id="link">{`https://kaiyya.com/ref/${username}`}</Text>
                <Text bold extraSmall id="copy" onClick={() => handleCopy()}>Salin</Text>
            </LinkWrapper>
        </ShareEducationWrapper>
    );
};

const mapStateToProps = (state: any) => {
    return {
        username: state.accountReducer.username
    };
};

export default connect(mapStateToProps)(ShareEducation);
