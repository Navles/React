import axios from "axios";

export const API_URL = "https://6529348755b137ddc83e6148.mockapi.io/data/";

export const createUser = async (userdata) => {
  try {
    const response = await axios.post(API_URL, userdata);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id, userdata) => {
  try {
    const response = await axios.put(API_URL + id, userdata);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getUser = async (id) => {
  try {
    const response = await axios.get(API_URL + id);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(API_URL + id);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response;
  } catch (e) {
    // logging.error(e)
    throw e;
  }
};
