import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Header from "./components/header/header";
import Home from "./pages/home/Home";
import Login from "./pages/forms/Login";
import Register from "./pages/forms/Register";
import PostsPage from "./pages/posts-page/PostsPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreatePost from "./pages/create-post/CreatePost";
import Footer from "./components/footer/Footer";
import PostDetails from "./pages/post-details/PostDetails";
import { ToastContainer } from "react-toastify";
import Category from "./pages/category/Category";
import Profile from "./pages/profile/Profile";
import UsersTable from "./pages/admin/UsersTable";
import PostsTable from "./pages/admin/PostsTable";
import CategoriesTable from "./pages/admin/CategoriesTable";
import CommentsTable from "./pages/admin/CommentsTable";
import ForgotPassword from "./pages/forms/ForgotPassword";
import ResetPassword from "./pages/forms/ResetPassword";
import NotFound from "./pages/not-found/Not-Found";
import { useSelector } from "react-redux";
import VerifyEmail from "./pages/verify-email/VerifyEmail";

function App() {
    
  const {user} = useSelector(state => state.auth);

  return (
    <BrowserRouter >
    <ToastContainer theme="colored" position="top-center" />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to='/' />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to='/' />} />

        {/* Verify Email */}
        <Route path="/users/:userId/verify/:token" element={!user ? <VerifyEmail /> : <Navigate to='/' />} />
        
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:userId/:token" element={<ResetPassword />} />
        <Route path="/profile/:id" element={<Profile />} />

        <Route path="posts">  {/*  react router dom add slashes automatically , will be in backend like /posts/ */}
          <Route index element={<PostsPage />} /> {/*  // index : take the main path */}
          <Route path="create-post" element={user ? <CreatePost /> : <Navigate to='/' />} /> {/*  // no need for slash / */}
          <Route path="details/:id" element={<PostDetails />} />
          <Route path="categories/:category" element={<Category />} />
        </Route>

        <Route path="admin-dashboard">
          <Route index element={user?.isAdmin ? <AdminDashboard /> : <Navigate to='/' />} />
          <Route path="users-table" element={user?.isAdmin ? <UsersTable /> : <Navigate to='/' />} />
          <Route path="posts-table" element={user?.isAdmin ? <PostsTable /> : <Navigate to='/' />} />
          <Route path="categories-table" element={user?.isAdmin ? <CategoriesTable /> : <Navigate to='/' />} />
          <Route path="comments-table" element={user?.isAdmin ? <CommentsTable /> : <Navigate to='/' />} />
        </Route>

        <Route path="*" element={<NotFound />} />    {/* Not Found always should be the latest and * : if not anyone of them will be this one */}

      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
