/**
 * path {string} path route of pages
 */

const goBack = () => {
    window.history.back();
};

const path = (url: string) => {
    window.location.href = url;
};

const pushLocation = {
    goBack,
    path
};

export default pushLocation;
