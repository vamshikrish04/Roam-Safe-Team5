import axios from "axios";

export const serverUrl = "https://roam-safe.co.in/api";
// export const serverUrl = "http://192.168.1.12:80/api";
// export const serverUrl = "http://3.84.98.81/api";
// export const serverUrl = "http://localhost:80/api";

export const postLoginApi = async (endPoint, value) => {
  try {
    const postRes = await axios.post(serverUrl + endPoint, value);
    return postRes.data;
  } catch (error) {
    return { error };
  }
};

export const getApihandler = async (endPoint) => {
  try {
    const getres = await axios.get(serverUrl + endPoint);
    return getres.data;
  } catch (error) {
    return { error };
  }
};

export const postApihandler = async (endPoint, value) => {
  // console.log("postvalue=>", endPoint);
  // console.log("postvalue=>", value);
  try {
    const postRes = await axios.post(serverUrl + endPoint, value);
    // console.log("apipost=>", postRes);
    return postRes.data;
  } catch (error) {
    return { error };
  }
};
export const deleteApiihandler = async (endPoint, id) => {
  try {
    const deleteRes = await axios.delete(serverUrl + endPoint + id);
    // console.log("apidelete=>", deleteRes);
    return deleteRes.data;
  } catch (error) {
    return { message: error.message, status: 403 };
  }
};
export const deleteParamsApiihandler = async (endPoint) => {
  try {
    const deleteRes = await axios.put(serverUrl + endPoint);
    // console.log("apidelete=>", deleteRes);
    return deleteRes.data;
  } catch (error) {
    return { error };
  }
};
export const putApihandler = async (endPoint, value) => {
  try {
    const res = await axios.put(serverUrl + endPoint, value);
    return res.data;
  } catch (error) {
    return { error };
  }
};
