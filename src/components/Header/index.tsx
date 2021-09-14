import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '../Icon';

interface Props {
    whiteItem?: boolean,
    transparent?: boolean,
    backBtn?: boolean,
    pageTitle?: string,
    backTo?: string,
    cartBtn?: boolean,
    searchBtn?: boolean,
    notifBtn?: boolean,
    moreBtn?: boolean,
    moreIcon?: string,
    onMoreClick?: () => void,
    cartItems: any
}

const HeaderWrapper = styled.header <{ transparent?: boolean }>`
    position: fixed;
    display: block;
    width: 100%;
    max-width: 480px;
    height: auto;
    background: ${(props) => (props.transparent ? 'var(--transparent)' : 'var(--color-white)')};
    border-bottom: ${(props) => (props.transparent ? '1px solid var(--color-transparent)' : '1px solid #eee')};
    top: 0;
    left: 50%;
    color: ${(props) => (props.transparent ? 'var(--color-white)' : 'var(--color-black)')};
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
    width: 100%;
    height: 100%;
    justify-content: ${(props) => (props.alignRight ? 'flex-end' : 'flex-start')};
    align-items: center;
`;

const PageTitle = styled.span`
    position: relative;
    display: block;
    width: auto;
    padding: 0 5px;
    font-size: var(--font-small);
    font-weight: 600;
`;

const ActionBtn = styled.button`
    position: relative;
    display: inline-block;
    width: auto;
    height: auto;
    padding: 7.5px 9px;
    color: inherit;
    border-radius: 50px;
    &:hover {
        background: #00000025;
    }
`;

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

class Header extends React.Component<Props, any> {
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
        const { transparent, backTo, backBtn, pageTitle, cartBtn, searchBtn, notifBtn, moreBtn, moreIcon, onMoreClick, cartItems } = this.props;
        return (
            <HeaderWrapper transparent={transparent} id="header">
                <ItemWrapper>
                    <Item>
                        {backBtn && (
                            <>
                                {backTo !== '' && (
                                    <ActionLink to={backTo || '/'}>
                                        <Icon icon="arrow-left" />
                                    </ActionLink>
                                )}
                                {backTo === '' && (
                                    <ActionBtn onClick={() => window.history.back()}>
                                        <Icon icon="arrow-left" />
                                    </ActionBtn>
                                )}
                            </>
                        )}
                        {pageTitle && (<PageTitle>{pageTitle}</PageTitle>)}
                    </Item>
                    {/* <SearchBar to="/search">
                        <p>Cari disini</p>
                        <Icon icon="search" />
                    </SearchBar> */}
                    <Item alignRight>
                        {cartBtn && (
                            <ActionLink to="/cart">
                                <Icon icon="shopping-cart" />
                                <div id="cart-counter">
                                    <span>{cartItems.length}</span>
                                </div>
                            </ActionLink>
                        )}
                        {searchBtn && (
                            <ActionLink to="/search">
                                <Icon icon="search" />
                            </ActionLink>
                        )}
                        {notifBtn && (
                            <ActionBtn>
                                notif
                            </ActionBtn>
                        )}
                        {moreBtn && (
                            <ActionBtn onClick={onMoreClick}>
                                <Icon icon={moreIcon || 'more-vertical'} />
                            </ActionBtn>
                        )}
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

export default connect(mapStateToProps)(Header);
