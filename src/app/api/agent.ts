import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { PaginatedResult } from '../models/pagination';
import { Review, ReviewFormValues } from '../models/review';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(async response => {

    const pagination = response.headers['pagination'];
    if (pagination) {
        response.data = new PaginatedResult(response.data, JSON.parse(pagination));
        return response as AxiosResponse<PaginatedResult<any>>
    }
    return response;
}, (error: AxiosError) => {
    const { status } = error.response!;
    switch (status) {
        case 400:
        case 401:
        case 404:
        case 500:
            toast.error('Something goes wrong. Contact Administrator');
            break;
    }
    return Promise.reject(error);
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Reviews = {
    list: (params: URLSearchParams) => axios.get<PaginatedResult<Review[]>>('/reviews', { params })
        .then(responseBody),
    create: (review: ReviewFormValues) => {
        return requests.post<void>('/reviews', review);
    },
}

const agent = {
    Reviews,
}

export default agent;