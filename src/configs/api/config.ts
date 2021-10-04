import axios from 'axios';
import Cookies from 'js-cookie';

// const baseURL = 'https://api.kaiyya.com';
const baseURL = 'http://127.0.0.1:1201';

const apiInstance = axios.create({
    baseURL,
    timeout: 10000
});

class ApiConfig {
    static GET(path: string, token = false) {
        return (payload?: any) => this.request('GET', path, payload, token);
    }

    static POST(path: string, token = false) {
        return (payload?: any) => this.request('POST', path, payload, token);
    }

    static PATCH(path: string, token = false) {
        return (payload?: any) => this.request('PATCH', path, payload, token);
    }

    static DELETE(path: string, token = false) {
        return (payload?: any) => this.request('DELETE', path, payload, token);
    }

    static request(method: any, path: string, payload: any = {}, token: boolean) {
        const baseHeader = {
            'Content-Type': payload.content === 'form-data' ? 'form-data' : 'application/json',
            Authorization: ''
        };
        if (token === true) {
            const session = Cookies.get('kis-session');
            if (token && !session) {
                window.location.href = '/';
            }
            baseHeader.Authorization = `Bearer ${session}`;
        }
        return new Promise((resolve, reject) => {
            apiInstance({
                method,
                url: payload.params ? path + payload.params : path,
                data: payload.body ? payload.body : {},
                headers: baseHeader
            }).then((response) => {
                // `response` is of type `AxiosResponse<ServerData>`
                const res = response.data;
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
}

export default ApiConfig;
