import React, { useEffect } from 'react';
import feather from 'feather-icons';
import styled from 'styled-components';

interface Props {
    icon: any,
    custom?: boolean
}

const FeatherWrapper = styled.i`
    position: relative;
    display: inline-block;
    width: 18px;
    height: 18px;
    vertical-align: middle;
`;

const ImageWrapper = styled.div`
    position: relative;
    display: inline-block;
    width: auto;
    height: 100%;
    vertical-align: middle;
    img {
        position: relative;
        display: block;
        height: 100%;
    }
`;

const Icon = (props: Props) => {
    const { icon, custom } = props;

    useEffect(() => {
        if (!custom) {
            feather.replace();
        }
    }, []);

    return (
        <>
            {!custom && (<FeatherWrapper data-feather={icon} />)}
            {custom && (
                <ImageWrapper id="icon-img">
                    <img src={icon} alt="kaiyya-icon" />
                </ImageWrapper>
            )}
        </>
    );
};

Icon.defaultProps = {
    custom: false
};

export default Icon;
