import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '../Icon';

const FloatingWrapper = styled.div`
    position: fixed;
    display: block;
    height: 50px;
    width: 100%;
    max-width: 480px;
    text-align: right;
    padding: 0 1rem;
    left: 50%;
    bottom: 60px;
    transform: translateX(-50%);
    z-index: 10;
    .cart {
        position: relative;
        display: flex;
        width: 50px;
        height: 50px;
        float: right;
        justify-content: center;
        align-items: center;
        border-radius: 50px;
        background: var(--primary);
        color: var(--color-white);
        cursor: pointer;
        
        .feather {
            width: 24px;
            height: 24px;
        }
        #cart-counter {
            position: absolute;
            display: flex;
            width: 18px;
            height: 18px;
            font-size: var(--font-extra-small);
            background: var(--color-white);
            color: var(--primary);
            top: 10px;
            right: 5px;
            justify-content: center;
            align-items: center;
            line-height: 1;
            border-radius: 50px;
        }
    }
`;

const FloatingCart = (props: any) => {
    const { items } = props;

    return (
        <FloatingWrapper>
            <Link className="cart" to="/cart">
                <Icon icon="shopping-cart" />
                <div id="cart-counter">
                    <span>{items.length}</span>
                </div>
            </Link>
        </FloatingWrapper>
    );
};

const mapStateToProps = (state: any) => {
    return {
        items: state.cartReducer.items
    };
};

export default connect(mapStateToProps)(FloatingCart);
