import React, { createContext, useReducer, useContext } from "react";
import reducer from "../../../Hooks/UseContextReducer";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser,
} from "../../../Services/API.js";
import {
  addEmployeeRequest,
  addEmployeeSuccess,
  addEmployeeError,
  getEmployeeSuccess,
  getEmployeeRequest,
  getEmployeeError,
  deleteEmployeeError,
  deleteEmployeeRequest,
  deleteEmployeeSuccess,
  updateEmployeeRequest,
  updateEmployeeSuccess,
  updateEmployessError,
  getidEmployeeSuccess,
  getidEmployeeError,
  getidEmployeeRequest,
} from "../../../Hooks/ContextActions.js";

const initialState = {
  employees: [],
  selectedProducts: [],
  employeeId: null,
};

const GlobalContext = createContext();

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export const GlobalProvider = ({ children }) => {
  const [stateEmp, dispatch] = useReducer(reducer, initialState);

  const getEmployee = async () => {
    dispatch(getEmployeeRequest());
    const res = await getUsers();
    if (res.status === 200 || res.status === 201) {
      dispatch(getEmployeeSuccess(res.data));

    } else {
      dispatch(getEmployeeError("Employee creation failed."));

    }
  }; 

  const getidEmployee = async (employeeId) => {
    dispatch(getidEmployeeRequest());  
    const res = await getUser(employeeId);
    if (res.status === 200 || res.status === 201) { 
      dispatch(getidEmployeeSuccess(res.data));
    } else {
      dispatch(getidEmployeeError("Employee creation failed."));

    }
  };

  const addEmployee = async (employee) => {
    dispatch(addEmployeeRequest(employee));
    const res = await createUser(employee);
    if (res.status === 200 || res.status === 201 || res.status === 204) {
      dispatch(addEmployeeSuccess(employee));
    } else {
      dispatch(addEmployeeError("Employee creation failed."));
    }
  };

  const updateEmployees = async (employee) => {
    dispatch(updateEmployeeRequest(employee));
    const res = await updateUser(employee.id, employee);
    if (res.status === 200) {
      dispatch(updateEmployeeSuccess(employee));
    } else {
      dispatch(updateEmployessError("Employee creation failed."));
    }
  };

  const removeEmployee = async (id) => {
    console.log(id)
    dispatch(deleteEmployeeRequest(id));
    const res = await deleteUser(id);
    if (res.status === 200) {
      dispatch(deleteEmployeeSuccess(id));
    } else {
      dispatch(deleteEmployeeError("Employee creation failed."));
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        stateEmp,
        dispatch,
        addEmployee,
        updateEmployees,
        removeEmployee,
        getEmployee,
        getidEmployee,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
