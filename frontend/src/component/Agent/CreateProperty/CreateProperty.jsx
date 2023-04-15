import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProperty } from "../../../actions/PropertyActions";
import { Button } from "@material-ui/core";
import MetaData from "../../../more/Metadata";
import { NEW_PROPERTY_RESET } from "../../../constans/PropertyConstans";
import { ToastContainer, toast } from "react-toastify";
import AgentSidebar from "../SideBar/AgentSideBar";
import "../SideBar/agentSidebar.css";
import Loading from "../../../more/Loader";
const CreateProperty = ({ history }) => {
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector(
    (state) => state.createProperty
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

  const propertyCategories = ["Banglow", "Apartment", "Villa"];
  const propertyTypeList = ["Rent", "Sale"];
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Property Created Successfully");
      history.push("/dashboard");
      dispatch({ type: NEW_PROPERTY_RESET });
    }
  }, [dispatch, error, history, success]);

  const createPropertySubmitHandler = (e) => {
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
    dispatch(createProperty(myForm));
  };

  const createPropertyImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

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
      {loading ? (
        <Loading />
      ) : (
        <div>
          <MetaData title="Create Property" />
          <div className="container-fluid d-flex p-0">
            <div className="SlideBar col-2">
              <AgentSidebar />
            </div>
            <div className="container col-10">
              <h4 className="text-center py-3 text-dark display-4">
                Create Property
              </h4>
              <form
                className="border p-2"
                encType="multipart/form-data"
                onSubmit={createPropertySubmitHandler}
              >
                <div className="row mt-3">
                  <div className="form-group col-md-6">
                    <label for="inputPassword4 ">Property Title</label>
                    <input
                      type="text"
                      placeholder="Product Title"
                      className="form-control"
                      required
                      value={propertyTitle}
                      onChange={(e) => setPropertyTitle(e.target.value)}
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputPassword4">Address</label>
                    <input
                      placeholder="Property Address"
                      type="text"
                      class="form-control"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    ></input>
                  </div>

                  <div className="form-group col-md-6 mt-4">
                    <label for="inputAddress">Property Type</label>
                    <select
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="ms-3"
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
                      className="ms-3"
                    >
                      <option value="">Choose Property Category</option>
                      {propertyCategories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="form-group col-md-4">
                    <label for="inputCity">Bathrooms</label>
                    <input
                      type="number"
                      placeholder="bathroom"
                      required
                      className="form-control"
                      onChange={(e) => setBathrooms(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label for="inputState">Bedrooms</label>
                    <input
                      type="number"
                      placeholder="bedroom"
                      className="form-control"
                      required
                      onChange={(e) => setBedrooms(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-md-4 ">
                    <label for="inputZip">Price</label>
                    <input
                      type="number"
                      placeholder="Product Price"
                      className="form-control"
                      required
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="form-group col-md-3">
                    <label for="inputCity">Area </label>
                    <input
                      type="number"
                      placeholder="AreaSqFt"
                      className="form-control"
                      required
                      onChange={(e) => setAreaSqFt(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <label for="inputState">Parking</label>
                    <input
                      type="string"
                      placeholder="parking"
                      className="form-control"
                      required
                      onChange={(e) => setParking(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-md-3 ">
                    <label for="inputZip">Furnished</label>
                    <input
                      type="string"
                      placeholder="Furnished"
                      className="form-control"
                      required
                      onChange={(e) => setIsFurnished(e.target.value)}
                    />
                  </div>
                  <div class="form-group col-md-3 ">
                    <label for="inputZip">Build Year</label>
                    <input
                      type="string"
                      placeholder="Build Year"
                      className="form-control"
                      required
                      value={buildYear}
                      onChange={(e) => setBuildYear(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="form-group col-md-6">
                    <label for="inputPassword4">Property Description</label>
                    <textarea
                      placeholder="Property Description"
                      value={description}
                      className="form-control"
                      onChange={(e) => setDescription(e.target.value)}
                      cols="30"
                      rows="1"
                    ></textarea>
                  </div>
                  <div className="form-group col-md-3">
                    <label for="inputPassword4">Property Face</label>
                    <input
                      type="string"
                      placeholder="Property Face"
                      className="form-control"
                      required
                      onChange={(e) => setPropertyFace(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-md-3  mt-4 fw-bold display-1">
                    <div id="createProductFormFile">
                      <input
                        type="file"
                        name="images"
                        accept="image/*"
                        onChange={createPropertyImagesChange}
                        multiple
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
            </div>
          </div>
        </div>
      )}
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

export default CreateProperty;
