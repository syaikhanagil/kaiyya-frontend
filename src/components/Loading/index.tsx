import React from 'react';

interface Props {
    type: string
}

const Loading = (props: Props) => {
    const { type } = props;
    return (
        <>
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
        </>
    );
};

export default Loading;
