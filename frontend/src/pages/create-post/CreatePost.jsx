import { useState, useEffect } from "react";
import "./create-post.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from '../../redux/apiCalls/postApiCall';
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";

const CreatePost = () => {

    const dispatch = useDispatch();
    const { loading, isPostCreated } = useSelector(state => state.post);
    const { categories } = useSelector(state => state.category);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [file, setFile] = useState(null);

    //Form Submit Handler
    const formSubmitHandler = (e) => {
        e.preventDefault();
        if(title.trim() ==="") return toast.error("Post Title is required"); // when make return , the rest of code won't work !!!
        if(description.trim() ==="") return toast.error("Post Description is required");
        if(category.trim() ==="") return toast.error("Post Category is required");
        if(!file) return toast.error("Post Image is required");

        const formData = new FormData(); // class in JS to send inputs that contains image ( can't send it as JSON cause picture there !!)
        formData.append("image", file); // key , value , the key image !! cause named image in database , file will be sent to database to image 
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);

        dispatch(createPost(formData));
    };

    const navigate = useNavigate();
    useEffect(() => {
        if(isPostCreated) {
            navigate('/');
        }
    }, [isPostCreated, navigate])

    useEffect(() => {
        dispatch(fetchCategories());
    }, [])

    return ( 
        <section className="create-post" > 
            <h1 className="create-post-title">
                Create New Post
            </h1>
            <form onSubmit={formSubmitHandler} className="create-post-form">
                <input
                    type="text" 
                    placeholder="Post Title" 
                    className="create-post-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="create-post-input">
                    <option disabled value="">
                        Select A Category
                    </option>

                    {categories.map(category => 
                    <option key={category._id} value={category.title} > 
                        {category.title} 
                    </option>
                    )}

                </select>
                <textarea
                    className="create-post-textarea"
                    rows="5"
                    placeholder="Post Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                >
                </textarea>
                <input
                    type="file"
                    name="file" 
                    id="file" 
                    className="create-post-upload"
                    onChange={(e) => setFile(e.target.files[0])}  // files are array , i want one photo , one photo will be in array first index 0
                />
                <button type="submit" className="create-post-btn">
                    {
                        loading ? (
                            <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="40"
                                visible={true}
                            />
                            ) 
                            : 
                            "Create"
                    }
                </button>
            </form>
        </section>
     );
}
 
export default CreatePost;