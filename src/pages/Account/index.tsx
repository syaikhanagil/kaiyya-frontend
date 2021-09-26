import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import BottomSheet from '../../components/BottomSheet';
// import Card from '../../components/Card';
import Icon from '../../components/Icon';
// import IconBox from '../../components/IconBox';
import Shimmer from '../../components/Shimmer';
import { Button, Text } from '../../components/Styled';
import action from '../../configs/redux/action';
// import { Button } from '../../components/Styled';
import Main from '../../layouts/Main';

const AccountHeader = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    padding: 10px 1rem;
    background: var(--color-white);
`;

const ProfileWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    align-items: center;

    .profile {
        display: flex;
        width: 50px;
        height: 50px;
        margin-right: 10px;
        align-items: center;
        justify-content: center;
        border: 1px solid #eee;
        border-radius: 50px;
        .feather {
            width: 24px;
            height: 24px;
        }
    }

    .info {
        display: block;
        width: auto;
    }
    
    .auth {
        display: block;
        width: auto;
    }
`;

const AccountBody = styled.div`
    position: relative;
    display: block;
    width: 100%;
`;

const MenuList = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
`;

const MenuItem = styled(Link)`
    position: relative;
    display: block;
    padding: 10px 1rem;
    background: var(--color-white);
    color: var(--color-black);
    border-bottom: 1px solid #f0f0f0;
    text-decoration: none;
    transition: .25s ease;
    

    .feather,
    span {
        vertical-align: middle;
    }
    
    span {
        margin-left: 10px;
    }

    &:hover {
        background: #f7f7f7;
        cursor: pointer;
    }
`;

const LogoutWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    padding: 0 1rem;
    margin-top: 10px;
`;

const LogoutDialogWrapper = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: auto;
    padding: 10px 1rem;
    align-items: center;
    flex-direction: row;

    div {
        position: relative;
        display: block;
        width: 100%;
        margin: 5px;
    }
`;

const Account = (props: any) => {
    const { dispatch, loggedIn, fullname, email, role, isReady } = props;
    const [logoutDialog, setLogoutDialog] = useState(false);

    const fetchData = async () => {
        if (loggedIn && !isReady) {
            await dispatch(action.fetchAccountDetail());
        }
    };

    const onLogoutClick = () => {
        dispatch(action.logout());
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Main useHeader paddingTop backBtn title="Akun" useNavigation activeMenu="account" cartBtn searchBtn>
                <AccountHeader>
                    <ProfileWrapper>
                        <div className="profile">
                            <Icon icon="user" />
                        </div>
                        {loggedIn && (
                            <>
                                <div className="info">
                                    {!isReady && (
                                        <Shimmer height="14px" width="210px" />
                                    )}
                                    {isReady && (
                                        <>
                                            <Text block>{fullname}</Text>
                                            <Text block extraSmall>{email}</Text>
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                        {!loggedIn && (
                            <>
                                <div className="auth">
                                    <p>Masuk ke akun kamu</p>
                                    <span>Masuk</span>
                                </div>
                            </>
                        )}
                    </ProfileWrapper>
                </AccountHeader>
                <AccountBody>
                    {/* <section className="my-2">
                        <Card header title="Semua Pesanan" actionIcon="chevron-right">
                            <div className="flex space-x-4">
                                <div className="flex-1">
                                    <IconBox icon="credit-card" title="Belum Bayar" />
                                </div>
                                <div className="flex-1">
                                    <IconBox icon="clock" title="Diproses" />
                                </div>
                                <div className="flex-1">
                                    <IconBox icon="truck" title="Dikirim" />
                                </div>
                                <div className="flex-1">
                                    <IconBox icon="check-circle" title="Selesai" />
                                </div>
                            </div>
                        </Card>
                    </section> */}
                    <section className="my-2">
                        <MenuList>
                            <MenuItem to="/settings/account">
                                <Icon icon="settings" />
                                <span>Pengaturan Akun</span>
                            </MenuItem>
                            <MenuItem to="/settings/password">
                                <Icon icon="unlock" />
                                <span>Pengaturan Password</span>
                            </MenuItem>
                            <MenuItem to="/account/address">
                                <Icon icon="map-pin" />
                                <span>Pengaturan Alamat</span>
                            </MenuItem>
                            {role && role !== 'retail' && (
                                <MenuItem to="/referral">
                                    <Icon icon="user-plus" />
                                    <span>Fee Edukasi</span>
                                </MenuItem>
                            )}
                            <MenuItem to="/help">
                                <Icon icon="life-buoy" />
                                <span>Rules &amp; Kode Etik</span>
                            </MenuItem>
                            <MenuItem to="/help">
                                <Icon icon="message-circle" />
                                <span>Faq</span>
                            </MenuItem>
                        </MenuList>
                    </section>
                    <LogoutWrapper>
                        <Button block fullWidth primary onClick={() => setLogoutDialog(true)}>
                            {/* <Icon icon="log-out" /> */}
                            Keluar
                        </Button>
                    </LogoutWrapper>
                </AccountBody>
            </Main>
            {logoutDialog && (
                <BottomSheet title="Apakah kamu yakin ingin keluar?" handler={(visibility: boolean) => setLogoutDialog(visibility)}>
                    <LogoutDialogWrapper>
                        <div>
                            <Button block fullWidth primary onClick={() => onLogoutClick()}>Ya</Button>
                        </div>
                        <div>
                            <Button block fullWidth outline onClick={() => setLogoutDialog(false)}>Batal</Button>
                        </div>
                    </LogoutDialogWrapper>
                </BottomSheet>
            )}
        </>
    );
};

const mapStateToProps = (state: any) => {
    return {
        loggedIn: state.authReducer.loggedIn,
        fullname: state.accountReducer.fullname,
        email: state.accountReducer.email,
        role: state.accountReducer.role,
        isReady: state.accountReducer.isReady
    };
};

export default connect(mapStateToProps)(Account);
