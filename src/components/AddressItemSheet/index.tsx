import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import API from '../../configs/api';
import BottomSheet from '../BottomSheet';
import Shimmer from '../Shimmer';
import { Input, InputWrapper, Label } from '../Styled';

const Item = styled.div`
    position: relative;
    display: block;
    width: 100%;
    padding: 10px 1.5rem;
    cursor: pointer;
    user-select: none;
`;

const ShimmerWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    padding: 10px 1rem;
`;

const FilterWrapper = styled.div`
    position: sticky;
    width: 100%;
    padding: 10px 1rem;
    top: 51px;
    background: var(--color-white);
    z-index: 1;

    div {
        margin: 0;
    }
`;

interface Props {
    title: string,
    dataType: string,
    dataId?: number,
    // eslint-disable-next-line no-unused-vars
    onItemSelect: (name: string, id: number) => void,
    // eslint-disable-next-line no-unused-vars
    handler: (visibility: boolean) => void
}

const AddressItemSheet = (props: Props) => {
    const { title, dataType, dataId, onItemSelect, handler } = props;
    const [items, setItems] = useState<any>([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [ready, setReady] = useState(false);
    const [suggestion, setSuggestion] = useState('');

    const fetchProvince = () => {
        API.fetchProvince().then((res: any) => {
            setItems(res.data);
            setReady(true);
        });
    };

    const fetchCity = () => {
        const payload = {
            params: dataId
        };
        API.fetchCity(payload).then((res: any) => {
            setItems(res.data);
            setReady(true);
        });
    };

    const fetchSubdistrict = () => {
        const payload = {
            params: dataId
        };

        API.fetchSubdistrict(payload).then((res: any) => {
            setItems(res.data);
            setReady(true);
        });
    };

    const handleSelect = (name: string, id: string) => {
        onItemSelect(name, parseInt(id, 10));
        handler(false);
    };

    const onFilterType = (text: string) => {
        setSuggestion(text);
        let matches = [];
        if (items.length > 0) {
            if (text.length > 0) {
                if (dataType === 'province') {
                    matches = items.filter((match: any) => {
                        const regex = new RegExp(`${text}`, 'gi');
                        return match.province.match(regex);
                    });
                    setFilteredItems(matches);
                }
                if (dataType === 'city') {
                    matches = items.filter((match: any) => {
                        const regex = new RegExp(`${text}`, 'gi');
                        return match.city_name.match(regex);
                    });
                    setFilteredItems(matches);
                }
                if (dataType === 'subdistrict') {
                    matches = items.filter((match: any) => {
                        const regex = new RegExp(`${text}`, 'gi');
                        return match.subdistrict_name.match(regex);
                    });
                    setFilteredItems(matches);
                }
            } else {
                setFilteredItems([]);
            }
        }
    };

    useEffect(() => {
        if (dataType === 'province') {
            fetchProvince();
        }
        if (dataType === 'city') {
            fetchCity();
        }
        if (dataType === 'subdistrict') {
            fetchSubdistrict();
        }
    }, []);

    return (
        <BottomSheet title={title} fullHeight handler={(visibility: boolean) => handler(visibility)}>
            <FilterWrapper>
                <InputWrapper>
                    <Input floatingLabel required name="cari" id="cari" autoComplete="off" placeholder="Cari" onChange={(event: React.ChangeEvent<HTMLInputElement>) => onFilterType(event.target.value)} value={suggestion} />
                    <Label floatingLabel htmlFor="cari">Cari</Label>
                </InputWrapper>
            </FilterWrapper>
            {ready && (
                <>
                    {dataType === 'province' && (
                        <>
                            {suggestion.length > 0 && filteredItems.length > 0 && filteredItems.map((i: any) => (
                                <Item key={i.province_id} data-id={i.province_id} role="button" onClick={() => handleSelect(i.province, i.province_id)}>{i.province}</Item>
                            ))}
                            {suggestion.length < 1 && filteredItems.length < 1 && items.map((i: any) => (
                                <Item key={i.province_id} data-id={i.province_id} role="button" onClick={() => handleSelect(i.province, i.province_id)}>{i.province}</Item>
                            ))}
                        </>
                    )}
                    {dataType === 'city' && (
                        <>
                            {suggestion.length > 0 && filteredItems.length > 0 && filteredItems.map((i: any) => (
                                <Item key={i.city_id} data-id={i.city_id} role="button" onClick={() => handleSelect(`${i.type} ${i.city_name}`, i.city_id)}>{`${i.type} ${i.city_name}`}</Item>
                            ))}
                            {suggestion.length < 1 && filteredItems.length < 1 && items.map((i: any) => (
                                <Item key={i.city_id} data-id={i.city_id} role="button" onClick={() => handleSelect(`${i.type} ${i.city_name}`, i.city_id)}>{`${i.type} ${i.city_name}`}</Item>
                            ))}
                        </>
                    )}
                    {dataType === 'subdistrict' && (
                        <>
                            {suggestion.length > 0 && filteredItems.length > 0 && filteredItems.map((i: any) => (
                                <Item key={i.subdistrict_id} data-id={i.subdistrict_id} role="button" onClick={() => handleSelect(i.subdistrict_name, i.subdistrict_id)}>{i.subdistrict_name}</Item>
                            ))}
                            {suggestion.length < 1 && filteredItems.length < 1 && items.map((i: any) => (
                                <Item key={i.subdistrict_id} data-id={i.subdistrict_id} role="button" onClick={() => handleSelect(i.subdistrict_name, i.subdistrict_id)}>{i.subdistrict_name}</Item>
                            ))}
                        </>
                    )}
                </>
            )}
            {!ready && (
                <ShimmerWrapper>
                    <Shimmer height="16px" width="200px" />
                    <Shimmer height="16px" width="180px" />
                    <Shimmer height="16px" width="160px" />
                    <Shimmer height="16px" width="170px" />
                    <Shimmer height="16px" width="200px" />
                    <Shimmer height="16px" width="180px" />
                    <Shimmer height="16px" width="160px" />
                    <Shimmer height="16px" width="170px" />
                    <Shimmer height="16px" width="200px" />
                    <Shimmer height="16px" width="180px" />
                    <Shimmer height="16px" width="160px" />
                    <Shimmer height="16px" width="170px" />
                    <Shimmer height="16px" width="200px" />
                    <Shimmer height="16px" width="180px" />
                    <Shimmer height="16px" width="160px" />
                    <Shimmer height="16px" width="170px" />
                    <Shimmer height="16px" width="200px" />
                    <Shimmer height="16px" width="180px" />
                    <Shimmer height="16px" width="160px" />
                    <Shimmer height="16px" width="170px" />
                </ShimmerWrapper>
            )}
        </BottomSheet>
    );
};

AddressItemSheet.defaultProps = {
    dataId: 0
};

export default AddressItemSheet;
