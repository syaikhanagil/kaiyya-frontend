import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Button } from '../../components/Styled';
import Main from '../../layouts/Main';

const SettingsWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
`;

const SectionWrapper = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    padding: 10px 1.5rem;
    flex-direction: row;
    align-items: center;
    background: var(--color-white);
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    cursor: pointer;

    &:last-of-type {
        margin-bottom: 5px;
        border: none;
    }

    div {
        position: relative;
        display: block;
        width: 100%;

        &#icon-action {
            text-align: right;
            width: 20%;
        }
    }

    p,
    label {
        position: relative;
        display: block;
        margin: 0;
        font-weight: 600;
    }

    label {
        cursor: pointer;
    }

    input, textarea {
        position: relative;
        display: block;
        width: 100%;
        outline: none;
        border: none;
    }
    
    textarea {
        width: 100%;
        resize: none;
    }

    span, input {
        font-size: var(--font-extra-small);
    }
`;

const Settings = (props: any) => {
    const { username, fullname, role } = props;

    return (
        <Main backBtn title="Pengaturan Akun">
            <SettingsWrapper>
                <SectionWrapper>
                    <div>
                        <p>Username</p>
                        <span>{username}</span>
                    </div>
                </SectionWrapper>
                <SectionWrapper>
                    <div>
                        <p>Nama Lengkap</p>
                        <span>{fullname}</span>
                    </div>
                </SectionWrapper>
                <SectionWrapper>
                    <div>
                        <p>Role</p>
                        <span>{role}</span>
                    </div>
                </SectionWrapper>
                <Button block fullWidth primary>Simpan</Button>
            </SettingsWrapper>
        </Main>
    );
};

const mapStateToProps = (state: any) => {
    return {
        username: state.accountReducer.username,
        fullname: state.accountReducer.fullname,
        role: state.accountReducer.role
    };
};

export default connect(mapStateToProps)(Settings);
