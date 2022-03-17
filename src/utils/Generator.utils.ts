import { customAlphabet } from 'nanoid';

const ALPHABET = 'abcdefghkmnprstyz';
const ALPHABET_UPPERCASE = 'ABCDEFGHJKLMNPRSTYZ';
const NUMBER = '23456789';

export const randomGenerator = (length = 16) => {
    const generator = customAlphabet(`${ALPHABET}${ALPHABET_UPPERCASE}${NUMBER}`, length);
    return generator();
};

export const randomNumber = (length = 16) => {
    const generator = customAlphabet(NUMBER, length);
    return generator();
};

export const slugify = (text: string, replace = '-') => {
    return text
        .toString() // Cast to string
        .toLowerCase() // Convert the string to lowercase letters
        .normalize('NFD') // The normalize() method returns the Unicode Normalization Form of a given string.
        .trim() // Remove whitespace from both sides of a string
        .replace(/\s+/g, replace) // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, replace); // Replace multiple - with single -
};
