import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '../Icon';

const IconBoxWrapper = styled.div`
    position: relative;
    display: flex;
    width: auto;
    padding: 10px 0;
    border-radius: 6px;
    border: 1px solid #eee;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    a {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        padding: 0;
        z-index: 2;
    }

    div {
        position: relative;
        width: auto;
        display: block;

        &#icon {
            display: inline-block;
            height: 24px;
            margin: 0 auto 5px;
            img {
                height: 100%;
            }
        }

        .feather {
            width: 24px;
            height: 24px;
            stroke-width: 1.5;
        }

        span {
            position: relative;
            display: block;
            font-size: var(--font-extra-small);

            &#counter {
                position: absolute;
                padding: 1.5px 4px;
                background: var(--color-black);
                color: var(--color-white);
                border-radius: 50px;
                top: 0;
                right: -15px;
                line-height: 1;
            }
        }
    }
`;

interface Props {
    title: string,
    icon: any,
    link?: string,
    custom?: boolean,
    counter?: string
}

const IconBox = (props: Props) => {
    const { title, icon, link, custom, counter } = props;

    return (
        <IconBoxWrapper id="box">
            {link && (
                <Link to={link} />
            )}
            <div id="icon">
                <Icon custom={custom} icon={icon} />
                {counter !== '0' && (<span id="counter">{parseInt(counter || '0', 10)}</span>)}
            </div>
            <div>
                <span>{title}</span>
            </div>
        </IconBoxWrapper>
    );
};

IconBox.defaultProps = {
    link: '',
    custom: false,
    counter: '0'
};

export default IconBox;
