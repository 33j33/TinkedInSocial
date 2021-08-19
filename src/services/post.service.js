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

    static likePost(payload){
        const {body} = payload;
        console.log(body)
        return axios.post(`${BASE_URL}/like/save`, body)
    }

    static getComments(payload){
        const {postId} = payload;
        return axios.get(`${BASE_URL}/comment/fetch/${postId}`)
    }

    static addComment(payload) {
        const {body} = payload;
        return axios.post(`${BASE_URL}/comment/save`, body);
    }

}