import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./AllProperty.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  deleteProperty,
  getAdminProperty,
} from "../../actions/PropertyActions";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import MetaData from "../../more/Metadata";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { ToastContainer, toast } from 'react-toastify';
import { DELETE_PROPERTY_RESET } from "../../constans/PropertyConstans";


const AllProperties = ({history}) => {

const dispatch = useDispatch();

const { error, properties } = useSelector((state) => state.properties);

const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteProperty
  );

  const deletePropertyHandler = (id) => {
    dispatch(deleteProperty(id));
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

const columns = [
    { field: "id", headerName: "Property ID", minWidth: 200, flex: 0.5 },

    {
      field: "propertyTitle",
      headerName: "property Title",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "category",
      headerName: "Property Category",
      type: "string",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "PropertyType",
      headerName: "Property Type",
      type: "string",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/edit/property/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
            onClick={() =>
                deletePropertyHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  properties &&
    properties.forEach((listing) => {
      rows.push({
        propertyTitle: listing.propertyTitle,
        category: listing.category,
        propertyType: listing.propertyType,
        id: listing._id,
      });
    });

    return (
       <Fragment>
      <MetaData title={`ALL PROPERTY - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PROPERTY</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
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
    )
}

export default AllProperties
