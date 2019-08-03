import { FETCH_POSTS,NEW_POST } from "./types";
import { type } from "os";

export const  fetchPosts=()=>{
    console.log("Fetching")
    return function(dispatch){
        fetch("http://localhost:3100/posts")
        .then(res=>res.json())
        .then(data=>dispatch({
            type:FETCH_POSTS,
            payload:data
            }
        ))
    }
}

export const  createPosts=post_data=>dispatch=>{
    fetch("http://localhost:3100/posts",{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(post_data)
    }).then(response=>{
        return response.json()  
    }
    ).then(data=>{
        console.log("createPosts",data.body)
        return dispatch({
        type:NEW_POST,
        payload:data
        });
})
};