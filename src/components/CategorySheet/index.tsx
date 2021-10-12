import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import action from '../../configs/redux/action';
import BottomSheet from '../BottomSheet';
import Loading from '../Loading';
// import Shimmer from '../Shimmer';

const CategoryWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: auto;
`;

const CategoryItem = styled.div`
    position: relative;
    display: block;
    width: 100%;
    a {
        position: relative;
        display: block;
        width: 100%;
        padding: 5px 1.5rem;
        text-decoration: none;
    }
    &.active > a {
        font-weight: 600;
        color: var(--primary);
    }
`;

interface Props {
    // eslint-disable-next-line no-unused-vars
    handler: (visibility: boolean) => void,
    activeCategory: string,
    dispatch: any,
    items: any
}

const CategorySheet = (props: Props) => {
    const { handler, activeCategory, dispatch, items } = props;

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
                    <CategoryItem key={i.id} className={activeCategory === i.slug ? 'active' : ''}>
                        <Link to={`/category/${i.slug}`}>{i.name}</Link>
                    </CategoryItem>
                ))}
                {items.length < 1 && (
                    <Loading type="ring" alignCenter />
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
