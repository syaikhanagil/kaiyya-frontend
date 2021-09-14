import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './pages/App';
import ScrollTop from './components/ScrollTop';
import store from './configs/redux/store';
import './configs/firebase';
// import './configs/analytics/config';
import reportWebVitals from './reportWebVitals';

// import style
import './assets/tailwind.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './assets/styles.scss';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
            <ScrollTop />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
