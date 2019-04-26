import en from './en';
import ru from './ru';

function getMessages(language) {
    if (language === 'ru') {
        return ru;
    }

    if (language === 'en') {
        return en;
    }

    throw new Error('Unknown language');
}

export {
    en,
    ru,
    getMessages,
};
