import { APICore } from './AxiosConfig';

const api = new APICore();


function getRole({limit, page}) {

    const baseUrl = 'api/groups';
    if (limit !== null && page !== null) {
        return api.get(`${baseUrl}`, { limit, page });
    }
    return api.get(`${baseUrl}`, {});
}

function getUserRole() {
    const baseUrl = '/api/user_role';
    return api.get(`${baseUrl}`, {});
}



export { getRole, getUserRole };
