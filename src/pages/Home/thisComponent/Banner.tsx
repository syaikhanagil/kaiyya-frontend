import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
// import { connect } from 'react-redux';
import styled from 'styled-components';
import Shimmer from '../../../components/Shimmer';
import API from '../../../configs/api';
import pushLocation from '../../../configs/routes/pushLocation';
// import CONSTANT from '../../../constant';

const BannerWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: auto;
    min-height: 230px;
    background: var(--color-white);

    @media only screen and (max-width: 375px) {
        min-height: 160px;
    }

    .slick-dots {
        position: relative;
        display: flex !important;
        bottom: 0;
        margin: 0 auto;
        padding: 5px 1rem;
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
                    width: 6px;
                    height: 6px;
                    background: #e7e7e7;
                    top: 50%;
                    left: 50%;
                    border-radius: 50px;
                    opacity: 1;
                    transform: translate(-50%, -50%);
                    transition: .3s ease;
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
                        width: 10px;
                        height: 6px;
                        background: var(--primary);
                        border-radius: 50px;
                    }
                }
            }
        }
    }

    .slick-slider {
        position: relative;
        height: 100%;
    }
`;

const BannerItem = styled.div`
    position: relative;
    display: block;
    width: 100%;
    outline: none;
    user-select: none;
    cursor: pointer;
`;

const Banner = () => {
    const [items, setItems] = useState([]);
    const [ready, setReady] = useState(false);

    const fetchData = async () => {
        setItems([]);
        setReady(false);
        await API.fetchBanner().then((res: any) => {
            setTimeout(() => {
                setItems(res.data);
                setReady(true);
            }, 1000);
        });
    };

    useEffect(() => {
        if (items.length < 1) {
            fetchData();
        }
    }, []);

    const sliderSettings = {
        dots: true,
        infinite: true,
        arrows: false,
        autoplay: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <>
            {!ready && (
                <Shimmer height="270px" />
            )}
            {ready && (
                <BannerWrapper>
                    <Slider {...sliderSettings}>
                        {items.map((i: any) => (
                            <BannerItem key={i.id} onClick={() => pushLocation.path(i.link)}>
                                <img src={i.src} alt={i.name} />
                            </BannerItem>
                        ))}
                    </Slider>
                </BannerWrapper>
            )}
        </>
    );
};

// const mapStateToProps = (state: any) => {
//     return {
//         items: state.bannerReducer.items,
//         isReady: state.bannerReducer.isReady,
//         isRequest: state.bannerReducer.isRequest,
//         isError: state.bannerReducer.isError
//     };
// };

export default Banner;
