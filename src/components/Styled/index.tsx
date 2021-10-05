import styled from 'styled-components';

/**
 * Input & Label
 */
export const InputWrapper = styled.div <{ error?: boolean }>`
    position: relative;
    display: flex;
    width: 100%;
    height: auto;
    align-items: center;
    ${(props) => (props.error ? 'margin: 0 0 30px' : 'margin: 0 0 15px')};

    #input-icon {
        position: absolute;
        display: flex;
        height: 100%;
        width: auto;
        padding: 0 10px;
        align-items: center;
        right: 0;
        top: 0;
        color: #c0c0c0;
        z-index: 1;
        &:hover {
            color: var(--primary-dark);
        }
    }

    #error {
        position: absolute;
        width: 100%;
        text-align: left;
        left: 5px;
        bottom: -20px;
        font-size: var(--font-extra-small);
        color: red;
    }
`;

export const Input = styled('input') <{ floatingLabel?: boolean, rounded?: boolean }>`
    position: relative;
    display: block;
    width: 100%;
    height: auto;
    min-height: 40px;
    padding: 0 15px;
    background: var(--transparent);
    font-size: var(--font-small);
    outline: none;
    border: 1px solid #c0c0c0;
    transition: .25s ease;
    &:hover {
        border: 1px solid var(--primary);
    }
    ${(props) => (props.rounded ? 'border-radius: 50px;' : 'border-radius: 6px;')}
    &:-webkit-autofill,
    &:-webkit-autofill:hover, 
    &:-webkit-autofill:focus {
        -webkit-box-shadow: 0 0 0px 1000px #fff inset;
    }
    ${(props) => (props.floatingLabel && `
        &::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
            color: var(--transparent);
            opacity: 0; /* Firefox */
        }
        &:-ms-input-placeholder { /* Internet Explorer 10-11 */
            color: var(--transparent);
        }
        
        &::-ms-input-placeholder { /* Microsoft Edge */
            color: var(--transparent);
        }
        z-index: 1;
        &:focus,
        &:not(:placeholder-shown){
            &+label {
                top: 0;
                left: 10px;
                font-size: var(--font-extra-small);
                background: var(--color-white);
                cursor: default;
                z-index: 1;
            }
        }
    `)}
`;

export const Label = styled('label') <{ floatingLabel?: boolean }>`
    position: absolute;
    display: block;
    width: auto;
    background: var(--transparent);
    padding: 0 5px;
    left: 10px;
    font-size: var(--font-small);
    user-select: none;
    line-height: 1;
    transition: 0.25s ease;
    ${(props) => (props.floatingLabel ? `
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
        cursor: text;
        z-index: 1;
    ` : `
        top: -5px;
        font-size: var(--font-extra-small);
        background: var(--color-white);
    `)}
`;

/**
 * Select Option
 */

export const Select = styled('select') <{ floatingLabel?: boolean, rounded?: boolean }>`
    position: relative;
    display: block;
    width: 100%;
    height: auto;
    min-height: 40px;
    padding: 0 15px;
    background: var(--transparent);
    font-size: var(--font-small);
    outline: none;
    border: 1px solid #c0c0c0;
    transition: .25s ease;
    &:hover {
        border: 1px solid var(--primary);
    }
    ${(props) => (props.rounded ? 'border-radius: 50px;' : 'border-radius: 6px;')}
    ${(props) => (props.floatingLabel && `
        z-index: 1;
        &:focus,
        &:not(:placeholder-shown){
            &+label {
                top: 0;
                left: 10px;
                font-size: var(--font-extra-small);
                z-index: 1;
            }
        }
    `)}
`;

/**
 * Button
 */

export const Button = styled('button') <{ block?: boolean, fullWidth?: boolean, primary?: boolean, outline?: boolean, rounded?: boolean }>`
    position: relative;
    display: ${(props) => (props.block ? 'block' : 'inline-block')};
    width: auto;
    min-width: ${(props) => (props.fullWidth ? '100%' : '130px')};
    height: 40px;
    background: ${(props) => (props.primary ? 'var(--primary)' : 'var(--transparent)')};
    text-align: center;
    font-size: var(--font-small);
    color: ${(props) => (props.primary ? 'var(--color-white)' : 'var(--color-black)')};
    border: ${(props) => (props.outline ? '1px solid var(--primary)' : '1px solid var(--transaparent)')};
    border-radius: ${(props) => (props.rounded ? '50px' : '6px')};
    outline: none;
    user-select: none;
    transition: .25s ease;
    cusror: pointer;

    &:hover {
        background: ${(props) => (props.primary ? 'var(--primary-dark)' : '#eee')};
    }
    &:disabled {
        background: #eee;
        border: 1px solid #909090;
        color: #909090;
        cursor: not-allowed;
    }
`;

/**
 * Flex Layout
 */

export const FlexBox = styled('div') <{column?: boolean, row?: boolean, wrap?: boolean, alignItemCenter?: boolean, justifyContentCenter?: boolean, justifyContentBetween?: boolean}>`
    position: relative;
    display: flex;
    width: 100%;
    height: auto;
    ${(props) => (props.column && 'flex-direction: column;')}
    ${(props) => (props.row && 'flex-direction: row;')}
    ${(props) => (props.wrap && 'flex-wrap: wrap;')}
    ${(props) => (props.alignItemCenter && 'align-items: center;')}
    ${(props) => (props.justifyContentCenter && 'justify-content: center;')}
    ${(props) => (props.justifyContentBetween && 'justify-content: space-between;')}
`;

/**
 * Text Paragraph
 */

export const Text = styled('p') <{ bold?: boolean, extraSmall?: boolean, block?: boolean, marginY?: boolean, alignCenter?: boolean, alignRight?: boolean, }>`
    position: relative;
    display: ${(props) => (props.block ? 'block' : 'inline-block')};;
    font-weight: ${(props) => (props.bold ? '600' : '400')};
    font-size: ${(props) => (props.extraSmall ? 'var(--font-extra-small)' : 'var(--font-small)')};
    ${(props) => (props.marginY && 'margin-top: 5px; margin-bottom: 5px;')}
    ${(props) => (props.alignCenter && 'text-align: center;')}
    ${(props) => (props.alignRight && 'text-align: right;')}
`;
