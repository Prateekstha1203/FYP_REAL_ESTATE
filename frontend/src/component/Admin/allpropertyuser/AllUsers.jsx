import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";

import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import MetaData from "../../../more/Metadata";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "../SideBarAdmin/Sidebar";
import { getAllUsers, clearErrors, deleteUser } from "../../../actions/userAction";
import { DELETE_USER_RESET } from "../../../constans/userContans";
import { ToastContainer, toast } from 'react-toastify';
import ReactPaginate from "react-paginate";

const AllUsers = ({ history }) => {

  const dispatch = useDispatch();

  const { error, users } = useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  const userPerPage = 5;

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const filteredUser = users.filter(
    (user) =>
    user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredUser.length / userPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };







  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success(message);
      history.push("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, error, deleteError, history, isDeleted, message]);
  

  return (
    <Fragment>
      <MetaData title={`ALL USERS - Admin`} />
      <div className="row">
        <div className="SlideBar col-2">
          <SideBar />
        </div>
        <div className="propertyContent col-9">
          <div className="allProperty fs-1 text-center py-2">ALL USERS</div>
          <input
            type="text"
            placeholder="Search by user name "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <table className="table table-striped table-bordered table-hover table-responsive">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Email</th>
                <th>Name</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUser
                .slice(
                  currentPage * userPerPage,
                  (currentPage + 1) * userPerPage
                )
                .map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.email}</td>
                    <td>{user.name}</td>
                    <td>{user.role}</td>
                    <td>
                      <Link to={`/admin/user/${user._id}`}>
                        <EditIcon variant="primary">Edit</EditIcon>
                      </Link>
                      <Button
                        variant="danger"
                        onClick={() => deleteUserHandler(user._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"pagination__link--active"}
          />
        </div>
      </div>
     
      <ToastContainer 
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
    </Fragment>
  );
};

export default AllUsers;