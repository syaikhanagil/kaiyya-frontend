import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import loadable from '@loadable/component';
import Account from './Account';
import Address from './Address';
import CreateAddress from './Address/CreateAddress';
import Auth from './Auth';
// import Cart from './Cart';
import Catalog from './Catalog';
import Chat from './Chat';
import Checkout from './Checkout';
import PageNotFound from './Error/PageNotFound';
// import Home from './Home';
import Others from './Others';
import JoinMitra from './Others/JoinMitra';
import Payment from './Payment';
import Preorder from './Preorder';
import Product from './Product';
import ProductDetail from './ProductDetail';
import PageRoute from '../configs/routes/PageRoute';
import Referral from './Referral';
import Settings from './Settings';

const Home = loadable(() => import('./Home'));
const Cart = loadable(() => import('./Cart'));
const Order = loadable(() => import('./Order'));
const OrderDetail = loadable(() => import('./OrderDetail'));

const App = () => {
    return (
        <Switch>
            <PageRoute path="/" component={Home} exact />

            <PageRoute path="/login" component={Auth} exact />
            <PageRoute path="/register" component={Auth} exact />
            <PageRoute path="/ref/:code" component={Auth} exact />
            <PageRoute path="/reset-password" component={Auth} exact />
            <PageRoute path="/join-mitra" component={JoinMitra} exact />

            <PageRoute secure path="/account" component={Account} exact />
            <PageRoute secure path="/account/settings" component={Settings} exact />

            <PageRoute secure path="/account/address" component={Address} exact />
            <PageRoute secure path="/account/address/new" component={CreateAddress} exact />

            <PageRoute secure path="/referral" component={Referral} exact />

            <PageRoute path="/product" component={Product} exact />
            <PageRoute path="/product/:slug" component={ProductDetail} exact />
            <PageRoute path="/preorder" component={Preorder} exact />

            <PageRoute path="/catalog" component={Catalog} exact />
            <PageRoute path="/catalog/:slug" component={Catalog} exact />

            <PageRoute path="/category" component={Catalog} exact />
            <PageRoute path="/category/:slug" component={Catalog} exact />

            <PageRoute path="/chat" component={Chat} exact />

            <PageRoute path="/cart" component={Cart} exact />

            <PageRoute secure path="/checkout" component={Checkout} exact />

            <PageRoute secure path="/orders" component={Order} exact />
            <PageRoute secure path="/orders/:orderId" component={OrderDetail} exact />

            <PageRoute secure path="/payment/:paymentId" component={Payment} exact />

            <PageRoute path="/others" component={Others} exact />

            <PageRoute path="/not-found" component={PageNotFound} exact />
            <Redirect from="*" to="/not-found" />
        </Switch>
    );
};

export default App;
