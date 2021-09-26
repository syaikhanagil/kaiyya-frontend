import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import AddressItemSheet from '../../components/AddressItemSheet';
import Icon from '../../components/Icon';
import { Button } from '../../components/Styled';
import API from '../../configs/api';
import Main from '../../layouts/Main';

const Wrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    background: var(--color-white);
`;

const SectionTitle = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: auto;
    padding: 4px 1.5rem;
    background: #f0f0f0;
    color: #9e9e9e;
`;

const SectionWrapper = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    padding: 10px 1.5rem;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    cursor: pointer;

    &:last-of-type {
        margin-bottom: 5px;
        border: none;
    }

    div {
        position: relative;
        display: block;
        width: 100%;

        &#icon-action {
            text-align: right;
            width: 20%;
        }
    }

    p,
    label {
        position: relative;
        display: block;
        margin: 0;
        font-weight: 600;
    }

    label {
        cursor: pointer;
    }

    input, textarea {
        position: relative;
        display: block;
        width: 100%;
        outline: none;
        border: none;
    }
    
    textarea {
        width: 100%;
        resize: none;
    }

    span, input {
        font-size: var(--font-extra-small);
    }
`;

const SubmitWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    padding: 0 1.5rem;
    margin: 10px 0;
`;

interface State {
    name: string,
    phone: string,
    province: string,
    provinceId: number,
    provinceSelector: boolean
    city: string,
    cityId: number,
    citySelector: boolean,
    subdistrict: string,
    subdistrictId: number,
    subdistrictSelector: boolean,
    detail: string,
}

