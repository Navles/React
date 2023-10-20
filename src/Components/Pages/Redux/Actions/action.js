import * as Types from "../../../Types/Types";

export const postdata = (data) => {
  return {
    type: Types.CREATE_SUCCESS,
    payload: data,
  };
};

export const getData = () => {
  return {
    type: Types.GET_SUCCESS,
  };
};

export const getiddata = (id) => {
  return {
    type: Types.GETID_SUCCESS,
    payload: id,
  };
};
export const updatedata = (data) => {
  return {
    type: Types.UPDATE_SUCCESS,
    payload: data,
  };
};

export const deletedata = (data) => {
  return {
    type: Types.DELETE_SUCCESS,
    payload: data,
  };
};
