import React, { Component } from 'react'
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {fetchPosts} from '../actions/postsAction';
class Posts extends Component {

    constructor(){
        super();
        this.state = {
            posts:[]
        }
    }
    componentWillMount(){
        console.log('Posts')
        this.props.fetchPosts();
    }
    componentWillReceiveProps(nextProps){
        if(nextProps){
            this.props.posts.unshift(nextProps.newPost)
        }
        console.log("componentWillReceiveProps ",this.props.posts)
    }
    render() {
        console.log("this.props.posts",this.props.posts);
        const postItems = this.props.posts.map(post=>{
            return (<div>
                <h1>{post.title}</h1>
            </div>
        )
        })
        console.log("postItems",postItems);
        return (
            <div>
                POST
                {
                    postItems
                }
            </div>
        )
    }
}
Posts.propTypes = {
    fetchPosts:PropTypes.func.isRequired,
    posts:PropTypes.array.isRequired,
    newPost:PropTypes.object
}
const mapStateToProps = state=>{
    console.log(state);
    return {posts:state.posts.items,
    newPost:state.posts.item}
};
export default connect(mapStateToProps,{fetchPosts})(Posts);