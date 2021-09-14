import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BottomSheet from '../BottomSheet';
import AddressItemSheet from '../AddressItemSheet';
import { Button } from '../Styled';
import Icon from '../Icon';
import Toast from '../Toast';

const Wrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    padding: 10px 1rem;
`;

const Item = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    &:last-of-type {
        margin-bottom: 5px;
        border: none;
    }

    p {
        position: relative;
        display: block;
        margin: 0;
        font-weight: 600;
    }

    span {
        font-size: var(--font-extra-small);
    }
`;

interface Props {
    // check: boolean,
    // eslint-disable-next-line no-unused-vars
    onSubmit: (data: any) => void,
    // eslint-disable-next-line no-unused-vars
    handler: (visibility: boolean) => void
}

const CheckCostDialog = (props: Props) => {
    const { onSubmit, handler } = props;
    const [province, setProvince] = useState('');
    const [provinceId, setProvinceId] = useState(0);
    const [provinceSelector, setProvinceSelector] = useState(false);
    const [city, setCity] = useState('');
    const [cityId, setCityId] = useState(0);
    const [citySelector, setCitySelector] = useState(false);
    const [subdistrict, setSubdistrict] = useState('');
    const [subdistrictId, setSubdistrictId] = useState(0);
    const [subdistrictSelector, setSubdistrictSelector] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const selectProvince = (name: string, id: number) => {
        setProvince(name);
        setProvinceId(id);
        setCity('');
        setCityId(0);
        setSubdistrict('');
        setSubdistrictId(0);
    };

    const selectCity = (name: string, id: number) => {
        setCity(name);
        setCityId(id);
        setSubdistrict('');
        setSubdistrictId(0);
    };

    const selectSubdistrict = (name: string, id: number) => {
        setSubdistrict(name);
        setSubdistrictId(id);
    };

    const handleSubmit = () => {
        const data = {
            province,
            provinceId,
            city,
            cityId,
            subdistrict,
            subdistrictId
        };
        onSubmit(data);
        handler(false);
    };

    useEffect(() => {
        if (showToast) {
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        }
    }, [showToast]);

    return (
        <>
            <BottomSheet title="Informasi Ongkos Kirim" handler={(visiibility) => handler(visiibility)}>
                <Wrapper>
                    <Item onClick={() => setProvinceSelector(true)}>
                        <div>
                            <p>Provinsi</p>
                            {!province && (
                                <span>Ketuk untuk memilih provinsi</span>
                            )}
                            {province && (
                                <span>{province}</span>
                            )}
                        </div>
                        <div>
                            <Icon icon="chevron-right" />
                        </div>
                    </Item>
                    <Item onClick={() => {
                        if (province === '') {
                            setToastMessage('Silahkan pilih provisi terlebih dahulu');
                            setShowToast(true);
                        } else {
                            setCitySelector(true);
                        }
                    }}
                    >
                        <div>
                            <p>Kota / Kabupaten</p>
                            {!city && (
                                <span>Ketuk untuk memilih kota/kabupaten</span>
                            )}
                            {city && (
                                <span>{city}</span>
                            )}
                        </div>
                        <div>
                            <Icon icon="chevron-right" />
                        </div>
                    </Item>
                    <Item onClick={() => {
                        if (city === '') {
                            setToastMessage('Silahkan pilih kota terlebih dahulu');
                            setShowToast(true);
                        } else {
                            setSubdistrictSelector(true);
                        }
                    }}
                    >
                        <div>
                            <p>Kecamatan</p>
                            {!subdistrict && (
                                <span>Ketuk untuk memilih kecamatan</span>
                            )}
                            {subdistrict && (
                                <span>{subdistrict}</span>
                            )}
                        </div>
                        <div>
                            <Icon icon="chevron-right" />
                        </div>
                    </Item>
                    <Button disabled={!province || !province || !subdistrict} block primary fullWidth onClick={() => handleSubmit()}>Konfirmasi</Button>
                </Wrapper>
            </BottomSheet>
            {provinceSelector && (
                <AddressItemSheet title="Pilih Provinsi" dataType="province" handler={(visibility) => setProvinceSelector(visibility)} onItemSelect={(name, id) => selectProvince(name, id)} />
            )}
            {citySelector && (
                <AddressItemSheet
                    title="Pilih Kota / Kabupaten"
                    dataType="city"
                    dataId={provinceId}
                    handler={(visibility) => {
                        setCitySelector(visibility);
                    }}
                    onItemSelect={(name, id) => {
                        selectCity(name, id);
                    }}
                />
            )}
            {subdistrictSelector && (
                <AddressItemSheet
                    title="Pilih Kecamatan"
                    dataType="subdistrict"
                    dataId={cityId}
                    handler={(visibility) => setSubdistrictSelector(visibility)}
                    onItemSelect={(name, id) => {
                        if (province === '') {
                            setShowToast(true);
                            return;
                        }
                        selectSubdistrict(name, id);
                    }}
                />
            )}
            {showToast && (
                <Toast message={toastMessage} type="toast" />
            )}
        </>
    );
};

export default CheckCostDialog;
