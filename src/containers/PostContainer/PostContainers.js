import React, {Component} from 'react';
import { PostWrapper, Navigate, Post, Warning } from '../../components';
import * as service from '../../services/post';

class PostContainers extends Component {

    constructor(props) {
        super();
        // initailize component state
        this.state = {
            postId: 1,
            fetching: false, // tells whether the request is waiting for response or not
            post: {
                title: null,
                body: null
            },
            comments: [],
            warningVisibility: false
        };
    };

    componentDidMount() {
        this.fetchPostInfo(1);
    }
    
    fetchPostInfo = async(postId) => {

        this.setState({
            fetching: true  // requesting...
        })

        try {
            // 효율적인 비동기 요청
            const info = await Promise.all([
                service.getPost(postId),
                service.getComments(postId)
            ]);
            console.log(info);

            // Object destructuring Syntax,
            // takes out required values and create references to them
            const {title, body} = info[0].data;

            const comments = info[1].data;

            this.setState({
                postId,
                post: {
                    title,
                    body
                },
                comments,
                fetching: false // done!!
            });
        } catch (e) {
            // if err, stop at this point
            this.setState({
                fetching: false
            });
            this.showWarning();
            console.log('error occurred', e);
        }
    }

    handleNavigateClick = (type) => {
        const postId = this.state.postId;

        if (type === 'NEXT') {
            this.fetchPostInfo(postId+1);
        } else {
            this.fetchPostInfo(postId-1);
        }
    };

    showWarning = () => {
        this.setState({
            warningVisibility: true
        });

        // after 1.5sec

        setTimeout(
            () => {
                this.setState({
                    warningVisibility: false
                })
            }, 1500
        );
    };

    render() {
        const{postId, fetching, post, comments, warningVisibility} 
            = this.state;

        return (
            <PostWrapper>
                <Navigate
                    postId={postId}
                    disabled={fetching}
                    onClick={this.handleNavigateClick}
                />
                <Post
                    postId={postId}
                    title={post.title}
                    body={post.body}
                    comments={comments}
                />
                <Warning visible={warningVisibility} message="That post does not exist"/>
            </PostWrapper>
        );
    };
};

export default PostContainers;