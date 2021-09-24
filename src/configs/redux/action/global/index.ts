import CONSTANT from '../../../../constant';

export const showToast = (message: string) => {
    return (dispatch: any) => {
        dispatch({ type: CONSTANT.SET_TOAST_MESSAGE, visible: true, message });
        setTimeout(() => {
            dispatch({ type: CONSTANT.SET_TOAST_MESSAGE, visible: false, message: '' });
        }, 2000);
    };
};

export const showFullscreenLoader = () => {
    return (dispatch: any) => {
        dispatch({ type: CONSTANT.SET_FULLSCREEN_LOADER, visible: true });
    };
};

export const hideFullscreenLoader = () => {
    return (dispatch: any) => {
        dispatch({ type: CONSTANT.SET_FULLSCREEN_LOADER, visible: false });
    };
};
