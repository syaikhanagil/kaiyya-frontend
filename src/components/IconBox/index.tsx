import React from 'react';
import styled from 'styled-components';
import Icon from '../Icon';

const IconBoxWrapper = styled.div`
    position: relative;
    display: block;
    width: auto;
    padding: 10px 0;
    text-align: center;
    border-radius: 6px;
    border: 1px solid #eee;
    cursor: pointer;

    div {
        position: relative;
        width: auto;
        display: block;

        &#icon {
            display: inline-block;
            width: auto;
            margin: 0 auto 5px;
        }

        .feather {
            width: 24px;
            height: 24px;
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
    icon: string,
    counter?: string
}

const IconBox = (props: Props) => {
    const { title, icon, counter } = props;

    return (
        <IconBoxWrapper id="box">
            <div id="icon">
                <Icon icon={icon} />
                {counter !== '0' && (<span id="counter">{parseInt(counter || '0', 10)}</span>)}
            </div>
            <div>
                <span>{title}</span>
            </div>
        </IconBoxWrapper>
    );
};

IconBox.defaultProps = {
    counter: '0'
};

export default IconBox;
