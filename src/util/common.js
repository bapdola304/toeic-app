export const optionAnswer = ['A', 'B', 'C', 'D'];

export function filterDataExist(arrFilter, arr2) {
    const arr2Format = arr2.map(item => item.question_id);
    return arrFilter.filter(item => !arr2Format.includes(item.question_id));
}