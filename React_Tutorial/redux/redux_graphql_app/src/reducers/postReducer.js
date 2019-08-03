import { FETCH_POSTS,NEW_POST } from "../actions/types";
import { stat } from "fs";

const initialState = {
    items:[],
    item:{}
}

export default function(state=initialState,action){
    switch(action.type){
        case FETCH_POSTS:
            console.log("Switch",action.payload)
            return {
                ...state,
                items:action.payload
            }
        case NEW_POST:
            return {
                ...state,
                item:action.payload
            }
        default:
            return state
    }
}