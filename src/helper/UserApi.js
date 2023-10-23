
// Assuming the TypeScript code is in a file named userApi.ts

// Import APICore from the compiled JavaScript file
// const { APICore } = require('./apiCore');

import { APICore } from "./AxiosConfig";


const api = new APICore();


export function getUser({params}) {
    const baseUrl = 'api/users/';
    return api.get(`${baseUrl}`, params);
}

export function getUserDetails(params) {
    const baseUrl = `/users/${params.payload}/`;
    return api.get(`${baseUrl}`, null);
}

export function addUser(params) {
    const baseUrl = '/users/';
    return api.create(`${baseUrl}`, params);
}
