import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../../actions/ProductActions";
import { Button } from "@material-ui/core";
import MetaData from "../../more/Metadata";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
// eslint-disable-next-line
import DiscountIcon from "@material-ui/icons/LocalOffer";
import SideBar from "./Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../constans/ProductConstans";
import { ToastContainer, toast } from "react-toastify";

const UpdateProduct = ({ history, match }) => {
  const dispatch = useDispatch();

  const { error, product } = useSelector((state) => state.productDetails);

  const { loading, error: updateError, isUpdated } = useSelector(
    (state) => state.deleteProduct
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

  const productId = match.params.id;
  const propertyCategories = ["Banglow", "Apartment", "Villa"];
  const propertyTypeList = ["Rent", "Sale"];
  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setPropertyTitle(product.propertyTitle);
      setPropertyType(product.propertyType);
      setPrice(product.price);
      setCategory(product.category);
      setOldImages(product.images);
      setAddress(product.address);
      setAreaSqFt(product.areaSqFt);
      setBathrooms(product.bathrooms);
      setBedrooms(product.bedrooms);
      setBuildYear(product.buildYear);
      setIsFurnished(product.isFurnished);
      setParking(product.parking);
      setPropertyFace(product.propertyFace)
      setDescription(product.description)
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
      toast.success("Product Updated Successfully");
      history.push("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    history,
    isUpdated,
    productId,
    product,
    updateError,
  ]);

  const updateProductSubmitHandler = (e) => {
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
    dispatch(updateProduct(productId, myForm));
  };

  const updateProductImagesChange = (e) => {
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
      <MetaData title="Edit Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProduct">
          <form
            className="border p-5"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <div class="row mt-3">
              <div class="form-group col-md-6">
                <label for="inputPassword4">Property Title</label>
                <input
                  type="string"
                  placeholder="Product Title"
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
                  placeholder="Product Price"
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
                    onChange={updateProductImagesChange}
                    multiple
                    value={images}
                  />
                </div>

                <div id="createProductFormImage">
                  {imagesPreview.map((image, index) => (
                    <img key={index} src={image} alt="Product Preview" />
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

export default UpdateProduct;
