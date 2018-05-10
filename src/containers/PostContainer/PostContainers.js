import React, {Component} from 'react';
import { PostWrapper, Navigate, Post } from '../../components';

class PostContainers extends Component {
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