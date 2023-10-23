import { APICore } from "./AxiosConfig";


const api = new APICore();

export function getRole(params) {
    const baseUrl = '/api/groups';
    
    if(params.limit !== null && params.page !== null){
        return api.get(`${baseUrl}`, params);
    }
    return api.get(`${baseUrl}`, {});
}

export function getUserRole() {
    const baseUrl = '/api/user_role';
    return api.get(`${baseUrl}`,{});
}