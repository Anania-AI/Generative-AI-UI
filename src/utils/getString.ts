import data from './data.json';

export default function getString(key: string) {
    return data[key];
}