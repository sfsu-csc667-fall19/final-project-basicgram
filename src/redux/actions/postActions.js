import axios from "axios";
import {
    GET_ERRORS,
    FETCH_POSTS_SUCCESS,
    FETCH_USER_POSTS_SUCCESS,
} from "./types";

export const fetchAllPosts = () => (dispatch) => {
    return axios
        .get('/basicgrams')
        .then(res => {
            console.log('successfully fetched posts', res.data);
            dispatch({
                type: FETCH_POSTS_SUCCESS,
                payload: res.data.basicgrams,
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
};

export const fetchPostsByUserId = (userId) => (dispatch) => {
    return axios
        .get(`/basicgrams/user/${userId}`)
        .then(res => {
            dispatch({
                type: FETCH_USER_POSTS_SUCCESS,
                payload: res.data.basicgrams,
                userId
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
}