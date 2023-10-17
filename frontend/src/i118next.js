import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from './locales/ru.js';

const i18nextInstance = i18next.createInstance();

i18nextInstance 
  .use(initReactI18next) // передаем экземпляр i18n в react-i18next, который сделает его доступным для всех компонентов через context API.
  .init({
    lng: 'ru',
    debug: true, //значение true, чтобы получить вывод в консоль браузера, когда в i18next происходят определенные события, такие как завершение инициализации или изменение языка.
    resources: {
      ru,
    }, // передаем переводы текстов интерфейса в формате JSON
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false, // экранирование уже есть в React, поэтому отключаем
    },
  });

export default i18next;