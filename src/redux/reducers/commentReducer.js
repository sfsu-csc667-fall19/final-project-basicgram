import {
    FETCH_COMMENTS_SUCCESS,
    ADD_COMMENT
} from "../actions/types";

const initialState = {
    comment: '',
    comments: [],
};

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_COMMENTS_SUCCESS:
            return {
                ...state,
                comments: action.payload
            };
        case ADD_COMMENT:
            return {
                ...state,
                comment: action.payload
            };
        default:
            return state;
    }
}