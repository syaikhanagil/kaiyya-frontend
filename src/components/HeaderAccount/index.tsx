import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// import action from '../../configs/redux/action';
// import CONSTANT from '../../constant';
import Icon from '../Icon';

const HeaderWrapper = styled.header`
    position: fixed;
    display: block;
    width: 100%;
    max-width: 480px;
    height: auto;
    background: var(--transparent);
    top: 0;
    left: 50%;
    color: var(--color-black);
    transform: translateX(-50%);
    transition: .25s ease;
    border-bottom: 1px solid var(--transparent);
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
    padding: 5px 1rem 5px;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    border-radius: 15px 15px 0 0;
    color: var(--color-white);
`;

const Item = styled('div') <{ alignRight?: boolean }>`
    position: relative;
    display: flex;
    width: auto;
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
    text-overflow: ellipsis;
    white-space: nowrap;
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

    #counter {
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

interface Props {
    loggedIn: boolean,
    cartItems: any,
    notificationItems: any,
    dispatch: any
}

class HeaderAccount extends React.Component<Props, any> {
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
        // const { cartItems } = this.props;
        // const { notification } = this.state;
        return (
            <HeaderWrapper id="header">
                <ItemWrapper>
                    <Item>
                        <ActionLink to="/">
                            <Icon icon="arrow-left" />
                        </ActionLink>
                        <PageTitle>Akun</PageTitle>
                    </Item>
                    {/* <Item alignRight>
                        <ActionLink to="/notification">
                            <Icon icon="bell" />
                            {notification !== 0 && (
                                <div id="counter">
                                    <span>{notification}</span>
                                </div>
                            )}
                        </ActionLink>
                        <ActionLink to="/cart">
                            <Icon icon="shopping-cart" />
                            <div id="counter">
                                <span>{cartItems.length}</span>
                            </div>
                        </ActionLink>
                        <ActionBtn onClick={() => {}}>
                            <Icon icon="more-vertical" />
                        </ActionBtn>
                    </Item> */}
                </ItemWrapper>
            </HeaderWrapper>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        notificationItems: state.notificationReducer.items,
        cartItems: state.cartReducer.items,
        loggedIn: state.authReducer.loggedIn
    };
};

export default connect(mapStateToProps)(HeaderAccount);
