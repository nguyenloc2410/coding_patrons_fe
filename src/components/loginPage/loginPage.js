import "./loginPage.scss";
import { useNavigate } from "react-router-dom";
import { logIn } from "../../api/userApi";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GoogleAuth from "../googleAuth/googleAuth";
import {
  logInStart,
  logInSuccess,
  logInFail,
} from "../../redux/userRedux/userSlice";

const LoginPage = () => {
  const navigates = useNavigate();
  const dispatch = useDispatch();
  const [userData, setuserData] = useState({});
  const { loading } = useSelector((state) => state.user);
  const { is_Authentic } = useSelector((state) => state.user);

  useEffect(() => {
    if (is_Authentic) {
      navigates("/main");
    }
  });

  const logInFailure = () => {
    setTimeout(() => {
      dispatch(logInFail());
    }, "500");
  };

  let defaultValid = {
    isValidEmail: false,
    isValidPassword: false,
  };
  const [valid, setValid] = useState(defaultValid);

  const checkValid = () => {
    setValid(defaultValid);
    if (!userData.email) {
      setValid({ ...defaultValid, isValidEmail: true });
      logInFailure();
      return false;
    }
    if (!userData.password) {
      setValid({ ...defaultValid, isValidPassword: true });
      logInFailure();
      return false;
    }
    return true;
  };

  const handleSignIn = async (e) => {
    dispatch(logInStart());
    e.preventDefault();
    if (checkValid()) {
      const res = await logIn(userData);
      if (res.EC === 0) {
        toast.success(res.EM);
        dispatch(logInSuccess(res.DT));
        return navigates("/main");
      } else {
        logInFailure();
        toast.warning(res.EM);
      }
    }
  };

  const handleChange = (e) => {
    setuserData({ ...userData, [e.target.id]: e.target.value });
  };

  const handleBackHome = () => {
    navigates("/");
  };
  return (
    <>
      <div className="body">
        <div className="overlay"></div>
        <div className="main_form d-flex justify-content-center align-items-center container">
          <div className="form_total">
            <form>
              <div className="title">
                <h1>Login</h1>
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className={
                    valid.isValidEmail
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  id="email"
                  onChange={(e) => handleChange(e)}
                />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className={
                    valid.isValidPassword
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  id="password"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="form_footer d-flex justify-content-center">
                <button
                  disabled={loading}
                  onClick={(e) => handleSignIn(e)}
                  type="submit"
                  className="btn me-5 login_btn"
                >
                  {loading ? "Loading..." : "Log In"}
                </button>
                <button
                  onClick={(e) => handleBackHome(e)}
                  type="submit"
                  className="btn home_btn"
                >
                  HOME
                </button>
              </div>
              <div className="d-flex justify-content-center mt-4">
                <GoogleAuth></GoogleAuth>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default LoginPage;
