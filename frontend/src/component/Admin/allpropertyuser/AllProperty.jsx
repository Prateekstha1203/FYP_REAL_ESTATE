import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./AllProperty.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  deleteProperty,
  getAdminProperty,
} from "../../../actions/PropertyActions";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import MetaData from "../../../more/Metadata";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "../SideBarAdmin/Sidebar";
import { ListGroup } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { DELETE_PROPERTY_RESET } from "../../../constans/PropertyConstans";
import { useState } from "react";
import ReactPaginate from "react-paginate";

const AllProperties = ({ history }) => {
  const dispatch = useDispatch();

  const { error, properties } = useSelector((state) => state.properties);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteProperty
  );

  const deletePropertyHandler = (id) => {
    dispatch(deleteProperty(id));
  };

  const propertiesPerPage = 5;

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const filteredProperties = properties.filter(
    (listing) =>
      listing.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredProperties.length / propertiesPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Property Deleted Successfully");
      history.push("/dashboard");
      dispatch({ type: DELETE_PROPERTY_RESET });
    }
    dispatch(getAdminProperty());
  }, [dispatch, alert, error, history]);

  return (
    <Fragment>
      <div className="row">
        <div className="SlideBar col-2">
          <SideBar />
        </div>
        <div className="propertyContent col-9">
          <h1 className="title text-center py-5">ALL PROPERTY</h1>
          <input
            type="text"
            placeholder="Search by Category or Title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <table className="table table-striped table-bordered table-hover table-responsive">
            <thead>
              <tr>
                <th>Property ID</th>
                <th>Property Title</th>
                <th>Property Category</th>
                <th>Property Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProperties
                .slice(
                  currentPage * propertiesPerPage,
                  (currentPage + 1) * propertiesPerPage
                )
                .map((listing) => (
                  <tr key={listing._id}>
                    <td>{listing._id}</td>
                    <td>{listing.propertyTitle}</td>
                    <td>{listing.category}</td>
                    <td>{listing.propertyType}</td>
                    <td>
                      <Link to={`/edit/property/${listing._id}`}>
                        <EditIcon variant="primary">Edit</EditIcon>
                      </Link>
                      <Button
                        variant="danger"
                        onClick={() => deletePropertyHandler(listing._id)}
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
    </Fragment>
  );
};

export default AllProperties;

