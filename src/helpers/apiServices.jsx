import { notification } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

// const baseUrl = "http://localhost:8000/api/";
const baseUrl = "https://backend.geniearabia.com/api/";
const headers = {
  headers: {
    authorization: `Bearer ${Cookies?.get("token")}`,
  },
};
export const getApiCall = async (url) => {
  try {
    const res = await axios.get(baseUrl + url, headers);
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const postApiCall = async (url, payload) => {
  try {
    const res = await axios.post(baseUrl + url, payload, headers);
    return res;
  } catch (error) {
    console.error(error.response?.data?.message);
    notification.error({
      message: error.response?.data?.message,
    });
    throw error;
  }
};
export const putApiCall = async (url, payload) => {
  try {
    const res = await axios.put(baseUrl + url, payload, headers);
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const deleteApiCall = async (url) => {
  try {
    const res = await axios.delete(baseUrl + url, {}, headers);
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
