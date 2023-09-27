import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import resources from './resources';

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
  detection: {
    order: ['react-native', 'navigator'],
  },
});

export default i18n;
