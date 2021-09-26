import Cookies from 'js-cookie';
import React from 'react';
import { Redirect, Route } from 'react-router';

interface Props {
    secure?: boolean,
    path: string,
    component: any,
    exact?: boolean
}

const PageRoute = (props: Props) => {
    const session = Cookies.get('kis-session') || undefined;
    const { secure, path, component, exact } = props;

    if (secure && !session) {
        return <Redirect to={`/login?redirect=${path.replace('/', '')}`} />;
    }
    return <Route path={path} component={component} exact={exact} />;
};

PageRoute.defaultProps = {
    secure: false,
    exact: false
};

export default PageRoute;
