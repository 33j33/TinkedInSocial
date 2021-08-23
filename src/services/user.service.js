import {BASE_URL} from "../common/constants/api.constants";
import axios from "axios";

export default class UserService {

    static getUser(payload){
        const {id} = payload;
        return axios.get(`${BASE_URL}/profile/fetch/${id}`)
    }

    static saveUser(payload) {
        const {body} = payload;
        return axios.post(`${BASE_URL}/profile/save`, body)
    }

    static getCommonData(){
        return axios.get(`${BASE_URL}/common/fetch`);
    }

    static updateInterests(payload){
        const {body} = payload;
        return axios.post(`${BASE_URL}/profile/tag/save`, body)
    }

    static getSuggestedUsers(payload){
        const {id} = payload
        return axios.get(`${BASE_URL}/recommend/fetch/${id}`)
    }
}