import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Loading from '../../components/Loading';
import { Text } from '../../components/Styled';
import API from '../../configs/api';
import Main from '../../layouts/Main';
import CardDownlineItem from './thisComponent/CardDownlineItem';
import DownlineItem from './thisComponent/DownlineItem';

const MyMitraWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    padding: 0 0 5px;
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
    const [totalMitra, setTotalMitra] = useState(0);
    const [totalAllMitra, setTotalAllMitra] = useState(0);
    // const [activeMenu, setActiveMenu] = useState('all');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        API.fetchReferralDownline().then((res: any) => {
            setDownline(res.data);
            setTotalMitra(res.data.length);
            // setTotalAllMitra(res.data.length);
            setTimeout(() => {
                setReady(true);
            }, 1000);
        });
    };

    const setTotal = (total: number) => {
        if (total > 0) {
            const t = totalMitra + total;
            setTotalAllMitra(t);
        }
    };

    return (
        <Main useHeader backBtn title="Mitra Saya" paddingTop>
            <MyMitraWrapper>
                <CardDownlineItem totalMitra={totalMitra} totalAllMitra={totalAllMitra} />
                {ready && downline.map((item: any, idx: any) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <DownlineItem key={idx} data={item} counter={(total: number) => setTotal(total)} />
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
