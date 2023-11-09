import { postActions } from "../slices/PostSlice";
import request from "../../utils/request";
import { toast } from "react-toastify"

// Fetch Posts Based on Page Number
export function fetchPosts(pageNumber) {
    return async (dispatch) => {
        try {

            const {data} = await request.get(`/api/posts?pageNumber=${pageNumber}`);
            dispatch(postActions.setPosts(data));

        } catch (error) {
            toast.error(error.response.data.message);
        }

    }
}

// Get Posts Count
export function getPostsCount() {
    return async (dispatch) => {
        try {

            const {data} = await request.get(`/api/posts/count`);
            dispatch(postActions.setPostsCount(data));

        } catch (error) {
            toast.error(error.response.data.message);
        }

    }
}

// Fetch Posts Based on Category
export function fetchPostsBasedOnCategory(category) {
    return async (dispatch) => {
        try {

            const {data} = await request.get(`/api/posts?category=${category}`);
            dispatch(postActions.setPostsCate(data));

        } catch (error) {
            toast.error(error.response.data.message);
        }

    }
}

// Create Post
export function createPost(newPost) {
    return async (dispatch, getState) => {
        try {
            //Make Loading True
            dispatch(postActions.setLoading());

            // no const data ?? ==> we don't need to accept data from server cause will go directly to home page and find post there
            //below is CallBack Function !!!
            await request.post(`/api/posts`, newPost, {
                // to ADD post you need to have a Token // get it from headers
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                    "Content-Type":"multipart/from-data"
                }
            } );

            // Will make IsPostCreated TRUE !!
            dispatch(postActions.setIsPostCreated());
            // if isPostCreated will take you to home page, so need setTimeout to clear it again !!
            setTimeout(() => dispatch(postActions.clearIsPostCreated()), 2000);

        } catch (error) {
            toast.error(error.response);
            dispatch(postActions.clearLoading());
        }

    }
}

// Fetch Single Post
export function fetchSinglePost(postId) {
    return async (dispatch) => {
        try {

            const {data} = await request.get(`/api/posts/${postId}`);
            dispatch(postActions.setPost(data));

        } catch (error) {
            toast.error(error.response.data.message);
        }

    }
}

// Toggle Like Post
export function toggleLikePost(postId) {
    return async (dispatch, getState) => {
        try {

            //AXIOS : First param take URL // second one take data to send ( empty for likes , no data to send ) // third will take headers
            const {data} = await request.put(`/api/posts/like/${postId}`, {}, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token, 
                }
            });
            dispatch(postActions.setLike(data));

        } catch (error) {
            toast.error(error.response.data.message);
        }

    }
}

// Update Post Image
export function updatePostImage(newImage,postId) {
    return async (dispatch, getState) => {
        try {
            
            await request.put(`/api/posts/update-image/${postId}`, newImage, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token, 
                    "Content-Type": "multipart/form-data",
                }
            });
            toast.success("Nrw post image uploaded successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }

    }
}

// Update Post
export function updatePost(newPost,postId) {
    return async (dispatch, getState) => {
        try {
            
            const { data } = await request.put(`/api/posts/${postId}`, newPost, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token, 
                }
            });
            dispatch(postActions.setPost(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }

    }
}

// Delete Post
export function deletePost(postId) {
    return async (dispatch, getState) => {
        try {
            
            const { data } = await request.delete(`/api/posts/${postId}`,{
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token, 
                }
            });
            // deletePostCtrl give postId and message !! return them here
            dispatch(postActions.deletePost(data.postId));
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }

    }
}

// Get All Posts
export function getAllPosts() {
    return async (dispatch) => {
        try {

            const {data} = await request.get(`/api/posts`);
            dispatch(postActions.setPosts(data));

        } catch (error) {
            toast.error(error.response.data.message);
        }

    }
}