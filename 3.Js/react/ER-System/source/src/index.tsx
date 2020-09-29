import React from 'react';
import ReactDOM from 'react-dom';
import './assets/style/index.css';
import * as serviceWorker from './serviceWorker';
import {I18nextProvider} from "react-i18next";
import HeaderComponent from "./App";
import Store from "./core/store";

import i18n from "./core/util/i18n";

ReactDOM.render(
    <React.StrictMode>
        <I18nextProvider i18n={i18n}>
            <HeaderComponent/>
            <Store />
        </I18nextProvider>

    </React.StrictMode>,
    document.getElementById('root')
);
serviceWorker.unregister();
