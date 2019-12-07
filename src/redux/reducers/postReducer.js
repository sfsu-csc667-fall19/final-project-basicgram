import {
    FETCH_POSTS_SUCCESS,
    FETCH_USER_POSTS_SUCCESS
} from "../actions/types";

const initialState = {
    posts: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.payload
            };
        case FETCH_USER_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.payload
            };
        default:
            return state;
    }
}