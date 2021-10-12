import React from 'react';
import styled from 'styled-components';

const LoadingWrapper = styled.div <{alignCenter?: boolean}>`
    position: relative;
    display: block;
    width: 100%;
    ${(props) => (props.alignCenter && 'text-align: center;')}
`;

interface Props {
    type: string,
    alignCenter?: boolean
}

const Loading = (props: Props) => {
    const { type, alignCenter } = props;
    return (
        <LoadingWrapper alignCenter={alignCenter}>
            {type === 'spinner' && (
                <div className="loading-spinner">
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                </div>
            )}
            {type === 'ring' && (
                <div className="loading-ring">
                    <div />
                    <div />
                    <div />
                </div>
            )}
        </LoadingWrapper>
    );
};

Loading.defaultProps = {
    alignCenter: false
};

export default Loading;