class CreateAddress extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            province: '',
            provinceId: 0,
            provinceSelector: false,
            city: '',
            cityId: 0,
            citySelector: false,
            subdistrict: '',
            subdistrictId: 0,
            subdistrictSelector: false,
            detail: ''
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleProvinceSelector = this.handleProvinceSelector.bind(this);
        this.handleCitySelector = this.handleCitySelector.bind(this);
        this.handleSubdistrictSelector = this.handleSubdistrictSelector.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(event: { target: { id: any; value: any; }; }) {
        if (event.target.id === 'phone') {
            const regex = /^[0-9]{0,13}$/;
            if (regex.test(event.target.value)) {
                this.setState({ phone: event.target.value });
            }
            return;
        }
        const newState = { [event.target.id]: event.target.value } as Pick<State, keyof State>;
        this.setState(newState);
    }

    handleProvinceSelector() {
        const { provinceSelector } = this.state;
        this.setState({ provinceSelector: !provinceSelector });
    }

    handleCitySelector() {
        const { citySelector } = this.state;
        this.setState({ citySelector: !citySelector });
    }

    handleSubdistrictSelector() {
        const { subdistrictSelector } = this.state;
        this.setState({ subdistrictSelector: !subdistrictSelector });
    }

    handleSubmit() {
        const redirect = window.location.search;
        const { name, phone, province, provinceId, city, cityId, subdistrict, subdistrictId, provinceSelector, citySelector, subdistrictSelector, detail } = this.state;
        const payload = {
            body: {
                name,
                phone,
                province,
                provinceId,
                city,
                cityId,
                subdistrict,
                subdistrictId,
                provinceSelector,
                citySelector,
                subdistrictSelector,
                detail
            }
        };
        API.createAddress(payload).then(() => {
            if (redirect) {
                window.location.href = redirect.replace('?redirect=', '/');
                return;
            }
            window.location.href = '/account/address';
        });
    }

    render() {
        const { name, phone, province, provinceId, provinceSelector, city, cityId, citySelector, subdistrict, subdistrictSelector, detail } = this.state;
        // const { name, phone, province, provinceId, city, cityId, subdistrict, subdistrictId, provinceSelector, citySelector, subdistrictSelector } = this.state;
        return (
            <Main useHeader backBtn paddingTop title="Tambah Alamat Baru">
                <>
                    <Wrapper>
                        <SectionTitle>Kontak</SectionTitle>
                        <SectionWrapper>
                            <div>
                                <label htmlFor="name">Nama Penerima</label>
                                <input type="text" required name="name" id="name" autoComplete="off" placeholder="Nama Penerima" onChange={this.handleInput} value={name} />
                            </div>
                        </SectionWrapper>
                        <SectionWrapper>
                            <div>
                                <label htmlFor="phone">Nomor HP</label>
                                <input type="text" required name="phone" id="phone" autoComplete="off" placeholder="Nomor HP" onChange={this.handleInput} value={phone} />
                            </div>
                        </SectionWrapper>
                        <SectionTitle>Alamat</SectionTitle>
                        <SectionWrapper onClick={this.handleProvinceSelector}>
                            <div>
                                <p>Provinsi</p>
                                {!province && (
                                    <span>Ketuk untuk memilih provinsi</span>
                                )}
                                {province && (
                                    <span>{province}</span>
                                )}
                            </div>
                            <div id="icon-action">
                                <Icon icon="chevron-right" />
                            </div>
                        </SectionWrapper>
                        <SectionWrapper onClick={this.handleCitySelector}>
                            <div>
                                <p>Kota / Kabupaten</p>
                                {!city && (
                                    <span>Ketuk untuk memilih kota / kabupaten</span>
                                )}
                                {city && (
                                    <span>{city}</span>
                                )}
                            </div>
                            <div id="icon-action">
                                <Icon icon="chevron-right" />
                            </div>
                        </SectionWrapper>
                        <SectionWrapper onClick={this.handleSubdistrictSelector}>
                            <div>
                                <p>Kecamatan</p>
                                {!subdistrict && (
                                    <span>Ketuk untuk memilih kecamatan</span>
                                )}
                                {subdistrict && (
                                    <span>{subdistrict}</span>
                                )}
                            </div>
                            <div id="icon-action">
                                <Icon icon="chevron-right" />
                            </div>
                        </SectionWrapper>
                        <SectionWrapper>
                            <div>
                                <label htmlFor="detail">Alamat Lengkap</label>
                                <textarea name="detail" id="detail" onChange={this.handleInput} rows={3} placeholder="Alamat Lengkap" value={detail} />
                            </div>
                        </SectionWrapper>
                        {provinceSelector && (
                            <AddressItemSheet
                                title="Pilih Provinsi"
                                dataType="province"
                                handler={(visibility) => this.setState({ provinceSelector: visibility })}
                                onItemSelect={(provinceName, id) => {
                                    this.setState({ province: provinceName, provinceId: id, city: '', cityId: 0, subdistrict: '', subdistrictId: 0 });
                                }}
                            />
                        )}
                        {citySelector && (
                            <AddressItemSheet
                                title="Pilih Kota / Kabupaten"
                                dataType="city"
                                dataId={provinceId}
                                handler={(visibility) => this.setState({ citySelector: visibility })}
                                onItemSelect={(cityName, id) => {
                                    this.setState({ city: cityName, cityId: id, subdistrict: '', subdistrictId: 0 });
                                }}
                            />
                        )}
                        {subdistrictSelector && (
                            <AddressItemSheet
                                title="Pilih Kecamatan"
                                dataType="subdistrict"
                                dataId={cityId}
                                handler={(visibility) => this.setState({ subdistrictSelector: visibility })}
                                onItemSelect={(subdistrictName, id) => {
                                    this.setState({ subdistrict: subdistrictName, subdistrictId: id });
                                }}
                            />
                        )}
                    </Wrapper>
                    <SubmitWrapper>
                        <Button disabled={!name || !phone || !province || !city || !subdistrict || !detail} block fullWidth primary onClick={this.handleSubmit}>Simpan Alamat</Button>
                    </SubmitWrapper>
                </>
            </Main>
        );
    }
}

export default connect(null)(CreateAddress);
