import { urlApi } from './config';

export async function apiCommon(url, method) {
    let data = await fetch(`${urlApi}/${url}`);
    return data.json();
}