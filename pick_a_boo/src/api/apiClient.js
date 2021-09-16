import {create} from 'apisauce'
import { Base64 } from 'js-base64'

const apiClient = (email, password) => create(
    {
        baseURL: "http://127.0.0.1:5000",
        headers:{ Authorization: "Basic " + Base64.encode(email+':'+password)}
    }
);

//for login
const endpoint = "/api/token";
export const getToken = async(email, password) => {
    let response = await apiClient(email, password).get(endpoint);
    if (response.status === 401){return 401}
    if (!response.ok){return 500}
    if (response.ok){return response.data}
    return
}