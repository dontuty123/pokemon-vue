import React from 'react';
import ReactDOM from 'react-dom';
import './assets/style/index.css';
import * as serviceWorker from './serviceWorker';


import {I18nextProvider} from "react-i18next";
import i18next from "i18next";

import common_vi from "./translations/vi/common.json";
import common_en from "./translations/en/common.json";
import HeaderComponent from "./App";
import Store from "./core/store";

i18next.init({
    interpolation: {escapeValue: false},
    lng: 'en',
    resources: {
        en: {
            common: common_en
        },
        vi: {
            common: common_vi
        },
    },
});

ReactDOM.render(
    <React.StrictMode>
        <I18nextProvider i18n={i18next}>
            <HeaderComponent/>
            <Store />
        </I18nextProvider>

    </React.StrictMode>,
    document.getElementById('root')
);
serviceWorker.unregister();
