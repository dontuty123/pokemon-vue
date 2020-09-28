import React from 'react';
import './App.css';
import {useTranslation} from "react-i18next";


const HeaderComponent = () => {
    const [t, i18n] = useTranslation('common');
    return <div>
        <h1>{t('welcome.title', {framework: 'React'})}</h1>
        <button onClick={() => i18n.changeLanguage('vi')}>vi</button>
        <button onClick={() => i18n.changeLanguage('en')}>en</button>
    </div>
}

export default HeaderComponent;
