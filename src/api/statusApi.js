import axios from "../configs/axios";
const uploadStatus = (statusData) => {
  return axios.post("/status/api/upload", statusData);
};
const getPostList = () => {
  return axios.get("/status/api/getpostlist");
};

const likeStatus = (userId) => {
  return axios.post("/status/api/likestatus", userId);
};

const commentStatus = (data) => {
  return axios.post("/status/api/commentstatus", data);
};
export { uploadStatus, getPostList, likeStatus, commentStatus };
