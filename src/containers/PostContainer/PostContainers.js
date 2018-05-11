import React, {Component} from 'react';
import { PostWrapper, Navigate, Post } from '../../components';
import * as service from '../../services/post';

class PostContainers extends Component {

    componentDidMount() {
        this.fetchPostInfo(1);
    }
    
    fetchPostInfo = async(postId) => {
        // 효율적인 비동기 요청
        const info = await Promise.all([
            service.getPost(postId),
            service.getComments(postId)
        ]);
        // const post = await service.getPost(postId);
        // console.log(post);
        // const comments = await service.getComments(postId);
        // console.log(comments)
        console.log(info);
    }

    render() {
        return (
            <PostWrapper>
                <Navigate/>
                <Post/>
            </PostWrapper>
        );
    };
};

export default PostContainers;