import React, { Component } from 'react'
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {createPosts} from '../actions/postsAction';

class PostForm extends Component {
    constructor(){
        super();
        this.state = {
            title:""
        }
        this.onchange = this.onchange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onchange(value){
        this.setState({
            title:value
        },()=>{
            console.log("this.state",this.state);
        })
    }
    onSubmit(e){
        e.preventDefault();
        const post = {
            title:this.state.title
        }
        this.props.createPosts(post)
       
    }
    render() {
        return (
            <div>
                <h1>Add posts</h1>
                <form onSubmit = {this.onSubmit}>
                    <label>Title</label>
                    <input type="text" name="title" value={this.state.title} onChange={(event)=>this.onchange(event.target.value)}/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}
PostForm.propTypes = {
    // fetchPosts:PropTypes.func.isRequired,
    // posts:PropTypes.array.isRequired
    createPosts:PropTypes.func.isRequired,
}


export default connect(null,{createPosts})(PostForm);