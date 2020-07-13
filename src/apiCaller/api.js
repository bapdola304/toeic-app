import { urlApi } from './config';

export async function apiCommon(url, method) {
    console.log('url', `${urlApi}/${url}`);
    let data = await fetch(`${urlApi}/${url}`);
    return data.json();
}