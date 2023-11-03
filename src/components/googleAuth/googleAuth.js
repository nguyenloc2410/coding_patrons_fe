import { useDispatch, useSelector } from "react-redux";
import React from "react";
import "./googleAuth.scss";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "@firebase/auth";
import { app } from "../../firebase";
import { logInWithGoogle } from "../../api/userApi";
import {
  logInStart,
  logInGoogleSuccess,
  logInFail,
} from "../../redux/userRedux/userSlice";

const GoogleAuth = () => {
  const { loading } = useSelector((state) => state.user);
  const navigates = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleClick = async () => {
    dispatch(logInStart());
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const userData = {
        username: result.user.displayName,
        email: result.user.email,
        avatar: result.user.photoURL,
      };
      const res = await logInWithGoogle(userData);
      if (res.EC === 0) {
        dispatch(logInGoogleSuccess(res.DT));
        navigates("/main");
      } else {
        dispatch(logInFail());
      }
    } catch (error) {
      console.log(error);
      console.log("could not sign in with google");
    }
  };
  return (
    <>
      <button
        onClick={() => handleGoogleClick()}
        type="button"
        className="btn btn_google"
      >
        {loading ? "Loading" : "Continue with Google"}
      </button>
    </>
  );
};
export default GoogleAuth;
