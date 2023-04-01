import React, { Fragment, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./contactForm.css";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, sendContactEmail } from "../../../actions/userAction";
import Header from "../../Common/navbar/Header";
import Footer from "../../Common/footer/Footer";
const ContactForm = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const successMessage = useSelector((state) => state.successMessage);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const successMessage = await dispatch(
        sendContactEmail(name, email, subject, message)
      );
      toast.success(successMessage);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      dispatch(clearErrors());
      history.push("/");
      dispatch({ type: "SEND_CONTACT_EMAIL_RESET" });
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  return (
    <Fragment>
      <Header />
      <div className="section">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-5 mb-5 mb-lg-0"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="contact-info">
                <div className="addresscontent d-flex mt-2 mb-2">
                  <div className="home">
                    <FontAwesomeIcon
                      icon={faHouse}
                      className=" my-icon-large"
                      size="lg"
                    />
                  </div>
                  <div className=" address">
                    <h4 className="mb-2">Location:</h4>
                    <p>
                      Hattigauda Budhanilkantha
                      <br />
                      Kathmandu
                    </p>
                  </div>
                </div>
                <div className="addresscontent d-flex mt-4 mb-2">
                  <div className="home">
                    <FontAwesomeIcon
                      icon={faHouse}
                      className=" my-icon-large"
                      size="lg"
                    />
                  </div>
                  <div className=" address">
                    <h4 className="mb-2">Open Hours:</h4>
                    <p>
                      Sunday-Friday:
                      <br />
                      11:00 AM - 20:00 PM
                    </p>
                  </div>
                </div>
                <div className="addresscontent d-flex mt-4 mb-2">
                  <div className="home">
                    <FontAwesomeIcon
                      icon={faHouse}
                      className=" my-icon-large"
                      size="lg"
                    />
                  </div>
                  <div className=" address">
                    <h4 className="mb-2">Email:</h4>
                    <p>
                      info@Untree.co
                      <br />
                      info@Untree.co
                    </p>
                  </div>
                </div>

                <div className="addresscontent d-flex mt-4 mb-2">
                  <div className="home">
                    <FontAwesomeIcon
                      icon={faHouse}
                      className=" my-icon-large"
                      size="lg"
                    />
                  </div>
                  <div className=" address">
                    <h4 className="mb-2">Call:</h4>
                    <p>
                      9818767642
                      <br />
                      9809247484
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7 " data-aos="fade-up" data-aos-delay="200">
                <h1>CONTACT US</h1>
              <form className="form" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="col-6 mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Your Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Subject"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="7"
                      required
                      className="form-control"
                      placeholder="Message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="col-12">
                    <input
                      type="submit"
                      value="Send Message"
                      className="btn1"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default ContactForm;
