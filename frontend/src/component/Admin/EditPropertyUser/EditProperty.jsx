import React, { Fragment, useEffect, useState } from "react";
import "./newProperty.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateProperty,
  getPropertyDetails,
} from "../../../actions/PropertyActions";
import { Button } from "@material-ui/core";
import MetaData from "../../../more/Metadata";
import SideBar from "../SideBarAdmin/Sidebar";
import { UPDATE_PROPERTY_RESET } from "../../../constans/PropertyConstans";
import { ToastContainer, toast } from "react-toastify";

const UpdateProperty = ({ history, match }) => {
  const dispatch = useDispatch();

  const { error, property } = useSelector((state) => state.propertyDetails);

  const { loading, error: updateError, isUpdated } = useSelector(
    (state) => state.deleteProperty
  );

  const [propertyTitle, setPropertyTitle] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [price, setPrice] = useState("");
  const [areaSqFt, setAreaSqFt] = useState("");
  const [parking, setParking] = useState("");
  const [isFurnished, setIsFurnished] = useState("");
  const [propertyFace, setPropertyFace] = useState("");
  const [buildYear, setBuildYear] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [oldImages, setOldImages] = useState([]);

  const propertyId = match.params.id;
  const propertyCategories = ["Bungalow", "Apartment", "Villa"];
  const propertyTypeList = ["Rent", "Sale"];
  
  useEffect(() => {
    if (property && property._id !== propertyId) {
      dispatch(getPropertyDetails(propertyId));
    } else {
      setPropertyTitle(property.propertyTitle);
      setPropertyType(property.propertyType);
      setPrice(property.price);
      setCategory(property.category);
      setAddress(property.address);
      setAreaSqFt(property.areaSqFt);
      setBathrooms(property.bathrooms);
      setBedrooms(property.bedrooms);
      setBuildYear(property.buildYear);
      setIsFurnished(property.isFurnished);
      setParking(property.parking);
      setPropertyFace(property.propertyFace);
      setDescription(property.description);
      setOldImages(property.images);
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  
    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }
  
    if (isUpdated) {
      toast.success("Property Updated Successfully");
      history.push("/agent/property");
      dispatch({ type: UPDATE_PROPERTY_RESET });
    }
  }, [  dispatch,  error,  isUpdated,  property,  propertyId,  updateError,  history,]);
  
  const updatePropertySubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("propertyTitle", propertyTitle);
    myForm.set("category", category);
    myForm.set("description", description);
    myForm.set("address", address);
    myForm.set("bedrooms", bedrooms);
    myForm.set("bathrooms", bathrooms);
    myForm.set("price", price);
    myForm.set("areaSqFt", areaSqFt);
    myForm.set("propertyType", propertyType);
    myForm.set("parking", parking);
    myForm.set("isFurnished", isFurnished);
    myForm.set("buildYear", buildYear);
    myForm.set("propertyFace", propertyFace);
    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateProperty(propertyId, myForm));
  };

  const updatePropertyImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Edit Property" />
      <div className="dashboard">
        <SideBar />
        <div className="newProduct">
          <form
            className="border p-5"
            encType="multipart/form-data"
            onSubmit={updatePropertySubmitHandler}
          >
            <div class="row mt-3">
              <div class="form-group col-md-6">
                <label for="inputPassword4">Property Title</label>
                <input
                  type="string"
                  placeholder="Property Title"
                  class="form-control"
                  required
                  value={propertyTitle}
                  onChange={(e) => setPropertyTitle(e.target.value)}
                />
              </div>
              <div class="form-group col-md-6">
                <label for="inputPassword4">Address</label>
                <input
                  placeholder="Property Address"
                  type="string"
                  class="form-control"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></input>
              </div>
              <div class="form-group col-md-6 mt-4">
                <label for="inputAddress">Property Type</label>
                <select
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="ms-3"
                  value={propertyType}
                >
                  <option value="">Choose Property Type</option>
                  {propertyTypeList.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div class="form-group col-md-6 mt-4">
                <label for="inputAddress">Property Category</label>
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  className="ms-3" value={category}
                >
                  <option value="">Choose Property Ctegory</option>
                  {propertyCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div class="row mt-4">
              <div class="form-group col-md-4">
                <label for="inputCity">Bathrooms</label>
                <input
                  type="number"
                  placeholder="bathroom"
                  required
                  class="form-control"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                />
              </div>
              <div class="form-group col-md-4">
                <label for="inputState">Bedrooms</label>
                <input
                  type="number"
                  placeholder="bedroom"
                  class="form-control"
                  required
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                />
              </div>
              <div class="form-group col-md-4 ">
                <label for="inputZip">Price</label>
                <input
                  type="number"
                  placeholder="Property Price"
                  class="form-control"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div class="row mt-4">
              <div class="form-group col-md-3">
                <label for="inputCity">Area </label>
                <input
                  type="number"
                  placeholder="AreaSqFt"
                  class="form-control"
                  required
                  value={areaSqFt}
                  onChange={(e) => setAreaSqFt(e.target.value)}
                />
              </div>
              <div class="form-group col-md-3">
                <label for="inputState">Parking</label>
                <input
                  type="string"
                  placeholder="parking"
                  class="form-control"
                  required
                  value={parking}
                  onChange={(e) => setParking(e.target.value)}
                />
              </div>
              <div class="form-group col-md-3 ">
                <label for="inputZip">Furnished</label>
                <input
                  type="string"
                  placeholder="Furnished"
                  class="form-control"
                  required
                  value={isFurnished}
                  onChange={(e) => setIsFurnished(e.target.value)}
                />
              </div>
              <div class="form-group col-md-3 ">
                <label for="inputZip">Build Year</label>
                <input
                  type="string"
                  placeholder="Build Year"
                  class="form-control"
                  required
                  value={buildYear}
                  onChange={(e) => setBuildYear(e.target.value)}
                />
              </div>
            </div>
            <div class="row mt-3">
              <div class="form-group col-md-6">
                <label for="inputPassword4">Property Description</label>
                <textarea
                  placeholder="Property Description"
                  value={description}
                  class="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                  cols="30"
                  rows="1"
                ></textarea>
              </div>
              <div class="form-group col-md-3">
                <label for="inputPassword4">Property Face</label>
                <input
                  type="string"
                  placeholder="Property Face"
                  class="form-control"
                  required
                  value={propertyFace}
              onChange={(e) => setPropertyFace(e.target.value)}
                />
              </div>
              <div class="form-group col-md-3  mt-4 fw-bold display-1">
                <div id="createProductFormFile">
                  <input
                    type="file"
                    name="avatar"
                    class="form-control"
                    accept="image/*"
                    onChange={updatePropertyImagesChange}
                    multiple
                    value={images}
                  />
                </div>

                <div id="createProductFormImage">
                  {imagesPreview.map((image, index) => (
                    <img key={index} src={image} alt="Property Preview" />
                  ))}
                </div>
              </div>
            </div>
            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
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

export default UpdateProperty;
