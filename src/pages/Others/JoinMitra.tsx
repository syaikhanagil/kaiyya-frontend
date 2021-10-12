/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Loading from '../../components/Loading';
import API from '../../configs/api';
import Main from '../../layouts/Main';

const Wrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
`;

const BannerWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
`;

const ContentWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    padding: 20px 1.5rem;
`;

const JoinMitra = () => {
    const [content, setContent] = useState('');
    const [banner, setBanner] = useState<any>({});
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const payload = {
            params: '/join-mitra'
        };
        API.fetchPostDetail(payload).then((res: any) => {
            setContent(res.data.content);
            setBanner(res.data.thumbnail);
            setTimeout(() => {
                setReady(true);
            }, 1000);
        });
    }, []);
    return (
        <Main useHeader paddingTop backTo="/" title="Join Mitra" backgroundWhite>
            {ready && (
                <Wrapper>
                    <BannerWrapper>
                        <img src={banner.src} alt={banner.name} />
                    </BannerWrapper>
                    <ContentWrapper dangerouslySetInnerHTML={{ __html: content }} />
                </Wrapper>
            )}
            {!ready && (
                <Wrapper>
                    <Loading type="ring" alignCenter />
                </Wrapper>
            )}
        </Main>
    );
};

export default JoinMitra;
