import axios from "../configs/axios";
const signUp = (userData) => {
  return axios.post("/user/api/signup", userData);
};
const logIn = (userData) => {
  return axios.post("/user/api/login", userData);
};

const logInWithGoogle = (userData) => {
  return axios.post("/user/api/googlelogin", userData);
};

const Update = (userData) => {
  return axios.post("/user/api/update", userData);
};

const logOut = () => {
  return axios.get("/user/api/logout");
};

export { signUp, logIn, logInWithGoogle, Update, logOut };
