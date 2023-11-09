import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: "post", 

    initialState: {
        // when fetch will be stored here , posts, their count and categories
        posts: [],
        postsCount: null,
        postsCate: [],
        loading: false,
        isPostCreated: false,
        post: null,
    },
    
    reducers: {
        setPosts(state, action) {
            state.posts = action.payload;
        },
        setPostsCount(state, action) {
            state.postsCount = action.payload;
        },
        setPostsCate(state, action) {
            state.postsCate = action.payload;
        },
        //Actions For Create New Post
        setLoading(state) {
            state.loading = true;
        },
        clearLoading(state) {
            state.loading = false;
        },
        setIsPostCreated(state) {
            state.isPostCreated = true;
            state.loading = false;
        },
        clearIsPostCreated(state) {
            state.isPostCreated = false;
        },
        setPost(state, action) {
            state.post = action.payload;
        },
        setLike(state, action) {
            state.post.likes = action.payload.likes;
        },
        deletePost(state, action) {
            state.posts = state.posts.filter(p => p._id !== action.payload);
        },
        addCommentToPost(state, action) {
            // add the new comment : included inside action.payload
            state.post.comments.push(action.payload);
        },
        updateCommentPost(state, action) {
            state.post.comments = state.post.comments.map(comment => 
                comment._id === action.payload._id ? action.payload : comment
            );
        },
        deleteCommentFromPost(state, action) {
            // comment will hold the id of deleted comment in front ( = action.payload )
            const comment = state.post.comments.find(c => c._id === action.payload )
            // search for index of the comment so we can delete  from DB 
            // indexOf function from JS : works on Arrays => give the index of comment from array comments 
            // then we delete the comment with index commentIndex
            const commentIndex = state.post.comments.indexOf(comment);

            // remove this comment with index // 1 will remove one comment // if 2 : will remove this comment and comment after it 
            state.post.comments.splice(commentIndex, 1);
        },
        
    }

});

const postReducer = postSlice.reducer; 
const postActions = postSlice.actions;

export {postReducer, postActions}