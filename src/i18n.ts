import { appendFileSync } from "fs";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: require("../public/locales/en/translation.json")
    }
}

const whitelist = [ 'en' ];

i18next
    .use(initReactI18next)
    .init({
        detection: {
            order: ['queryString', 'localStorage'],
            lookupQueryString: 'lng',
            lookupLocalStorage: 'i18next',
            caches: ['localStorage']
        },
        resources,
        lng: 'en',
        fallbackLng: whitelist,
        keySeparator: false,
        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: false
        }
    })

export default i18next;