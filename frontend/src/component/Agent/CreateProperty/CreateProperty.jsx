import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProperty } from "../../../actions/PropertyActions";
import { Button } from "@material-ui/core";
import MetaData from "../../../more/Metadata";
import { NEW_PROPERTY_RESET } from "../../../constans/PropertyConstans";
import { ToastContainer, toast } from "react-toastify";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { GOOGLE_PLACES_API_KEY } from "../../../config";
import AgentSidebar from "../SideBar/AgentSideBar";
import "../SideBar/agentSidebar.css"
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
      setImagesPreview((old) => [...old, URL.createObjectURL(file)]);
      setImages((old) => [...old, file]);
    });
  };

  return (
    <Fragment>
      <MetaData title="Create Property" />
      <div className="dashboard">
        < AgentSidebar />
        <div className="container">
          <h4 className="text-center py-3 text-dark display-4">Create Property</h4>
          <form
            className="border p-2"
            encType="multipart/form-data"
            onSubmit={createPropertySubmitHandler}
          >
            <div class="row mt-3">
              <div className="form-group col-md-6">
                <label for="inputPassword4 ">Property Title</label>
                <input
                  type="text"
                  placeholder="Product Title"
                  class="form-control"
                  required
                  value={propertyTitle}
                  onChange={(e) => setPropertyTitle(e.target.value)}
                />
              </div>
              <div class="form-group col-md-6">
                <label for="inputPassword4">Address</label>
                
                 <GooglePlacesAutocomplete
                 apiKey={GOOGLE_PLACES_API_KEY}
                 apiOptions={{ region: "au" }}
                  placeholder="Property Address"
                  type="text"
                  class="form-control"
                  required
                  selectProps={{
                
                    placeholder: "Search for address..",
                    onChange: ({ value }) => {
                      console.log("address onchange => ", value.description);
                      //setAd({ ...ad, address: value.description });
                      setAddress(value.description)
                    },
                  }}
                  // onChange=({value}) =>{ setAddress({address: value.description})}
                  />
              
              </div>
              {/* <div className="mb-3 form-control">
               
                  selectProps={{
                    //defaultInputValue: ad?.address,
                    placeholder: "Search for address..",
                    onChange: ({ value }) => {
                      // console.log("address onchange => ", value.description);
                      //setAd({ ...ad, address: value.description });
                    },
                  }}
                
              </div> */}

              <div class="form-group col-md-6 mt-4">
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
                  value={category}
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
            <div class="row mt-4">
              <div class="form-group col-md-4">
                <label for="inputCity">Bathrooms</label>
                <input
                  type="number"
                  placeholder="bathroom"
                  required
                  class="form-control"
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
                  onChange={(e) => setBedrooms(e.target.value)}
                />
              </div>
              <div class="form-group col-md-4 ">
                <label for="inputZip">Price</label>
                <input
                  type="number"
                  placeholder="Product Price"
                  class="form-control"
                  required
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
                  onChange={(e) => setPropertyFace(e.target.value)}
                />
              </div>
              <div class="form-group col-md-3  mt-4 fw-bold display-1">
                <div id="createProductFormFile">
                  {/* <input
                    type="file"
                    name="avatar"
                    class="form-control"
                    accept="image/*"
                    onChange={createPropertyImagesChange}
                    multiple
                  /> */}
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
    </Fragment>
  );
};

export default CreateProperty;