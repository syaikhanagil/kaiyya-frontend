import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Slider from 'react-slick';
import styled from 'styled-components';
import AddToCartDialog from '../../components/AddToCartDialog';
// import FloatingCart from '../../components/FloatingCart';
import Icon from '../../components/Icon';
import Shimmer from '../../components/Shimmer';
import API from '../../configs/api';
import action from '../../configs/redux/action';
import discount from '../../helpers/discount';
import priceFormat from '../../helpers/price';
import Main from '../../layouts/Main';
import ActionDialog from './thisComponent/ActionDialog';
import analytic from '../../configs/analytics';
// import CheckCostDialog from '../../components/CheckCostDialog';
import DescriptionSheet from './thisComponent/DescriptionSheet';
import ShareLinkSheet from '../../components/ShareLinkSheet';

const ProductWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    padding-bottom: 45px;
`;

const ImageWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: auto;
    min-height: 470px;
    max-height: 470px;
    overflow: hidden;

    .slick-index {
        position: absolute;
        display: flex !important;
        right: 1rem;
        bottom: 5px;
        padding: 5px 15px;
        line-height: 1;
        color: var(--color-white);
        font-family: monospace;
        border-radius: 50px;
        z-index: 1;
    }

    .slick-dots {
        position: absolute;
        display: flex !important;
        left: 1rem;
        bottom: 5px;
        margin: -30px auto 0;
        padding: 5px 15px;
        list-style-type: none;
        z-index: 1;

        li {
            width: 10px;
            height: 10px;
            margin: 0 2.5px;

            button {
                height: 10px;
                width: 10px;

                &::before {
                    content: '';
                    height: 2px;
                    width: 10px;
                    background: var(--color-white);
                    top: 50%;
                    left: 50%;
                    border: 1px solid #fff;
                    opacity: 1;
                    transform: translate(-50%, -50%);
                }
            }

            &.slick-active {
                width: 10px;
                height: 10px;

                button {
                    width: 10px;
                    height: 10px;

                    &::before {
                        content: '';
                        width: 6px;
                        height: 6px;
                        background: var(--transparent);
                        border-radius: 50px;
                        border: 2px solid #fff;
                    }
                }
            }
        }
    }

    .slick-slider {
        position: relative;
        height: 100%;
        max-height: 470px;
    }
`;

const ImageItem = styled.div`
    position: relative;
    display: block;
    width: 100%;
    outline: none;
    user-select: none;
    cursor: pointer;
`;

const InfoWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    background: var(--color-white);
    padding: 10px 1rem;
    margin-bottom: 10px;

    h2 {
        font-size: 1.2rem;
        font-weight: 600;
    }

    .price {
        position: relative;
        display: inline-block;
        font-size: var(--font-small);
        font-weight: 500;

        &.slash {
            color: red;
            margin-right: 10px;
            &::before {
                content: '';
                position: absolute;
                width: 100%;
                height: 1px;
                background: red;
                top: 50%;
                left: 0;
                transform: translateY(-50%);
                z-index: 1;
            }
        }
    }

    .title {
        font-size: var(--font-small);
        font-weight: 600;
        margin: 0;
    }

    .desc {
        font-size: var(--font-extra-small);
        font-weight: 400;
    }
`;

const SectionWrapper = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    background: var(--color-white);
    align-items: center;
    padding: 10px 1rem;
    margin-bottom: 10px;
    cursor: pointer;
    
    div {
        position: relative;
        height: 100%;
        width: auto;
        margin: 0 5px;
        padding: 0 5px;
        text-align: left;

        &:nth-child(2) {
            width: 100%;
        }

        &:nth-child(3) {
            text-align: right;
        }
    }
    p {
        font-size: var(--font-small);
        font-weight: 600;
        margin: 0;
    }

    span {
        font-size: 
    }

    .desc {
        font-size: var(--font-extra-small);
        font-weight: 400;
    }
`;

const DetailWrapper = styled.div`
    position: relative;
    padding: 10px 1rem;
    background: var(--color-white);

    p.title {
        font-size: var(--font-small);
        font-weight: 600;
        margin: 0 0 10px;
    }

    .detail {
        width: 100%;
        height: 100px;
        overflow: hidden;
    }
    .show-more {
        width: 100%;
        padding: 10px 0;
        font-weight: 600;
        text-align: center;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
        cursor: pointer;
    }
`;

