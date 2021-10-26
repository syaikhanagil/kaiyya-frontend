/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Loading from '../../components/Loading';
import { Button } from '../../components/Styled';
import API from '../../configs/api';
import pushLocation from '../../configs/routes/pushLocation';
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

const FloatingWrapper = styled.div`
    position: sticky;
    width: 100%;
    background: var(--color-white);
    padding: 5px 1rem;
    bottom: 0;
    left: 0;
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
        <Main useHeader paddingTop backTo="/" title="Join Mitra" paddingBottom backgroundWhite>
            {ready && (
                <Wrapper>
                    <BannerWrapper>
                        <img src={banner.src} alt={banner.name} />
                    </BannerWrapper>
                    <ContentWrapper dangerouslySetInnerHTML={{ __html: content }} />
                    <FloatingWrapper>
                        <Button primary block fullWidth onClick={() => pushLocation.path('/register?as=mitra')}>Join Sekarang</Button>
                    </FloatingWrapper>
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
