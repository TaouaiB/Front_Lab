import { Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import "./admin-table.css"
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteProfile, getAllUsersProfile } from "../../redux/apiCalls/profileApiCall";
import { toggleUserBlock } from '../../redux/Redux-React/blockUserAction/blockUserAction';

const UsersTable = () => {
    
    const dispatch = useDispatch();
    const { profiles, isProfileDeleted } = useSelector(state => state.profile);
    const { isBlocked } = useSelector(state => state.blockUser);

    useEffect(() => {
        dispatch(getAllUsersProfile());
    }, [isProfileDeleted, isBlocked] );

    // Delete User Handler
    const deleteUserHandler = (userId) => {
        swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this User!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {  
          if (willDelete) {
            dispatch(deleteProfile(userId));
          }
        });
      };
      
    // Block User Handler
      const toggleBlockUserHandler = (userId) => {
        dispatch(toggleUserBlock(userId));
      };
      console.log(isBlocked)

    return ( 
        <section className="table-container">
            <AdminSidebar />
            <div className="table-wrapper">
                <h1 className="table title">Users</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Count</th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {profiles.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="table-image">
                                        <img 
                                            src={item?.profilePhoto?.url}
                                            alt="" 
                                            className="table-user-image"
                                        />
                                        <span className="table-username"> 
                                            {item?.username}
                                        </span>
                                    </div>
                                </td>
                                <td> {item?.email} </td>
                                <td>
                                    <div className="table-button-group">
                                        <button>
                                            <Link to={`/profile/${item._id}`}>
                                                View Profile
                                            </Link>
                                        </button>
                                        <button onClick={() => deleteUserHandler(item._id)}> Delete User </button>
                                        <button onClick={() => toggleBlockUserHandler(item._id)}>
                                            { item.isBlocked? `Unblock` : `Block` }
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
     );
}
 
export default UsersTable;