const FloatingWrapper = styled.div`
    position: fixed;
    display: flex;
    width: 100%;
    max-width: 480px;
    height: auto;
    background: var(--color-white);
    left: 50%;
    bottom: 0;
    flex-direction: row;
    justify-content: space-between;
    transform: translateX(-50%);
    z-index: 9;

    @media only screen and (max-width: 768px) {
        max-width: 100%;
    }
`;

const BaseBtn = styled.div`
    width: 100%;
    height: 100%;
    padding: 10px 1rem;
    color: var(--color-white);
    text-align: center;
    cursor: pointer;
`;

const ChatBtn = styled(BaseBtn)`
    width: auto;
    flex-basis: 30%;
    background: var(--primary-dark);
`;

const CartBtn = styled(BaseBtn)`
    background: var(--primary);
`;

interface Params {
    slug: string
}

const ProductDetail = (props: any) => {
    const { slug } = useParams<Params>();
    const { dispatch, addons, role } = props;
    const [imageData, setImageData] = useState([]);
    const [imageReady, setImageReady] = useState(false);
    const [detailData, setDetailData] = useState<any | { name: string, detail: string }>({});
    const [detailReady, setDetailReady] = useState(false);
    const [sizeData, setSizeData] = useState<any>([]);
    const [sizeReady, setSizeReady] = useState(false);
    const [currentImage, setCurrentImage] = useState(1);
    const [actionVisible, setActionVisible] = useState(false);
    const [cartDialogVisible, setCartDialogVisible] = useState(false);
    // const [costData, setCostData] = useState([]);
    // const [checkCostDialog, setCheckCostDialog] = useState(false);
    const [descriptionDialog, setDescriptionDialog] = useState(false);
    const [shareDialog, setShareDialog] = useState(false);

    const fetchData = async () => {
        const payload = {
            params: slug
        };
        await API.fetchProductDetail(payload).then((res: any) => {
            setImageData(res.data.images);
            setDetailData(res.data);
            setSizeData(res.data.sizes);
            setTimeout(() => {
                setImageReady(true);
                setDetailReady(true);
                setSizeReady(true);
            }, 1000);
        }).catch(() => {
            // setNotFound(true);
            // window.location.href = '/not-found';
        });
        await dispatch(action.fetchAccountDetail());
    };

    useEffect(() => {
        fetchData();
    }, [slug]);

    const actionHandler = (visibility: any, alert: boolean) => {
        if (sizeReady) {
            setActionVisible(visibility);
            if (alert) {
                setCartDialogVisible(true);
                setTimeout(() => {
                    setCartDialogVisible(false);
                }, 1000);
            }
        }
    };

    // useEffect(() => {
    //     if (checkCostDialog) {
    //         if ('geolocation' in navigator) {
    //             navigator.geolocation.getCurrentPosition((position) => {
    //                 console.log('Latitude is :', position.coords.latitude);
    //                 console.log('Longitude is :', position.coords.longitude);
    //             });
    //         } else {
    //             console.log('geolocation not Available');
    //         }
    //     }
    // }, [checkCostDialog]);

    useEffect(() => {
        analytic.pageView();
    }, [detailReady]);

    // window.onscroll = () => {
    //     if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
    //         if (imageReady && !detailReady) {
    //             setTimeout(() => {
    //                 setDetailReady(true);
    //             }, 1000);
    //         } else if (imageReady && detailReady && !sizeReady) {
    //             setTimeout(() => {
    //                 setSizeReady(true);
    //             }, 1000);
    //         }
    //     }
    // };

    const sliderSettings = {
        dots: true,
        infinite: true,
        arrows: false,
        autoplay: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: (current: any) => setCurrentImage(current + 1)
    };

    // const onCheckCost = async (data: any) => {
    //     const payload = {
    //         body: data
    //     };
    //     await API.fetchShipmentCost(payload).then((res: any) => {
    //         const response = res.data;
    //         if (response.length < 1) {
    //             setCostData([]);
    //         } else {
    //             setCostData(response);
    //         }
    //     });
    // };

    return (
        <>
            <Helmet>
                <title>{detailData.name}</title>
            </Helmet>
            <Main useHeader backBtn transparentHeader paddingTop={false} paddingBottom={false} cartBtn searchBtn moreBtn moreIcon="share-2" onMoreClick={() => { setShareDialog(true); }}>
                <ProductWrapper>
                    {!imageReady && (
                        <Shimmer height="470px" />
                    )}
                    {imageReady && (
                        <ImageWrapper>
                            <Slider {...sliderSettings}>
                                {imageData.map((i: any) => (
                                    <ImageItem key={i.id}>
                                        <img src={i.src} alt={slug} />
                                    </ImageItem>
                                ))}
                            </Slider>
                            <div className="slick-index">
                                <span>{currentImage}</span>
                                <span>/</span>
                                <span>{imageData.length}</span>
                            </div>
                        </ImageWrapper>
                    )}
                    <InfoWrapper>
                        {!detailReady && (
                            <>
                                <Shimmer height="20px" width="230px" />
                                <Shimmer height="16px" width="150px" />
                            </>
                        )}
                        {detailReady && (
                            <>
                                <h2>{detailData.name}</h2>
                                {role !== '' && role !== 'retail' && (
                                    <p className="price slash">{priceFormat(sizeData[0].price)}</p>
                                )}
                                <p className="price">{priceFormat(discount(sizeData[0].price, addons.discount))}</p>
                            </>
                        )}
                    </InfoWrapper>
                    <SectionWrapper>
                        <div>
                            <Icon icon="file-text" />
                        </div>
                        <div>
                            <p>Informasi Ukuran</p>
                            <p className="desc">Lihat detail ukuran</p>
                        </div>
                        <div>
                            <Icon icon="chevron-right" />
                        </div>
                    </SectionWrapper>
                    {/* <SectionWrapper onClick={() => setCheckCostDialog(true)}>
                        <div>
                            <Icon icon="truck" />
                        </div>
                        <div>
                            <p>Informasi Ongkos Kirim</p>
                            <p className="desc">Cek ongkos kirim ke kotamu</p>
                            {costData.map((i: any, idx: any) => (
                                // eslint-disable-next-line react/no-array-index-key
                                <React.Fragment key={idx}>
                                    <p>{i.code}</p>
                                    {i.costs.map((i2: any, idx2: any) => (
                                        // eslint-disable-next-line react/no-array-index-key
                                        <span key={idx2}>{i2.cost[0].value}</span>
                                    ))}
                                </React.Fragment>
                            ))}
                        </div>
                        <div>
                            <Icon icon="chevron-right" />
                        </div>
                    </SectionWrapper> */}
                    <DetailWrapper>
                        <p className="title">Deskripsi</p>
                        {detailData.detail && (
                            // eslint-disable-next-line react/no-danger
                            <div className="detail" dangerouslySetInnerHTML={{ __html: detailData.detail }} />
                        )}
                        <div role="button" className="show-more" onClick={() => setDescriptionDialog(true)}>
                            Selengkapnya
                        </div>
                    </DetailWrapper>
                    <FloatingWrapper>
                        <ChatBtn onClick={() => { window.location.href = `https://api.whatsapp.com/send?phone=628118085127&text=Hay, minka. Mau tanya produk ${detailData.name} dong.`; }}>
                            <Icon icon="message-circle" />
                        </ChatBtn>
                        <CartBtn onClick={() => actionHandler(true, false)}>
                            <Icon icon="plus" />
                            <span>Keranjang</span>
                        </CartBtn>
                    </FloatingWrapper>
                    {/* <FloatingCart /> */}
                    {sizeReady && actionVisible && (
                        <ActionDialog thumb={imageData[0]} product={detailData} sizes={sizeData} handler={(visibility: any, alert: any) => actionHandler(visibility, alert)} />
                    )}
                    {descriptionDialog && (
                        <DescriptionSheet handler={(visibility: boolean) => setDescriptionDialog(visibility)} content={detailData.detail} />
                    )}
                    {cartDialogVisible && (
                        <AddToCartDialog />
                    )}
                    {shareDialog && (
                        <ShareLinkSheet handler={(visibility: boolean) => setShareDialog(visibility)} />
                    )}
                    {/* {checkCostDialog && (
                        <CheckCostDialog handler={(visibility: boolean) => setCheckCostDialog(visibility)} onSubmit={(data: any) => onCheckCost(data)} />
                    )} */}
                </ProductWrapper>
            </Main>
        </>
    );
};

const mapStateToProps = (state: any) => {
    return {
        loggedIn: state.authReducer.loggedIn,
        role: state.accountReducer.role,
        addons: state.accountReducer.addons
    };
};

export default connect(mapStateToProps)(ProductDetail);
