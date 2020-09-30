import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
// ref: https://react.i18next.com/legacy-v9/step-by-step-guide
import common_vi from "../../translations/vi.json";
import common_en from "../../translations/en.json";
// import common_en from "./translations/en/common.json";
i18n
    // lazy loading for translations using xhr -> see /public/locales
    // learn more: https://github.com/i18next/i18next-xhr-backend
    // .use(XHR)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        fallbackLng: "ja", // use en if detected lng is not available
        debug: false,
        // lng: "ja",
        interpolation: {
            escapeValue: false, // react already safes from xss
            formatSeparator: ",",
        },
        resources: {
            en: common_en,
            vi: common_vi,
        },
        // backend: {
        //     loadPath: './assets/i18n/translations/en.json'
        // },
        // Loading multiple translation files
        ns: ["translations"],
        defaultNS: "translations",
        keySeparator: false,
        react: {
            useSuspense: false,
            wait: true,
        },
    });

export default i18n;
