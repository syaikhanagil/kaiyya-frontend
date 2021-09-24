import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '../../components/Icon';
import { Text } from '../../components/Styled';
import action from '../../configs/redux/action';
import CONSTANT from '../../constant';
// import pushLocation from '../../configs/routes/pushLocation';

const SearchWrapper = styled.div`
    position: fixed;
    display: block;
    width: 100%;
    height: 100vh;
    max-width: 480px;
    padding: 50px 0 10px;
    background: var(--color-white);
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;

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
    justify-content: space-between;
`;

const Item = styled.div`
    position: relative;
    display: flex;
    width: auto;
    height: 100%;
    align-items: center;
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

const SearchHeader = styled.header`
    position: fixed;
    display: block;
    width: 100%;
    max-width: 480px;
    height: auto;
    background: var(--color-white);
    border-bottom: 1px solid #eee;
    top: 0;
    left: 50%;
    color: var(--color-black);
    transform: translateX(-50%);
    transition: .25s ease;
    z-index: 99;

    @media only screen and (max-width: 768px) {
        max-width: 100%;
    }
`;

const SearchContainer = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 38px;
    padding: 0 10px;
    background: #f0f0f0;
    color: #474747;
    margin-left: 10px;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
`;

const SearchInput = styled.input`
    position: relative;
    display: block;
    width: 100%;
    height: 38px;
    background: #f0f0f0;
    font-size: var(--font-extra-small);
    padding: 0 10px;
    outline: none;
`;

const SearchBody = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
`;

const SearchItem = styled(Link)`
    position: relative;
    display: block;
    width: 100%;
    padding: 10px 1rem;
    border-bottom: 1px solid #eee;
`;

const SearchDialog = (props: any) => {
    const { dispatch, products } = props;
    const [keyword, setKeyword] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            if (keyword.length > 0) {
                const matches = products.filter((match: any) => {
                    const regex = new RegExp(`${keyword}`, 'gi');
                    return match.name.match(regex);
                });
                setTimeout(() => {
                    setSuggestions(matches.slice(0, 7));
                }, 250);
            } else {
                setTimeout(() => {
                    setSuggestions([]);
                }, 250);
            }
        }
    }, [keyword]);

    useEffect(() => {
        dispatch(action.fetchProduct());
    }, []);

    return (
        <SearchWrapper>
            <SearchHeader>
                <ItemWrapper>
                    <Item>
                        <ActionBtn onClick={() => dispatch({ type: CONSTANT.SET_SEARCH_DIALOG, visible: false })}>
                            <Icon icon="chevron-left" />
                        </ActionBtn>
                    </Item>
                    <SearchContainer>
                        <SearchInput autoFocus type="text" autoComplete="off" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)} value={keyword} />
                        <ActionBtn onClick={() => setKeyword('')}>
                            <Icon icon="x" />
                        </ActionBtn>
                    </SearchContainer>
                </ItemWrapper>
            </SearchHeader>
            <SearchBody>
                {keyword.length > 0 && suggestions.length > 0 && suggestions.map((i: any, idx: any) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <SearchItem key={idx} to={`/product/${i.slug}`}>{i.name}</SearchItem>
                ))}
                {keyword.length > 0 && suggestions.length < 1 && (
                    <Text block bold alignCenter marginY>Masukkan kata yang lebih spesifik</Text>
                )}
                {keyword.length < 1 && suggestions.length < 1 && (
                    <Text block bold alignCenter marginY>Ketik Nama Produk</Text>
                )}
            </SearchBody>
        </SearchWrapper>
    );
};

const mapStateToProps = (state: any) => {
    return {
        products: state.productReducer.items
    };
};

export default connect(mapStateToProps)(SearchDialog);
