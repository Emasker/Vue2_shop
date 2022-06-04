import {
    v4 as uuidv4
} from 'uuid';
export const getUUID = () => {
    //先查询本地是否有uuid
    let uuid_token = localStorage.getItem('UUIDTOKEN');
    if (!uuid_token) {
        //生成临时游客
        uuid_token = uuidv4();
        //储存到本地
        localStorage.setItem('UUIDTOKEN', uuid_token);
    }
    return uuid_token;
}