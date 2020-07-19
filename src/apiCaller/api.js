import { urlApi, translateUrlApi } from './config';

export async function apiCommon(url, method) {
    let data = await fetch(`${urlApi}/${url}`);
    return data.json();
}

export async function translateApi(url, method) {
    let data = await fetch(`${translateUrlApi}/${url}`);
    return data.json();
}