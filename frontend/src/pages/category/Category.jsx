import './category.css';
import { useParams, Link } from "react-router-dom";
import PostList from "../../components/posts/PostList";
import { useEffect, useState  } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsBasedOnCategory } from '../../redux/apiCalls/postApiCall';


const Category = () => {

    const { category } = useParams();
    const dispatch = useDispatch();

    const { postsCate } = useSelector(state => state.post);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(fetchPostsBasedOnCategory(category))
        window.scrollTo(0, 0)

        const delay = 3000;
        const timer = setTimeout(() => {
            setLoading(false);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [category]);

    return (
        <section className="category">
            {loading ? 
                (
                    <div className="loading">Loading...</div>
                )
                : 
                postsCate.length === 0 ? 
                    (
                        <>
                            <h1 className="category-not-found">
                                Posts with <span>{category}</span> category not found
                            </h1>
                            <Link to='/posts' className='category-not-found-link'>
                                Go to posts page
                            </Link>
                        </>
                    ) 
                    : 
                    (
                        <>
                            <h1 className="category-title">Posts based on {category}</h1>
                            <PostList posts={postsCate} />
                        </>
                    )}
        </section>
    );
}

export default Category;