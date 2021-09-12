
const queryString = require('query-string');

export function queryStringify(obj) {
    return queryString.stringify(obj, { arrayFormat: 'comma' });
}