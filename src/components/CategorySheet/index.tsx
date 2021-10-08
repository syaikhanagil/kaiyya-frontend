import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import action from '../../configs/redux/action';
import BottomSheet from '../BottomSheet';
import Shimmer from '../Shimmer';
import { Text } from '../Styled';

const CategoryWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: auto;
    padding: 10px 1.5rem;
`;

interface Props {
    // eslint-disable-next-line no-unused-vars
    handler: (visibility: boolean) => void,
    dispatch: any,
    items: any
}

const CategorySheet = (props: Props) => {
    const { handler, dispatch, items } = props;

    const fetchData = () => {
        dispatch(action.fetchCategory());
    };

    useEffect(() => {
        if (items.length < 1) {
            fetchData();
        }
    }, []);

    return (
        <BottomSheet title="Kategori" fullHeight handler={handler}>
            <CategoryWrapper>
                {items.length > 0 && items.map((i: any) => (
                    <Link key={i.id} to={`/category/${i.slug}`}>
                        <Text block marginY>{i.name}</Text>
                    </Link>
                ))}
                {items.length < 1 && (
                    <>
                        <Shimmer height="14px" width="40%" />
                        <Shimmer height="14px" width="60%" />
                        <Shimmer height="14px" width="45%" />
                        <Shimmer height="14px" width="55%" />
                        <Shimmer height="14px" width="40%" />
                        <Shimmer height="14px" width="60%" />
                        <Shimmer height="14px" width="45%" />
                        <Shimmer height="14px" width="55%" />
                        <Shimmer height="14px" width="40%" />
                        <Shimmer height="14px" width="60%" />
                        <Shimmer height="14px" width="45%" />
                        <Shimmer height="14px" width="55%" />
                        <Shimmer height="14px" width="40%" />
                        <Shimmer height="14px" width="60%" />
                        <Shimmer height="14px" width="45%" />
                        <Shimmer height="14px" width="55%" />
                        <Shimmer height="14px" width="40%" />
                        <Shimmer height="14px" width="60%" />
                        <Shimmer height="14px" width="45%" />
                        <Shimmer height="14px" width="55%" />
                        <Shimmer height="14px" width="40%" />
                        <Shimmer height="14px" width="60%" />
                        <Shimmer height="14px" width="45%" />
                        <Shimmer height="14px" width="55%" />
                    </>
                )}
            </CategoryWrapper>
        </BottomSheet>
    );
};

const mapStateToProps = (state: any) => {
    return {
        items: state.categoryReducer.items
    };
};

export default connect(mapStateToProps)(CategorySheet);
