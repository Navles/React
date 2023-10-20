import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { createUser, updateUser, getUser } from "../../../Services/API";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./USCreate.css";
import { FaEye, FaEyeSlash, FaAngleDoubleLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import Loader from "../../../Layout/Loader";

function USCreate() {
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [cpass, setCpass] = useState("");
  const [cpassError, setCpassError] = useState("");

  const [language, setLanguage] = useState("");
  const [languageError, setLanguageError] = useState("");

  const [gender, setGender] = useState("");
  const [genderError, setGenderError] = useState("");

  const [dob, setDob] = useState("");
  const [dobError, setDobError] = useState("");

  const [id, setId] = useState("");
  const navigate = useNavigate();
  const router = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [cshowPassword, setCShowPassword] = useState(false);

  const nameRegex = /^[a-zA-Z ]{3,30}$/;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const phoneRegex = /^\d{10}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{8,}$/;
  const dobRegex = /^\d{4}-\d{2}-\d{2}/;

  const handleFieldChange = (event, regex, errorSetter) => {
    const value = event.target.value;
    if (!value) {
      errorSetter(`${event.target.name} is required*`);
    } else if (typeof regex === "function" && !regex(value)) {
      errorSetter(`Invalid ${event.target.name} format*`);
    } else if (regex instanceof RegExp && !regex.test(value)) {
      errorSetter(`Invalid ${event.target.name} format*`);
    } else {
      errorSetter("");
    }
  };
  
  const handleLanguageChange = (event, errorSetter) => {
    const value = event.target.value;
    if (!value) {
      errorSetter(`${event.target.name} is required*`);
    } else {
      errorSetter("");
    }
  };

  const handleGenderChange = (event, errorSetter) => {
    const value = event.target.value;
    errorSetter(value ? "" : `${event.target.name} is required*`);
  };
  const genderSubmit = (event, errorSetter) => {
    if (event.target.checked) {
      event.target.checked = false;
      setGender("");
      errorSetter(`${event.target.name} is required*`);
    } else {
      event.target.checked = true;
      setGender(event.target.value);
      errorSetter("");
    }
  };

  const validateForm = () => {
    let valid = true;

    handleFieldChange(
      { target: { name: "Name", value: name } },
      nameRegex,
      setNameError
    );
    handleFieldChange(
      { target: { name: "Email", value: email } },
      emailRegex,
      setEmailError
    );
    handleFieldChange(
      { target: { name: "Phone Number", value: phone } },
      phoneRegex,
      setPhoneError
    );
    handleFieldChange(
      { target: { name: "Password", value: password } },
      passwordRegex,
      setPasswordError
    );
    if (!name) {
      valid = false;
    } else {
      setNameError("");
    }
    if (!email) {
      valid = false;
    } else {
      setEmailError("");
    }
    if (!phone) {
      valid = false;
    } else {
      setPhoneError("");
    }

    if (!cpass) {
      setCpassError("Confirm password is required*");
      valid = false;
    } else if (cpass !== password) {
      setCpassError("Passwords do not match*");
      valid = false;
    } else {
      setCpassError("");
    }

    if (!language) {
      setLanguageError("Please select a language*");
      valid = false;
    } else {
      setLanguageError("");
    }

    if (!gender) {
      setGenderError("Please select a gender*");
      valid = false;
    } else {
      setGenderError("");
    }

    handleFieldChange(
      { target: { name: "Date of Birth", value: dob } },
      dobRegex,
      setDobError
    );

    return valid;
  };

  const postData = async () => {
    setIsLoading(true);
    try {
      await createUser(
        {
        name,
        email,
        phone,
        password,
        cpass,
        language,
        gender,
        dob,
      });
      toast.success("User Data created successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      toast.error("Error in the POST API", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setIsLoading(false);
    }
    navigate("/USTable");
  };

  const updateuser = async () => {
    const isvalid = validateForm();
    if (!isvalid) {
      toast.error("Enter the Required Fields", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    try {
      await updateUser(id, {
        name,
        email,
        phone,
        password,
        cpass,
        language,
        gender,
        dob,
      });
      toast.success("User Data Updated successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate("/USTable");
    } catch (error) {
      toast.error("Error in the UPDATE API", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getId = async (id) => {
    console.log("fydIYGF;OUEDO");
    setIsLoading(true);
    try {
      const userdata = await getUser(id);
      setId(userdata.data.id);
      setName(userdata.data.name);
      setEmail(userdata.data.email);
      setPhone(userdata.data.phone);
      setPassword(userdata.data.password);
      setCpass(userdata.data.cpass);
      setLanguage(userdata.data.language);
      setGender(userdata.data.gender);
      setDob(userdata.data.dob);
    } catch (error) {
      setId("");
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setCpass("");
      setLanguage("");
      setGender("");
      setDob("");
      toast.error("Error in the GET_ID API", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (router.id) {
      getId(router.id);
      setIsEditing(true);
    }
  }, [router.id]);

  // const handleGenderChange = (event) => {
  //   setGender(event.target.value);
  // };

  const handleClick = () => {
    if (isEditing) {
      updateuser();
    } else {
      const isvalid = validateForm();
      if (!isvalid) {
        toast.error("Enter the Required Fields", {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      const isValid = validateForm();
      if (isValid) {
        postData();
      }
    }
  };

  return (
    <div>
      <div className="main-container w-75 mx-auto">
        {isLoading && <Loader />}
        {!isLoading && (
          <div className="form-container row ">
            <div className="d-flex justify-content-start">
              <Link to="/Ustable">
                <Button className="rounded-pill" variant="primary">
                  {" "}
                  <FaAngleDoubleLeft className="me-2 mb-1" />
                  Back
                </Button>
              </Link>
            </div>
            <div className="text-center fw-bold fs-2 mb-3">STUDENT FORM</div>
            <div className="col-md-6">
              <label className="fw-bold">
                Name <span className="text-danger">*</span>
              </label>
              <input
                className={`form-control ${
                  nameError ? "is-invalid" : name ? "is-valid" : ""
                }`}
                name="Name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  handleFieldChange(event, nameRegex, setNameError);
                }}
                placeholder="Enter your Name"
                required
              />
              <p className="error-message">{nameError}</p>
            </div>

            <div className="col-md-6">
              <label className="fw-bold">
                E-Mail <span className="text-danger">*</span>
              </label>
              <input
                className={`form-control ${
                  emailError ? "is-invalid" : email ? "is-valid" : ""
                }`}
                name="Email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  handleFieldChange(event, emailRegex, setEmailError);
                }}
                placeholder="Enter your E-mail"
                required
              />
              <p className="error-message">{emailError}</p>
            </div>

            <div className="col-md-6">
              <label className="fw-bold">
                Phone Number <span className="text-danger">*</span>
              </label>
              <input
                className={`form-control ${
                  phoneError ? "is-invalid" : phone ? "is-valid" : ""
                }`}
                name="Phone Number"
                value={phone}
                onChange={(event) => {
                  setPhone(event.target.value);
                  handleFieldChange(event, phoneRegex, setPhoneError);
                }}
                placeholder="Enter your Phone Number"
                required
              />
              <p className="error-message">{phoneError}</p>
            </div>
            <div className="col-md-6">
              <label className="fw-bold">
                Date of Birth <span className="text-danger">*</span>
              </label>
              <input
                className={`form-control ${
                  dobError ? "is-invalid" : dob ? "is-valid" : ""
                }`}
                name="Date of Birth"
                type="date"
                value={dob}
                onChange={(event) => {
                  setDob(event.target.value);
                  handleFieldChange(event, dobRegex, setDobError);
                }}
                placeholder="Enter your Date of Birth"
                required
              />
              <p className="error-message">{dobError}</p>
            </div>

            <div className="col-md-6">
              <label className="fw-bold">
                Password <span className="text-danger">*</span>
              </label>
              <div className="">
                <div className="input-field-wrapper">
                  <input
                    className={`form-control ${
                      passwordError ? "is-invalid" : password ? "is-valid" : ""
                    }`}
                    name="Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      handleFieldChange(event, passwordRegex, setPasswordError);
                    }}
                    placeholder="Enter your Password"
                    required
                  />
                  <button
                    className="show-password-button fs-4 text-primary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
              </div>
              <p className="error-message">{passwordError}</p>
            </div>

            <div className="col-md-6">
              <label className="fw-bold">
                Confirm Password <span className="text-danger">*</span>
              </label>
              <div className="">
                <div className="input-field-wrapper">
                  <input
                    className={`form-control ${
                      cpassError ? "is-invalid" : cpass ? "is-valid" : ""
                    }`}
                    name="Confirm password"
                    type={cshowPassword ? "text" : "password"}
                    value={cpass}
                    onChange={(event) => {
                      setCpass(event.target.value);
                      handleFieldChange(
                        event,
                        (value) => value === password,
                        setCpassError
                      );
                    }}
                    placeholder="Enter your Confirm password"
                    required
                  />
                  <button
                    className="show-password-button fs-4 text-primary"
                    onClick={() => setCShowPassword(!cshowPassword)}
                  >
                    {cshowPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
              </div>

              <p className="error-message">{cpassError}</p>
            </div>

            <div className="col-md-6">
              <label className="fw-bold">
                Language <span className="text-danger">*</span>
              </label>
              <select
                className={`form-control ${
                  languageError ? "is-invalid" : language ? "is-valid" : ""
                }`}
                name="Language"
                value={language}
                onChange={(event) => {
                  handleLanguageChange(event, setLanguageError);
                  setLanguage(event.target.value);
                }}
                required
              >
                <option value="">-- Select Language --</option>
                <option value="Tamil">Tamil</option>
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="Other">Other</option>
              </select>
              <p className="error-message">{languageError}</p>
            </div>

            <div className="col-md-6">
              <label className="fw-bold">
                Gender <span className="text-danger">*</span>
              </label>
              <div className="radio-group d-flex">
                {["Male", "Female", "Others"].map((option) => (
                  <div key={option}>
                    <input
                      type="radio"
                      name="Gender"
                      value={option}
                      checked={gender === option}
                      onChange={(event) => {
                        handleGenderChange(event, setGenderError);
                        setGender(event.target.value);
                      }}
                      onClick={(event) => {
                        genderSubmit(event, setGenderError);
                      }}
                      required
                    />
                    <label className="me-2">{option}</label>
                  </div>
                ))}
              </div>
              <p className="error-message">{genderError}</p>
            </div>

            <div className="d-flex justify-content-center">
              <div className="">
                <Button className="rounded-pill" onClick={handleClick}>
                  {isEditing ? "Update" : "Submit"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default USCreate;
