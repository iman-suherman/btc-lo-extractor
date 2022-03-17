export const errorTransform = (datas) => {
    const resp = {};

    for (const data of datas) {
        const param = data['param'];
        const message = data['msg'];

        if (!resp[param]) {
            resp[param] = message;
        }
    }

    return resp;
};

/**
 * Convert Custom Message
 *
 * @param code
 */
export const trans = (code) => (val, meta) => {
    if (validateMessage[code]) {
        return validateMessage[code].replace(':attribute', meta.path);
    } else {
        return validateMessage['default'];
    }
};

/**
 * Validate Message Based on Laravel
 */
export const validateMessage = {
    default: 'Invalid Value',
    notEmpty: 'The :attribute field is required.',
    in: 'The selected :attribute is invalid.',
    int: 'The :attribute must be a number.',
    uuid: 'The :attribute must be a valid UUID.',
};
