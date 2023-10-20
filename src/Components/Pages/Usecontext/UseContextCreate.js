import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../Usecontext/GobleState";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { FaAngleDoubleLeft,FaEye,FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import Loader from "../../../Layout/Loader";

const UseContextCreate = () => {
  const { stateEmp, addEmployee, updateEmployees, getidEmployee } =
    useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [cshowPassword, setCShowPassword] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    password: "",
    cpass: "",
    language: "",
    gender: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const getid = async () => {
    setIsLoading(true);
    await getidEmployee(id);
    setIsLoading(false);
  };
  useEffect(() => {
    if (id) {
      getid();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (stateEmp.employeeId) {
      setFormData({
        name: stateEmp.employeeId.name,
        email: stateEmp.employeeId.email,
        phone: stateEmp.employeeId.phone,
        dob: stateEmp.employeeId.dob,
        password: stateEmp.employeeId.password,
        cpass: stateEmp.employeeId.cpass,
        language: stateEmp.employeeId.language,
        gender: stateEmp.employeeId.gender,
        id: stateEmp.employeeId.id,
      });
    }
    console.log(stateEmp.employeeId);
  }, [stateEmp.employeeId]);

  const nameRegex = /^[a-zA-Z ]{3,30}$/;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const phoneRegex = /^\d{10}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{8,}$/;
  const dobRegex = /^\d{4}-\d{2}-\d{2}/;

  const validateForm = () => {
    const errors = {};

    if (!formData.name) {
      errors.name = "Name is required*";
    } else if (!nameRegex.test(formData.name)) {
      errors.name = "Invalid name format*";
    }

    if (!formData.email) {
      errors.email = "Email is required*";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format*";
    }

    if (!formData.phone) {
      errors.phone = "Phone number is required*";
    } else if (!phoneRegex.test(formData.phone)) {
      errors.phone = "Invalid phone number format*";
    }

    if (!formData.password) {
      errors.password = "Password is required*";
    } else if (!passwordRegex.test(formData.password)) {
      errors.password = "Invalid password format*";
    }

    if (!formData.cpass) {
      errors.cpass = "Confirm Password is required*";
    } else if (formData.cpass !== formData.password) {
      errors.cpass = "Passwords do not match*";
    }

    if (!formData.language) {
      errors.language = "Language is required*";
    }

    if (!formData.gender) {
      errors.gender = "Gender is required*";
    }

    if (!formData.dob) {
      errors.dob = "Date of Birth is required*";
    } else if (!dobRegex.test(formData.dob)) {
      errors.dob = "Invalid Date of Birth format*";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleFieldChange = (event, regex, fieldName) => {
    const value = event.target.value;

    if (regex && !regex.test(value)) {
      setFormErrors({
        ...formErrors,
        [fieldName]: `Invalid ${fieldName} format*`,
      });
    } else {
      setFormErrors({
        ...formErrors,
        [fieldName]: "",
      });
    }

    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      setIsLoading(true);
      try {
        if (id) {
          await updateEmployees(formData);
          toast.success("User Data Updated successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          await addEmployee(formData);
          toast.success("User Data created successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        navigate("/UseContextTable");
      } catch (error) {
        toast.error(`Error in the ${id ? "UPDATE" : "POST"} API`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="main-container w-75 mx-auto">
        {isLoading && <Loader />}
        {!isLoading && (
          <div className="form-container row ">
            <div className="d-flex justify-content-start">
              <Link to="/UseContextTable">
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
                  formErrors.name
                    ? "is-invalid"
                    : formData.name
                    ? "is-valid"
                    : ""
                }`}
                name="Name"
                value={formData.name}
                onChange={(event) => {
                  handleFieldChange(event, nameRegex, "name");
                }}
                placeholder="Enter your Name"
                required
              />
              <p className="error-message">{formErrors.name}</p>
            </div>

            <div className="col-md-6">
              <label className="fw-bold">
                E-Mail <span className="text-danger">*</span>
              </label>
              <input
                className={`form-control ${
                  formErrors.email
                    ? "is-invalid"
                    : formData.email
                    ? "is-valid"
                    : ""
                }`}
                name="Email"
                value={formData.email}
                onChange={(event) => {
                  handleFieldChange(event, emailRegex, "email");
                }}
                placeholder="Enter your E-mail"
                required
              />
              <p className="error-message">{formErrors.email}</p>
            </div>

            <div className="col-md-6">
              <label className="fw-bold">
                Phone Number <span className="text-danger">*</span>
              </label>
              <input
                className={`form-control ${
                  formErrors.phone
                    ? "is-invalid"
                    : formData.phone
                    ? "is-valid"
                    : ""
                }`}
                value={formData.phone}
                onChange={(event) => {
                  handleFieldChange(event, phoneRegex, "phone");
                }}
                placeholder="Enter your Phone Number"
                required
              />
              <p className="error-message">{formErrors.phone}</p>
            </div>
            <div className="col-md-6">
              <label className="fw-bold">
                Date of Birth <span className="text-danger">*</span>
              </label>
              <input
                className={`form-control ${
                  formErrors.dob ? "is-invalid" : formData.dob ? "is-valid" : ""
                }`}
                name="Date of Birth"
                type="date"
                value={formData.dob}
                onChange={(event) => {
                  handleFieldChange(event, dobRegex, "dob");
                }}
                placeholder="Enter your Date of Birth"
                required
              />
              <p className="error-message">{formErrors.dob}</p>
            </div>

            <div className="col-md-6">
              <label className="fw-bold">
                Password <span className="text-danger">*</span>
              </label>
              <div className="">
                <div className="input-field-wrapper">
                  <input
                    className={`form-control ${
                      formErrors.password
                        ? "is-invalid"
                        : formData.password
                        ? "is-valid"
                        : ""
                    }`}
                    name="Password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(event) => {
                      handleFieldChange(event, passwordRegex, "password");
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
              <p className="error-message">{formErrors.password}</p>
            </div>

            <div className="col-md-6">
              <label className="fw-bold">
                Confirm Password <span className="text-danger">*</span>
              </label>
              <div className="">
                <div className="input-field-wrapper">
                  <input
                    className={`form-control ${
                      formErrors.cpass
                        ? "is-invalid"
                        : formData.cpass
                        ? "is-valid"
                        : ""
                    }`}
                    name="Confirm password"
                    type={cshowPassword ? "text" : "password"}
                    value={formData.cpass}
                    onChange={(event) => {
                      handleFieldChange(event, passwordRegex, "cpass");
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

              <p className="error-message">{formErrors.cpass}</p>
            </div>

            <div className="col-md-6 mb-3 mx-auto">
              <label htmlFor="language" className="fw-bold text-dark">
                Language:
              </label>
              <select
                // className={`form-select ${
                //   formErrors.language ? "is-invalid" : ""
                // }`}
                className={`form-control ${
                  formErrors.language
                    ? "is-invalid"
                    : formData.language
                    ? "is-valid"
                    : ""
                }`}
                id="language"
                name="language"
                value={formData.language}
                onChange={(event) => {
                  handleFieldChange(event, null, "language");
                }}
              >
                <option value="">Select your Language</option>
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
              </select>
              {formErrors.language && (
                <div className="text-danger">{formErrors.language}</div>
              )}
            </div>

            <div className="col-md-6 mb-3 mx-auto">
              <label className="fw-bold text-dark">Gender:</label>
              <div className="form-check">
                <input
                  className={`form-check-input ${
                    formErrors.gender ? "is-invalid" : ""
                  }`}
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={(event) => {
                    handleFieldChange(event, null, "gender");
                  }}
                />
                <label className="form-check-label" htmlFor="male">
                  Male
                </label>
              </div>
              <div className="form-check">
                <input
                  className={`form-check-input ${
                    formErrors.gender ? "is-invalid" : ""
                  }`}
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={(event) => {
                    handleFieldChange(event, null, "gender");
                  }}
                />
                <label className="form-check-label" htmlFor="female">
                  Female
                </label>
              </div>
              {formErrors.gender && (
                <div className="text-danger">{formErrors.gender}</div>
              )}
            </div>

            <div className="d-flex justify-content-center">
              <div className="">
                <Button className="rounded-pill" onClick={handleSubmit}>
                  {id ? "Update" : "Submit"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UseContextCreate;
