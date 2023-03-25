import React, { Fragment, useEffect, useState } from "react";
// import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/ProductActions";
import { Button } from "@material-ui/core";
import MetaData from "../../more/Metadata";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import DiscountIcon from "@material-ui/icons/LocalOffer";
import SideBar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../constans/ProductConstans";
import { ToastContainer, toast } from "react-toastify";

const CreateProduct = ({ history }) => {
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector(
    (state) => state.createProduct
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
  const propertyParking = ["Yes", "No"];
  const propertyFurnished = ["Yes", "No"];
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Product Created Successfully");
      history.push("/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createProductSubmitHandler = (e) => {
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
    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
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
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="container">
          <h1 className="text-center py-3">Create Product</h1>
          <form
            className="border p-5"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <div class="row mt-3">
              <div class="form-group col-md-6">
                <label for="inputPassword4">Property Title</label>
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
                <input
                  placeholder="Property Address"
                  type="text"
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
                  <input
                    type="file"
                    name="avatar"
                    class="form-control"
                    accept="image/*"
                    onChange={createProductImagesChange}
                    multiple
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
    //         {/* </div>
    //         </div> */}
    //           {/* <form
    //             className="createProductForm"
    //             encType="multipart/form-data"
    //             onSubmit={createProductSubmitHandler}
    //           >
    //             <h1>Create Product</h1>

    //             <div>
    //               <SpellcheckIcon />
    //               <input
    //                 type="text"
    //                 placeholder="Product Name"
    //                 required
    //                 value={propertyTitle}
    //                 onChange={(e) => setPropertyTitle(e.target.value)}
    //               />
    //             </div>
    //             <div>
    //               <AttachMoneyIcon />
    //               <input
    //                 type="number"
    //                 placeholder="Product Price"
    //                 required
    //                 onChange={(e) => setPrice(e.target.value)}
    //               />
    //             </div>
    //             <div>
    //               <AttachMoneyIcon />
    //               <input
    //                 type="number"
    //                 placeholder="bedroom"
    //                 required
    //                 onChange={(e) => setBedrooms(e.target.value)}
    //               />
    //             </div>
    //             <div>
    //               <AttachMoneyIcon />
    //               <input
    //                 type="number"
    //                 placeholder="bathroom"
    //                 required
    //                 onChange={(e) => setBathrooms(e.target.value)}
    //               />
    //             </div>
    //             <div>
    //               <AttachMoneyIcon />
    //               <input
    //                 type="number"
    //                 placeholder="Area"
    //                 required
    //                 onChange={(e) => setArea(e.target.value)}
    //               />
    //             </div>
    //             <div>
    //               <AttachMoneyIcon />
    //               <input
    //                 type="number"
    //                 placeholder="AreaSqFt"
    //                 required
    //                 onChange={(e) => setAreaSqFt(e.target.value)}
    //               />
    //             </div>

    //             <div>
    //               <DescriptionIcon />
    //               <textarea
    //                 placeholder="Property Description"
    //                 value={description}
    //                 onChange={(e) => setDescription(e.target.value)}
    //                 cols="30"
    //                 rows="1"
    //               ></textarea>
    //             </div>

    //             <div>
    //               <DescriptionIcon />
    //               <textarea
    //                 placeholder="Property Address"
    //                 value={address}
    //                 onChange={(e) => setAddress(e.target.value)}
    //                 cols="30"
    //                 rows="1"
    //               ></textarea>
    //             </div>

    //             <div>
    //               <DescriptionIcon />
    //               <textarea
    //                 placeholder="Property Location"
    //                 value={location}
    //                 onChange={(e) => setLocation(e.target.value)}
    //                 cols="30"
    //                 rows="1"
    //               ></textarea>
    //             </div>
    //             <div>
    //               <AccountTreeIcon />
    //               <select onChange={(e) => setCategory(e.target.value)}>
    //                 <option value="">Choose Category</option>
    //                 {propertyCategories.map((category) => (
    //                   <option key={category} value={category}>
    //                     {category}
    //                   </option>
    //                 ))}
    //               </select>
    //             </div>
    //             <div>
    //               <AccountTreeIcon />
    //               <select onChange={(e) => setParking(e.target.value)}>
    //                 <option value="">Parking</option>
    //                 {propertyParking.map((parking) => (
    //                   <option key={parking} value={parking}>
    //                     {parking}
    //                   </option>
    //                 ))}
    //               </select>
    //             </div>
    //             <div>
    //               <AccountTreeIcon />
    //               <select onChange={(e) => setIsFurnished(e.target.value)}>
    //                 <option value="">Furnished</option>
    //                 {propertyFurnished.map((furnish) => (
    //                   <option key={furnish} value={furnish}>
    //                     {furnish}
    //                   </option>
    //                 ))}
    //               </select>
    //             </div>
    //             <div>
    //               <AccountTreeIcon />
    //               <select onChange={(e) => setPropertyType(e.target.value)}>
    //                 <option value="">Choose Property Type</option>
    //                 {propertyTypeList.map((type) => (
    //                   <option key={type} value={type}>
    //                     {type}
    //                   </option>
    //                 ))}
    //               </select>
    //             </div>

    //             <div id="createProductFormFile">
    //               <input
    //                 type="file"
    //                 name="avatar"
    //                 accept="image/*"
    //                 onChange={createProductImagesChange}
    //                 multiple
    //               />
    //             </div>

    //             <div id="createProductFormImage">
    //               {imagesPreview.map((image, index) => (
    //                 <img key={index} src={image} alt="Product Preview" />
    //               ))}
    //             </div>

    //             <Button
    //               id="createProductBtn"
    //               type="submit"
    //               disabled={loading ? true : false}
    //             >
    //               Create
    //             </Button>
    //           </form> */}
    //  ?
    //       <ToastContainer
    //         position="bottom-center"
    //         autoClose={5000}
    //         hideProgressBar={false}
    //         newestOnTop={false}
    //         closeOnClick
    //         rtl={false}
    //         pauseOnFocusLoss
    //         draggable
    //         pauseOnHover
    //       />
    //     </Fragment>
  );
};

export default CreateProduct;
