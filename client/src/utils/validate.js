const valideEmail = (value) => {
    value = value.trim();
    const emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (value !== '') {
        if ( emailRe.test(value) ) {
            return { valid: true, error: '' };
        } else {
            return { valid: false, error: 'wrong email' };
        }
    } else {
        return { valid: false, error: 'enter email' };
    }
}

const validePassword = (value) => {
    const passwordRe = /^(.{8,})$/ ;

    return passwordRe.test(value) ? { valid: true, error: '' } : { valid: false, error: 'password must be at least 8 characters long' };
};

const valideName = (value) => {
    const nameRe = /^((\w|[а-яА-Я]){2,})$/ ;

    return nameRe.test(value) ? { valid: true, error: '' } : { valid: false, error: 'name must be at least 2 characters long' };
};

const valideConfirmationPassword = (value) => {
    const { confirmationPassword, password } = value;
    return confirmationPassword === password ? { valid: true, error: '' } : { valid: false, error: 'passwords do not match' }
}

export const validate = (value, type) => {
    switch (type) {
        case 'email': return valideEmail(value);
        case 'password': return validePassword(value);
        case 'name': return valideName(value);
        case 'confirmationPassword': return valideConfirmationPassword(value);
        default: return { valid: false, error: '' }
    }
}