import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import loadable from '@loadable/component';
import Account from './Account';
import Address from './Address';
import CreateAddress from './Address/CreateAddress';
import EditAddress from './Address/EditAddress';

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
import Shipment from './Shipment';
import FeeEducation from './FeeEducation';
import Rules from './Others/Rules';
import Faq from './Others/Faq';
import Withdraw from './Withdraw';
import EducationProgram from './Others/EducationProgram';
import CatalogDetail from './CatalogDetail';
import CategoryDetail from './CategoryDetail';
import BankAccountForm from './BankAccountForm';
import PaymentSuccess from './PaymentSuccess';
import NewRelease from './NewRelease';
import CommingSoon from './CommingSoon';

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
            <PageRoute path="/verify" component={Auth} exact />
            <PageRoute path="/ref/:code" component={Auth} exact />
            <PageRoute path="/reset-password" component={Auth} exact />
            <PageRoute path="/reset-password/:token" component={Auth} exact />
            <PageRoute path="/create-password" component={Auth} exact />
            <PageRoute path="/join-mitra" component={JoinMitra} exact />

            <PageRoute secure path="/account" component={Account} exact />

            <PageRoute secure path="/account/address" component={Address} exact />
            <PageRoute secure path="/account/address/new" component={CreateAddress} exact />
            <PageRoute secure path="/account/address/edit/:addressId" component={EditAddress} exact />

            <PageRoute secure path="/settings/account" component={Settings} exact />
            <PageRoute secure path="/settings/password" component={Settings} exact />

            <PageRoute secure path="/bank-account/new" component={BankAccountForm} exact />

            <PageRoute secure path="/fee-education" component={Referral} exact />
            <PageRoute secure path="/income-history" component={FeeEducation} exact />

            <PageRoute path="/product" component={Product} exact />
            <PageRoute path="/product/:slug" component={ProductDetail} exact />
            <PageRoute path="/preorder" component={Preorder} exact />
            <PageRoute path="/new-release" component={NewRelease} exact />

            <PageRoute path="/catalog" component={Catalog} exact />
            <PageRoute path="/catalog/:slug" component={CatalogDetail} exact />

            <PageRoute path="/category/:slug" component={CategoryDetail} exact />

            <PageRoute path="/chat" component={Chat} exact />

            <PageRoute path="/cart" component={Cart} exact />

            <PageRoute secure path="/checkout" component={Checkout} exact />

            <PageRoute secure path="/orders" component={Order} exact />
            <PageRoute secure path="/orders/:orderId" component={OrderDetail} exact />

            <PageRoute secure path="/shipment/:code" component={Shipment} exact />

            <PageRoute secure path="/payment/:paymentId" component={Payment} exact />
            <PageRoute secure path="/payment-success/:paymentId" component={PaymentSuccess} exact />

            <PageRoute path="/others" component={Others} exact />
            <PageRoute path="/rules" component={Rules} exact />
            <PageRoute path="/faq" component={Faq} exact />
            <PageRoute path="/education-program" component={EducationProgram} exact />
            <PageRoute path="/withdraw" component={Withdraw} exact />

            <PageRoute path="/not-found" component={PageNotFound} exact />
            <PageRoute path="/comming-soon" component={CommingSoon} exact />
            <Redirect from="*" to="/not-found" />
        </Switch>
    );
};

export default App;
