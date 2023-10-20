import React, { useReducer, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { createUser, getUser, updateUser } from "../../../Services/API";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaAngleDoubleLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import actionTypes from "../../../Hooks/Actions";
import { initialState, reducer } from "../../../Hooks/Functions";
import Loader from "../../../Layout/Loader";

function Usereducercreate() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const router = useParams();

  const nameRegex = /^[a-zA-Z ]{3,30}$/;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const phoneRegex = /^\d{10}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#@$?])(?!.*\s).{8,}$/;
  const dobRegex = /^\d{4}-\d{2}-\d{2}/;

  useEffect(() => {
    if (router.id) {
      getId(router.id);
      setIsEditing(true);
    }
  }, [router.id]);

  const setIsEditing = (editing) => {
    dispatch({ type: actionTypes.SET_IS_EDITING, value: editing });
  };

  const validateField = (field, value) => {
    let error = "";
    switch (field) {
      case "name":
        if (!value) {
          error = "Name is required*";
        } else if (!nameRegex.test(value)) {
          error = "Invalid Name format*";
        }
        break;
      case "email":
        if (!value) {
          error = "Email is required*";
        } else if (!emailRegex.test(value)) {
          error = "Invalid Email format*";
        }
        break;
      case "phone":
        if (!value) {
          error = "Phone Number is required*";
        } else if (!phoneRegex.test(value)) {
          error = "Invalid Phone Number format*";
        }
        break;
      case "password":
        if (!value) {
          error = "Password is required*";
        } else if (!passwordRegex.test(value)) {
          error = "Invalid Password format*";
        }
        break;
      case "cpass":
        if (!value) {
          error = "Confirm password is required*";
        } else if (value !== state.formData.password) {
          error = "Passwords do not match*";
        }
        break;
      case "language":
        if (!value) {
          error = "Please select a language*";
        }
        break;
      case "gender":
        if (!value) {
          error = "Please select a gender*";
        }
        break;
      case "dob":
        if (!value) {
          error = "Date of Birth is required*";
        } else if (!dobRegex.test(value)) {
          error = "Invalid Date of Birth format*";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleFieldChange = (field, value) => {
    dispatch({ type: actionTypes.SET_FIELD, field, value });
    const errors = { ...state.errors };
    errors[field] = validateField(field, value);
    dispatch({ type: actionTypes.SET_ERRORS, errors });
  };

  const validateForm = () => {
    const { formData } = state;
    const errors = {};
    for (const field in formData) {
      const value = formData[field];
      errors[field] = validateField(field, value);
    }
    const isFormValid = Object.values(errors).every((error) => !error);
    dispatch({ type: actionTypes.SET_ERRORS, errors });
    return isFormValid;
  };

  const postData = async () => {
    setIsLoading(true);
    try {
      await createUser(state.formData);
      toast.success("User Data created successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log("Posted Data:", state.formData);
    } catch (error) {
      toast.error("Error in the POST API", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setIsLoading(false);
    }
    navigate("/usereducertable");
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
      await updateUser(state.formData.id, state.formData);
      toast.success("User Data Updated successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate("/usereducertable");
    } catch (error) {
      toast.error("Error in the UPDATE API", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const getId = async (id) => {
    setIsLoading(true);
    try {
      const userdata = await getUser(id);
      dispatch({
        type: actionTypes.SET_FIELD,
        field: "id",
        value: userdata.data.id,
      });
      dispatch({
        type: actionTypes.SET_FIELD,
        field: "name",
        value: userdata.data.name,
      });
      dispatch({
        type: actionTypes.SET_FIELD,
        field: "email",
        value: userdata.data.email,
      });
      dispatch({
        type: actionTypes.SET_FIELD,
        field: "phone",
        value: userdata.data.phone,
      });
      dispatch({
        type: actionTypes.SET_FIELD,
        field: "password",
        value: userdata.data.password,
      });
      dispatch({
        type: actionTypes.SET_FIELD,
        field: "cpass",
        value: userdata.data.cpass,
      });
      dispatch({
        type: actionTypes.SET_FIELD,
        field: "language",
        value: userdata.data.language,
      });
      dispatch({
        type: actionTypes.SET_FIELD,
        field: "gender",
        value: userdata.data.gender,
      });
      dispatch({
        type: actionTypes.SET_FIELD,
        field: "dob",
        value: userdata.data.dob,
      });
    } catch (error) {
      dispatch({ type: actionTypes.SET_FIELD, field: "id", value: "" });
      dispatch({ type: actionTypes.SET_FIELD, field: "name", value: "" });
      dispatch({ type: actionTypes.SET_FIELD, field: "email", value: "" });
      dispatch({ type: actionTypes.SET_FIELD, field: "phone", value: "" });
      dispatch({ type: actionTypes.SET_FIELD, field: "password", value: "" });
      dispatch({ type: actionTypes.SET_FIELD, field: "cpass", value: "" });
      dispatch({ type: actionTypes.SET_FIELD, field: "language", value: "" });
      dispatch({ type: actionTypes.SET_FIELD, field: "gender", value: "" });
      dispatch({ type: actionTypes.SET_FIELD, field: "dob", value: "" });
      toast.error("Error in the GET_ID API", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLanguageChange = (event) => {
    const value = event.target.value;

    dispatch({
      type: actionTypes.SET_FIELD,
      field: "language",
      value: value,
    });

    if (!value || value === "Select Language") {
      dispatch({
        type: actionTypes.SET_ERRORS,
        errors: { ...state.errors, language: "Please select a language*" },
      });
    } else {
      dispatch({
        type: actionTypes.SET_ERRORS,
        errors: { ...state.errors, language: "" },
      });
    }
  };

  const handleGenderChange = (event) => {
    const value = event.target.value;
    dispatch({ type: actionTypes.SET_FIELD, field: "gender", value });

    if (!value) {
      dispatch({
        type: actionTypes.SET_ERRORS,
        errors: { ...state.errors, gender: "Gender is required*" },
      });
    } else {
      dispatch({
        type: actionTypes.SET_ERRORS,
        errors: { ...state.errors, gender: "" },
      });
    }
  };

  const genderSubmit = (event) => {
    if (event.target.checked) {
      event.target.checked = false;
      dispatch({ type: actionTypes.SET_FIELD, field: "gender", value: "" });
      dispatch({
        type: actionTypes.SET_ERRORS,
        errors: { ...state.errors, gender: "Gender is required*" },
      });
    } else {
      event.target.checked = true;
      dispatch({
        type: actionTypes.SET_FIELD,
        field: "gender",
        value: event.target.value,
      });
      dispatch({
        type: actionTypes.SET_ERRORS,
        errors: { ...state.errors, gender: "" },
      });
    }
  };

  const handlePasswordToggle = () => {
    dispatch({
      type: actionTypes.SET_FIELD,
      field: "showPassword",
      value: !state.formData.showPassword,
    });
  };
  const handleClick = () => {
    if (state.isEditing) {
      updateuser();
    } else {
      const isvalid = validateForm();
      if (!isvalid) {
        toast.error("Enter the Required Fields", {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      postData();
    }
  };

  return (
    <div>
      <div className="main-container w-75 mx-auto">
        {isLoading && <Loader />}
        {!isLoading && (
          <div className="form-container row shadow-lg mt-5">
            <div className="d-flex justify-content-start">
              <Link to="/usereducertable">
                <Button className="rounded-pill mt-4" variant="primary">
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
                  state.errors.name
                    ? "is-invalid"
                    : state.formData.name
                    ? "is-valid"
                    : ""
                }`}
                name="Name"
                value={state.formData.name}
                onChange={(event) => {
                  handleFieldChange("name", event.target.value);
                }}
                placeholder="Enter your Name"
                required
              />
              <p className="error-message">{state.errors.name}</p>
            </div>

            <div className="col-md-6">
              <label className="fw-bold">
                E-Mail <span className="text-danger">*</span>
              </label>
              <input
                className={`form-control ${
                  state.errors.email
                    ? "is-invalid"
                    : state.formData.email
                    ? "is-valid"
                    : ""
                }`}
                name="Email"
                value={state.formData.email}
                onChange={(event) => {
                  handleFieldChange("email", event.target.value);
                }}
                placeholder="Enter your E-mail"
                required
              />
              <p className="error-message">{state.errors.email}</p>
            </div>

            <div className="col-md-6">
              <label className="fw-bold">
                Phone Number <span className="text-danger">*</span>
              </label>
              <input
                className={`form-control ${
                  state.errors.phone
                    ? "is-invalid"
                    : state.formData.phone
                    ? "is-valid"
                    : ""
                }`}
                name="Phone Number"
                value={state.formData.phone}
                onChange={(event) => {
                  handleFieldChange("phone", event.target.value);
                }}
                placeholder="Enter your Phone Number"
                required
              />
              <p className="error-message">{state.errors.phone}</p>
            </div>

            <div className="col-md-6">
              <label className="fw-bold">
                Date of Birth <span className="text-danger">*</span>
              </label>
              <input
                className={`form-control ${
                  state.errors.dob
                    ? "is-invalid"
                    : state.formData.dob
                    ? "is-valid"
                    : ""
                }`}
                name="Date of Birth"
                type="date"
                value={state.formData.dob}
                onChange={(event) => {
                  handleFieldChange("dob", event.target.value);
                }}
                placeholder="Enter your Date of Birth"
                required
              />
              <p className="error-message">{state.errors.dob}</p>
            </div>

            <div className="col-md-6">
              <label className="fw-bold">
                Password <span className="text-danger">*</span>
              </label>
              <div className="">
                <div className="input-field-wrapper">
                  <input
                    className={`form-control ${
                      state.errors.password
                        ? "is-invalid"
                        : state.formData.password
                        ? "is-valid"
                        : ""
                    }`}
                    name="password"
                    type={state.formData.showPassword ? "text" : "password"}
                    value={state.formData.password}
                    onChange={(event) => {
                      handleFieldChange("password", event.target.value);
                    }}
                    placeholder="Enter your Password"
                    required
                  />
                  <button
                    className="show-password-button fs-4 text-primary"
                    onClick={handlePasswordToggle}
                  >
                    {state.formData.showPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
              </div>
              <p className="error-message">{state.errors.password}</p>
            </div>

            <div className="col-md-6">
              <label className="fw-bold">
                Confirm Password <span className="text-danger">*</span>
              </label>
              <div className="">
                <div className="input-field-wrapper">
                  <input
                    className={`form-control ${
                      state.errors.cpass
                        ? "is-invalid"
                        : state.formData.cpass
                        ? "is-valid"
                        : ""
                    }`}
                    name="confirmPassword"
                    type={state.formData.cshowPassword ? "text" : "password"}
                    value={state.formData.cpass}
                    onChange={(event) => {
                      handleFieldChange("cpass", event.target.value);
                    }}
                    placeholder="Enter your Confirm Password"
                    required
                  />
                  <button
                    className="show-password-button fs-4 text-primary"
                    onClick={() =>
                      dispatch({
                        type: actionTypes.SET_FIELD,
                        field: "cshowPassword",
                        value: !state.formData.cshowPassword,
                      })
                    }
                  >
                    {state.formData.cshowPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
              </div>
              <p className="error-message">{state.errors.cpass}</p>
            </div>

            <div className="col-md-6">
              <label className="fw-bold mb-2">
                Language <span className="text-danger">*</span> :
              </label>
              <select
                className={`form-control ${
                  state.errors.language
                    ? "is-invalid"
                    : state.formData.language
                    ? "is-valid"
                    : ""
                }`}
                name="language"
                value={state.formData.language}
                onChange={handleLanguageChange}
                required
              >
                <option value="">-- Select a Language --</option>
                <option value="Tamil">Tamil</option>
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="Other">Other</option>
              </select>
              <p className="error-message">{state.errors.language}</p>
            </div>

            <div className="col-md-6">
              <label className="fw-bold mb-2">
                Gender <span className="text-danger">*</span> :
              </label>
              <div>
                {["Male", "Female", "Others"].map((option) => (
                  <label key={option}>
                    <input
                      type="radio"
                      name="gender"
                      value={option}
                      checked={state.formData.gender === option}
                      onChange={handleGenderChange}
                      onClick={genderSubmit}
                      required
                    />
                    <span className="me-3 ms-1">{option}</span>
                  </label>
                ))}
              </div>
              <p className="error-message">{state.errors.gender}</p>
            </div>

            <div className="d-flex justify-content-center">
              <div className="">
                <Button
                  className="rounded-pill mb-4 mt-4"
                  onClick={handleClick}
                >
                  {state.isEditing ? "Update" : "Submit"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Usereducercreate;

// import React, { useEffect, useReducer, useState } from "react";
// import { Button } from "react-bootstrap";
// import { createUser, getUser, updateUser } from "../../../Services/API";
// import { useNavigate, useParams, Link } from "react-router-dom";
// import { FaEye, FaEyeSlash, FaAngleDoubleLeft } from "react-icons/fa";
// import { toast } from "react-toastify";
// import actionTypes from "../../../Hooks/Actions";
// import { initialState, reducer } from "../../../Hooks/Functions";
// import Loader from "../../../Layout/Loader";

// function Usereduccreate() {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const [isLoading, setIsLoading] = useState(false);

//   const navigate = useNavigate();
//   const router = useParams();

//   const nameRegex = /^[a-zA-Z ]{3,30}$/;
//   const emailRegex = /^[a-zA-Z0-9._-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,4}$/;
//   const phoneRegex = /^\d{10}$/;
//   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#@$?])(?!.*\s).{8,}$/;
//   const dobRegex = /^\d{4}-\d{2}-\d{2}/;

//   useEffect(() => {
//     if (router.id) {
//       getId(router.id);
//       setIsEditing(true);
//     }
//   }, [router.id]);

//   const setIsEditing = (editing) => {
//     dispatch({ type: actionTypes.SET_IS_EDITING, value: editing });
//   };

//   const validateField = (field, value) => {
//     let error = "";
//     switch (field) {
//       case "name":
//         if (!value) {
//           error = "Name is required*";
//         } else if (!nameRegex.test(value)) {
//           error = "Invalid Name format*";
//         }
//         break;
//       case "email":
//         if (!value) {
//           error = "Email is required*";
//         } else if (!emailRegex.test(value)) {
//           error = "Invalid Email format*";
//         }
//         break;
//       case "phone":
//         if (!value) {
//           error = "Phone Number is required*";
//         } else if (!phoneRegex.test(value)) {
//           error = "Invalid Phone Number format*";
//         }
//         break;
//       case "password":
//         if (!value) {
//           error = "Password is required*";
//         } else if (!passwordRegex.test(value)) {
//           error = "Invalid Password format*";
//         }
//         break;
//       case "cpass":
//         if (!value) {
//           error = "Confirm password is required*";
//         } else if (value !== state.formData.password) {
//           error = "Passwords do not match*";
//         }
//         break;
//       case "language":
//         if (!value) {
//           error = "Please select a language*";
//         }
//         break;
//       case "gender":
//         if (!value) {
//           error = "Please select a gender*";
//         }
//         break;
//       case "dob":
//         if (!value) {
//           error = "Date of Birth is required*";
//         } else if (!dobRegex.test(value)) {
//           error = "Invalid Date of Birth format*";
//         }
//         break;
//       default:
//         break;
//     }
//     return error;
//   };

//   const handleFieldChange = (field, value) => {
//     dispatch({ type: actionTypes.SET_FIELD, field, value });
//     const errors = { ...state.errors };
//     errors[field] = validateField(field, value);
//     dispatch({ type: actionTypes.SET_ERRORS, errors });
//   };

//   const validateForm = () => {
//     const { formData } = state;
//     const errors = {};
//     for (const field in formData) {
//       const value = formData[field];
//       errors[field] = validateField(field, value);
//     }
//     const isFormValid = Object.values(errors).every((error) => !error);
//     dispatch({ type: actionTypes.SET_ERRORS, errors });
//     return isFormValid;
//   };

//   const postData = async () => {
//     setIsLoading(true);
//     try {
//       await createUser(state.formData);
//       toast.success("User Data created successfully", {
//         position: toast.POSITION.TOP_RIGHT,
//       });
//       console.log("Posted Data:", state.formData);
//     } catch (error) {
//       toast.error("Error in the POST API", {
//         position: toast.POSITION.TOP_RIGHT,
//       });
//     } finally {
//       setIsLoading(false);
//     }
//     navigate("/usereducertable");
//   };

//   const updateuser = async () => {
//     const isvalid = validateForm();
//     if (!isvalid) {
//       toast.error("Enter the Required Fields", {
//         position: toast.POSITION.TOP_RIGHT,
//       });
//       return;
//     }
//     try {
//       await updateUser(state.formData.id, state.formData);
//       toast.success("User Data Updated successfully", {
//         position: toast.POSITION.TOP_RIGHT,
//       });
//       navigate("/usereducertable");
//     } catch (error) {
//       toast.error("Error in the UPDATE API", {
//         position: toast.POSITION.TOP_RIGHT,
//       });
//     }
//   };

//   const getId = async (id) => {
//     setIsLoading(true);
//     try {
//       const userdata = await getUser(id);
//       dispatch({ type: actionTypes.SET_IS_EDITING, value: true });
//       dispatch({ type: actionTypes.SET_FIELD, field: "id", value: userdata.id });
//       dispatch({ type: actionTypes.SET_FIELD, field: "name", value: userdata.name });
//       dispatch({ type: actionTypes.SET_FIELD, field: "email", value: userdata.email });
//       dispatch({ type: actionTypes.SET_FIELD, field: "phone", value: userdata.phone });
//       dispatch({ type: actionTypes.SET_FIELD, field: "password", value: userdata.password });
//       dispatch({ type: actionTypes.SET_FIELD, field: "cpass", value: userdata.cpass });
//       dispatch({ type: actionTypes.SET_FIELD, field: "language", value: userdata.language });
//       dispatch({ type: actionTypes.SET_FIELD, field: "gender", value: userdata.gender });
//       dispatch({ type: actionTypes.SET_FIELD, field: "dob", value: userdata.dob });
//     } catch (error) {
//       dispatch({ type: actionTypes.SET_IS_EDITING, value: false });
//       toast.error("Error in the GET_ID API", {
//         position: toast.POSITION.TOP_RIGHT,
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <div className="user-create">
//       <div className="user-create-title">
//         <h3>{state.isEditing ? "Edit User" : "Create User"}</h3>
//       </div>
//       <div className="user-create-form">
//         <form>
//           <div className="form-row">
//             <div className="form-group col-md-6">
//               <label>Name</label>
//               <input
//                 type="text"
//                 className={"form-control" + (state.errors.name ? " is-invalid" : "")}
//                 placeholder="Name"
//                 value={state.formData.name}
//                 onChange={(e) => handleFieldChange("name", e.target.value)}
//               />
//               <div className="invalid-feedback">{state.errors.name}</div>
//             </div>
//             <div className="form-group col-md-6">
//               <label>Email</label>
//               <input
//                 type="text"
//                 className={"form-control" + (state.errors.email ? " is-invalid" : "")}
//                 placeholder="Email"
//                 value={state.formData.email}
//                 onChange={(e) => handleFieldChange("email", e.target.value)}
//               />
//               <div className="invalid-feedback">{state.errors.email}</div>
//             </div>
//           </div>
//           <div className="form-row">
//             <div className="form-group col-md-6">
//               <label>Phone</label>
//               <input
//                 type="text"
//                 className={"form-control" + (state.errors.phone ? " is-invalid" : "")}
//                 placeholder="Phone"
//                 value={state.formData.phone}
//                 onChange={(e) => handleFieldChange("phone", e.target.value)}
//               />
//               <div className="invalid-feedback">{state.errors.phone}</div>
//             </div>
//             <div className="form-group col-md-6">
//               <label>Password</label>
//               <div className="password-input">
//                 <input
//                   type={state.showPassword ? "text" : "password"}
//                   className={"form-control" + (state.errors.password ? " is-invalid" : "")}
//                   placeholder="Password"
//                   value={state.formData.password}
//                   onChange={(e) => handleFieldChange("password", e.target.value)}
//                 />
//                 {state.showPassword ? (
//                   <FaEyeSlash className="password-icon" onClick={() => dispatch({ type: actionTypes.SET_FIELD, field: "showPassword", value: !state.showPassword })} />
//                 ) : (
//                   <FaEye className="password-icon" onClick={() => dispatch({ type: actionTypes.SET_FIELD, field: "showPassword", value: !state.showPassword })} />
//                 )}
//               </div>
//               <div className="invalid-feedback">{state.errors.password}</div>
//             </div>
//           </div>
//           <div className="form-row">
//             <div className="form-group col-md-6">
//               <label>Confirm Password</label>
//               <div className="password-input">
//                 <input
//                   type={state.cshowPassword ? "text" : "password"}
//                   className={"form-control" + (state.errors.cpass ? " is-invalid" : "")}
//                   placeholder="Confirm Password"
//                   value={state.formData.cpass}
//                   onChange={(e) => handleFieldChange("cpass", e.target.value)}
//                 />
//                 {state.cshowPassword ? (
//                   <FaEyeSlash className="password-icon" onClick={() => dispatch({ type: actionTypes.SET_FIELD, field: "cshowPassword", value: !state.cshowPassword })} />
//                 ) : (
//                   <FaEye className="password-icon" onClick={() => dispatch({ type: actionTypes.SET_FIELD, field: "cshowPassword", value: !state.cshowPassword })} />
//                 )}
//               </div>
//               <div className="invalid-feedback">{state.errors.cpass}</div>
//             </div>
//             <div className="form-group col-md-6">
//               <label>Language</label>
//               <select
//                 className={"form-control" + (state.errors.language ? " is-invalid" : "")}
//                 value={state.formData.language}
//                 onChange={(e) => handleFieldChange("language", e.target.value)}
//               >
//                 <option value="">Select Language</option>
//                 <option value="English">English</option>
//                 <option value="Spanish">Spanish</option>
//                 <option value="French">French</option>
//               </select>
//               <div className="invalid-feedback">{state.errors.language}</div>
//             </div>
//           </div>
//           <div className="form-row">
//             <div className="form-group col-md-6">
//               <label>Gender</label>
//               <div className="gender-radio">
//                 <div className="form-check form-check-inline">
//                   <input
//                     className={"form-check-input" + (state.errors.gender ? " is-invalid" : "")}
//                     type="radio"
//                     name="genderRadio"
//                     id="maleRadio"
//                     value="Male"
//                     checked={state.formData.gender === "Male"}
//                     onChange={() => handleFieldChange("gender", "Male")}
//                   />
//                   <label className="form-check-label" htmlFor="maleRadio">
//                     Male
//                   </label>
//                 </div>
//                 <div className="form-check form-check-inline">
//                   <input
//                     className={"form-check-input" + (state.errors.gender ? " is-invalid" : "")}
//                     type="radio"
//                     name="genderRadio"
//                     id="femaleRadio"
//                     value="Female"
//                     checked={state.formData.gender === "Female"}
//                     onChange={() => handleFieldChange("gender", "Female")}
//                   />
//                   <label className="form-check-label" htmlFor="femaleRadio">
//                     Female
//                   </label>
//                 </div>
//               </div>
//               <div className="invalid-feedback">{state.errors.gender}</div>
//             </div>
//             <div className="form-group col-md-6">
//               <label>Date of Birth</label>
//               <input
//                 type="date"
//                 className={"form-control" + (state.errors.dob ? " is-invalid" : "")}
//                 value={state.formData.dob}
//                 onChange={(e) => handleFieldChange("dob", e.target.value)}
//               />
//               <div className="invalid-feedback">{state.errors.dob}</div>
//             </div>
//           </div>
//           <div className="form-btns">
//             <Button className="back-btn" onClick={() => navigate("/usereducertable")}>
//               <FaAngleDoubleLeft />
//               <span>Back to User Table</span>
//             </Button>
//             <Button className="submit-btn" onClick={state.isEditing ? updateuser : postData}>
//               {state.isEditing ? "Update User" : "Create User"}
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Usereduccreate;
