import React from 'react';
import styled, { keyframes } from 'styled-components';

const shimmerAnimation = keyframes`
    0% {
        background-position: -468px 0;
    }

    100% {
        background-position: 468px 0; 
    }
`;

const ShimmerWrapper = styled('div') <{ minWidth?: string, minHeight?: string, rounded?: boolean, block?: boolean, margin?: boolean }>`
    position: relative;
    display: ${(props) => (props.block ? 'block' : 'inline-block')};
    width: ${(props) => (props.minWidth ? props.minWidth : '100%')};
    height: ${(props) => (props.minHeight ? props.minHeight : '100%')};
    background: #f6f7f8;
    background-image: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
    background-repeat: no-repeat;
    background-size: 800px 100%; 
    ${(props) => (props.rounded && 'border-radius: 6px;')}
    -webkit-animation-duration: 1s;
    -webkit-animation-fill-mode: forwards; 
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-name: ${shimmerAnimation};
    -webkit-animation-timing-function: linear;
    ${(props) => (props.margin ? `
    &:not(:first-of-type) {
        margin-top: 10px;
    }` : '')}
`;

const ShimmerBox = styled('div') <{ minWidth?: string, minHeight?: string }>`
    position: relative;
    width: ${(props) => (props.minWidth ? props.minWidth : '100%')};
    height: ${(props) => (props.minHeight ? props.minHeight : '100%')};
`;

interface Props {
    width?: string,
    height?: string,
    rounded?: boolean,
    block?: boolean,
    margin?: boolean,
}

const Shimmer = (props: Props) => {
    const { width, height, rounded, block, margin } = props;
    return (
        <ShimmerWrapper minWidth={width} minHeight={height} rounded={rounded} block={block} margin={margin}>
            <ShimmerBox minWidth={width} minHeight={height} />
        </ShimmerWrapper>
    );
};

Shimmer.defaultProps = {
    width: '100%',
    height: '100%',
    rounded: false,
    block: true,
    margin: true
};

export default Shimmer;
