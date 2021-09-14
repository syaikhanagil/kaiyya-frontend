import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import LoadingOverlay from '../components/LoadingOverlay';
import Navigation from '../components/Navigation';

interface Props {
    children: any,
    useHeader?: boolean,
    backTo?: string,
    backBtn?: boolean,
    title?: string,
    cartBtn?: boolean,
    searchBtn?: boolean,
    moreBtn?: boolean,
    moreIcon?: string,
    onMoreClick?: () => void,
    paddingTop?: boolean,
    useNavigation?: boolean,
    paddingBottom?: boolean,
    activeMenu?: string,
    transparentHeader?: boolean
    dispatch: any,
    fullScreenLoader: boolean
}

class Main extends React.Component<Props, any> {
    // public static defaultProps = {
    //     useHeader: true,
    //     backTo: '',
    //     backBtn: '',
    //     title: '',
    //     cartBtn: false,
    //     searchBtn: false,
    //     moreBtn: false,
    //     moreIcon: '',
    //     onMoreClick: () => { },
    //     paddingTop: true,
    //     useNavigation: false,
    //     paddingBottom: true,
    //     activeMenu: 'home',
    //     transparentHeader: false
    // };

    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 1500);
        }
    }

    render() {
        const { children, useHeader, backTo, backBtn, title, cartBtn, searchBtn, moreBtn, moreIcon, onMoreClick, paddingTop, useNavigation, paddingBottom, activeMenu, transparentHeader, fullScreenLoader } = this.props;
        return (
            <>
                <main className={`main-content${!paddingTop ? ' no-padding-top' : ''}${!paddingBottom ? ' no-padding-bottom' : ''}`}>
                    {useHeader && (<Header backBtn={backTo !== '' || backBtn} backTo={!backTo ? '' : backTo} pageTitle={title} transparent={transparentHeader} cartBtn={cartBtn} searchBtn={searchBtn} moreBtn={moreBtn} moreIcon={moreIcon} onMoreClick={onMoreClick} />)}
                    {children}
                    {useNavigation && (<Navigation activeMenu={activeMenu} />)}
                </main>
                {fullScreenLoader && (
                    <LoadingOverlay />
                )}
            </>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        fullScreenLoader: state.globalReducer.fullScreenLoader
    };
};

export default connect(mapStateToProps)(Main);
