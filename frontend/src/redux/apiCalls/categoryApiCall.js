import { categoryActions } from "../slices/categorySlice";
import request from "../../utils/request";
import { toast } from "react-toastify"

// Fetch All Categories
export function fetchCategories() {
    // Called : Anonymous Function
    return async (dispatch) => {
        try {
            // Used request which we created above to avoid typing all URL each time !!
            const {data} = await request.get("/api/categories/");
            // payload : data // 
            dispatch(categoryActions.setCategories(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }

    }
}

// Create Category
export function createCategory(newCategory) {
    // Called : Anonymous Function
    return async (dispatch, getState) => {
        try {
            // Used request which we created above to avoid typing all URL each time !!
            const {data} = await request.post("/api/categories/", newCategory, {
                headers: {
                    Authorization: "bearer " + getState().auth.user.token,
                }
            });
            // payload : data // 
            dispatch(categoryActions.addCategory(data));
            toast.success("category created successfully")
        } catch (error) {
            toast.error(error.response.data.message);
        }

    }
}

// Delete Category
export function deleteCategory(categoryId) {
    // Called : Anonymous Function
    return async (dispatch, getState) => {
        try {
            // Used request which we created above to avoid typing all URL each time !!
            const {data} = await request.delete(`/api/categories/${categoryId}`, {
                headers: {
                    Authorization: "bearer " + getState().auth.user.token,
                }
            });
            // payload : data // 
            dispatch(categoryActions.deleteCategory(data.categoryId));
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }

    }
}