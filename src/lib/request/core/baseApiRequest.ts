import axios, { AxiosError } from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';

const baseApiReq = axios.create({
    baseURL: baseUrl
});

baseApiReq.interceptors.response.use(
    (response) => response,
    async (error: AxiosError | any) => {
        console.error(error?.response?.data?.Message || 'Ошибка на сервере');
        return Promise.reject(error);
    }
);

export { baseApiReq };
