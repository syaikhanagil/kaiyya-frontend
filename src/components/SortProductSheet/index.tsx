import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BottomSheet from '../BottomSheet';
import { Button, Text } from '../Styled';

const SortProductWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: auto;
    padding: 10px 1.5rem;
`;

const SortItem = styled.div`
    position: relative;
    display: block;
    width: 100%;
    margin-bottom: 10px;
    cursor: pointer;
    &.active {
        color: var(--primary);
        p {
            font-weight: 600;
        }
    }
`;

interface Props {
    activeSort: string,
    // eslint-disable-next-line no-unused-vars
    handler: (visibility: boolean) => void,
    // eslint-disable-next-line no-unused-vars
    onSubmit: (sort: string) => void
}

const SortProductSheet = (props: Props) => {
    const { activeSort, handler, onSubmit } = props;
    const [sortBy, setSortBy] = useState('');

    useEffect(() => {
        if (activeSort !== '') {
            setSortBy(activeSort);
        }
    }, [activeSort]);

    const handleSubmit = () => {
        onSubmit(sortBy);
        setTimeout(() => {
            handler(false);
        }, 250);
    };

    return (
        <BottomSheet title="Urutkan" handler={handler}>
            <SortProductWrapper>
                <SortItem onClick={() => setSortBy('newest')} className={sortBy === 'newest' ? 'active' : ''}>
                    <Text>Terbaru</Text>
                </SortItem>
                <SortItem onClick={() => setSortBy('lowest')} className={sortBy === 'lowest' ? 'active' : ''}>
                    <Text>Harga Terendah</Text>
                </SortItem>
                <SortItem onClick={() => setSortBy('highest')} className={sortBy === 'highest' ? 'active' : ''}>
                    <Text>Harga Tertinggi</Text>
                </SortItem>
                <SortItem onClick={() => setSortBy('name')} className={sortBy === 'name' ? 'active' : ''}>
                    <Text>Berdasarkan Nama (A-Z)</Text>
                </SortItem>
                <Button block fullWidth primary onClick={() => handleSubmit()}>Terapkan</Button>
            </SortProductWrapper>
        </BottomSheet>
    );
};

export default SortProductSheet;
