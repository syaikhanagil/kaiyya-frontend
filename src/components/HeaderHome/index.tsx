import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CONSTANT from '../../constant';
import Icon from '../Icon';

const HeaderWrapper = styled.header`
    position: fixed;
    display: block;
    width: 100%;
    max-width: 480px;
    height: auto;
    background: var(--transparent);
    border-bottom: 1px solid var(--transparent);
    top: 0;
    left: 50%;
    color: var(--color-white);
    transform: translateX(-50%);
    transition: .25s ease;
    z-index: 99;

    &.fixed {
        color: var(--color-black);
        background: var(--color-white);
        border-bottom: 1px solid #eee;
    }

    @media only screen and (max-width: 768px) {
        max-width: 100%;
    }
`;

const ItemWrapper = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    margin: auto;
    padding: 5px 1rem;
    align-items: center;
    flex-direction: row;
`;

const Item = styled('div') <{ alignRight?: boolean }>`
    position: relative;
    display: flex;
    width: auto;
    height: 100%;
    justify-content: ${(props) => (props.alignRight ? 'flex-end' : 'flex-start')};
    align-items: center;
`;

// const ActionBtn = styled.button`
//     position: relative;
//     display: inline-block;
//     width: auto;
//     height: auto;
//     padding: 7.5px 9px;
//     color: inherit;
//     border-radius: 50px;
//     &:hover {
//         background: #00000025;
//     }
// `;

const ActionLink = styled(Link)`
    position: relative;
    display: inline-block;
    width: auto;
    height: auto;
    padding: 7.5px 9px;
    color: inherit;
    text-decoration: none;
    border-radius: 50px;
    &:hover {
        background: #00000025;
    }

    #cart-counter {
        position: absolute;
        display: flex;
        width: 16px;
        height: 16px;
        font-size: 12px;
        background: var(--primary);
        color: var(--color-white);
        top: 5px;
        right: 0;
        justify-content: center;
        align-items: center;
        line-height: 1;
        border-radius: 50px;
    }
`;

const SearchBar = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 32px;
    padding: 0 10px;
    background: #eee;
    color: #474747;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
`;

interface Props {
    cartItems: any,
    dispatch: any
}

class HeaderHome extends React.Component<Props, any> {
    constructor(props: Props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        const { scrollY } = window;
        const header = document.getElementById('header');
        if (scrollY > 100) {
            header?.classList.add('fixed');
        } else if (scrollY < 100) {
            header?.classList.remove('fixed');
        }
    }

    render() {
        const { cartItems, dispatch } = this.props;
        return (
            <HeaderWrapper id="header">
                <ItemWrapper>
                    <SearchBar onClick={() => dispatch({ type: CONSTANT.SET_SEARCH_DIALOG, visble: true })}>
                        <p>Cari disini</p>
                        <Icon icon="search" />
                    </SearchBar>
                    <Item alignRight>
                        <ActionLink to="/cart">
                            <Icon icon="shopping-cart" />
                            <div id="cart-counter">
                                <span>{cartItems.length}</span>
                            </div>
                        </ActionLink>
                        {/* <ActionBtn onClick={() => {}}>
                            <Icon icon="more-vertical" />
                        </ActionBtn> */}
                    </Item>
                </ItemWrapper>
            </HeaderWrapper>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        cartItems: state.cartReducer.items
    };
};

export default connect(mapStateToProps)(HeaderHome);
