import {encoded, translations} from './data.js'

function decodeFields(encoded, translations) {
    return encoded.map(obj => {
        const decodedObj = {};
        for (const key in obj) {
            if (key.endsWith('Id') && !['groupId', 'service', 'formatSize', 'ca'].includes(key)) {
                const translationKey = obj[key];
                const translatedValue = translations[translationKey] || ''; 
                decodedObj[key.slice(0, -2)] = translatedValue; 
            } else {
                decodedObj[key] = obj[key];
            }
        }

        return decodedObj;
    });
}

const decoded = decodeFields(encoded, translations)

console.log("Расшифрованные данные:")
console.log(decoded)
