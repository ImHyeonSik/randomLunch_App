import {Linking} from 'react-native'
import {Dim} from './dimen'
import Img from '../img'
import Color from './color'
import {t} from './string'
import Style from './style'
import moment from "moment";

const Common = {
    callback: (callback = _ => false) => callback && {callback},
    checkObject: obj => {
        if (obj === null || obj === undefined)
            return {};
        else
            return obj;
    },
    concat: (item, list) => {
        Array.isArray(item) ? list = list.concat(item) : list.push(item);
        return list;
    },
    link: link => Linking.openURL(link).catch(err => console.log('url error', err)),
    isEmpty: (...params) => {
        let empty = params.length === 0;
        params.length > 0 && params.map(p => {
            if (p === null || p === undefined || p === '' || (typeof p == "object" && Object.keys(p).length === 0))
                empty = true
        });
        return empty
    },
    // baseData 를 기준으로 comparedData 와 비교하여 같은 데이터인지 체크
    isSame: (baseData = {}, comparedData = {}) => {
        const baseKeys = Object.keys(baseData);
        const comparedKeys = Object.keys(comparedData);

        if (baseKeys.length === 0)
            return true;
        else if (baseKeys.length !== 0 && comparedKeys.length === 0)
            return false;

        let same = true;
        baseKeys.forEach(key => {
            if (baseData[key] !== comparedData[key])
                same = false
        });
        return same;
    },
    range: (start, end) => Array.from({length: end + 1 - start}, (v, k) => k + start),
    split: (list, length) => {
        list = list.slice(0, list.length);
        const arr = [];
        while (list.length > 0) arr.push(list.splice(0, length));
        return arr
    },
    birth: date => `${moment(date).format("YYYY[.]MM[.]DD")}`,
    checkEmail: text => /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/.test(text),
    idCheck: text => /^[a-zA-Z0-9_\-\_\.\@\+]{6,40}$/.test(text),
    pwCheck: text => /^(?=.*[A-Za-z])(\S){6,}$/.test(text),
    onlyNumberCheck: text => /^[0-9]*$/.test(text),
};

export {Dim, Img, Color, Style, t}
export default Common;
