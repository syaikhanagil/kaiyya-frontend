import React from 'react';
import styled from 'styled-components';

const NewReleaseWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
`;

const NewReleaseItems = styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
`;

const NewRelease = () => {
    return (
        <NewReleaseWrapper>
            <NewReleaseItems>
                Oke
            </NewReleaseItems>
        </NewReleaseWrapper>
    );
};

export default NewRelease;
