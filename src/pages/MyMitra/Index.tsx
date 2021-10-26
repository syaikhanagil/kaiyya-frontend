import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Loading from '../../components/Loading';
import { Text } from '../../components/Styled';
import API from '../../configs/api';
import Main from '../../layouts/Main';
import DownlineItem from './thisComponent/DownlineItem';

const MyMitraWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    padding: 5px 0;
`;

// const staticDataOne = {
//     name: 'Agil 1',
//     role: 'Distributor',
//     downline: [
//         {
//             name: 'Agil'
//         },
//         {
//             name: 'Agil'
//         }
//     ]
// };

// const staticDataTwo = {
//     name: 'Agil 2',
//     role: 'Distributor',
//     downline: [
//         {
//             name: 'Agil'
//         }
//     ]
// };

const MyMitra = () => {
    // const { role } = props;
    const [ready, setReady] = useState(false);
    const [downline, setDownline] = useState([]);
    // const [activeMenu, setActiveMenu] = useState('all');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        API.fetchReferralDownline().then((res: any) => {
            setDownline(res.data);
            console.log(res.data);
            setTimeout(() => {
                setReady(true);
            }, 1000);
        });
    };

    // const getDownlineByRole = () => {

    // };

    // useEffect(() => {
    //     setActiveMenu();
    // }, [downline]);

    return (
        <Main useHeader backBtn title="Mitra Saya" paddingTop>
            <MyMitraWrapper>
                {ready && downline.map((item: any, idx: any) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <DownlineItem key={idx} data={item} />
                ))}
                {ready && downline.length < 1 && (
                    <>
                        <Text block alignCenter>Belum ada mitra terdaftar</Text>
                    </>
                )}
                {!ready && (
                    <Loading type="ring" alignCenter />
                )}
            </MyMitraWrapper>
        </Main>
    );
};

const mapStateToProps = (state: any) => {
    return {
        role: state.accountReducer.role,
        downline: state.referralReducer.downline
    };
};

export default connect(mapStateToProps)(MyMitra);
