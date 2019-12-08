import axios from 'axios';
import {
    FETCH_COMMENTS_SUCCESS,
    ADD_COMMENT,
    GET_ERRORS
} from './types';

export const fetchCommentsByPost = (postId) => (dispatch) => {
    return axios
        .get(`/basicgrams/comment/post/${postId}`)
        .then(res => {
            dispatch({
                type: FETCH_COMMENTS_SUCCESS,
                payload: res.data.comments,
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
}

export const addComment = (postId, text) => (dispatch) => {
    const body = {
        text,
        postId
    }
    return axios
        .post(`/basicgrams/comment/new`, body)
        .then(res => {
            dispatch({
                type: ADD_COMMENT,
                payload: res.data.comment,
                postId,
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
}