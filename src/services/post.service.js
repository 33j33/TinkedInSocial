import {BASE_URL} from "../common/constants/api.constants";
import axios from "axios";

export default class PostService {

    static fetchPosts(payload){
        // params - sortBy, empId, type, page
        const {params} = payload;
        return axios.get(`${BASE_URL}/post/fetch`, {params})
    }

    static addPost(payload){
        const {body} = payload;
        return axios.post(`${BASE_URL}/post/save`, body)
    }
}