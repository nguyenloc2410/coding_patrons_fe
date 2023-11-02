import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../api/userApi";
import "./registerPage.scss";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  logInStart,
  logInSuccess,
  logInFail,
} from "../../redux/userRedux/userSlice";

const RegisterPage = () => {
  const navigates = useNavigate();
  const dispatch = useDispatch();

  const [userData, setuserData] = useState({});
  const { loading } = useSelector((state) => state.user);

  let defaultValid = {
    isValidEmail: false,
    isValidPassword: false,
    isValidConfirmPassword: false,
  };
  const [valid, setValid] = useState(defaultValid);

  const registerFail = () => {
    setTimeout(() => {
      dispatch(logInFail());
    }, "500");
  };

  const checkValid = () => {
    dispatch(logInStart());
    setValid(defaultValid);
    if (!userData.email) {
      setValid({ ...defaultValid, isValidEmail: true });
      registerFail();
      return false;
    }
    if (!userData.password) {
      setValid({ ...defaultValid, isValidPassword: true });
      registerFail();
      return false;
    }
    if (!userData.confirmpassword) {
      setValid({ ...defaultValid, isValidConfirmPassword: true });
      registerFail();
      return false;
    }
    if (userData.password !== userData.confirmpassword) {
      setValid({ ...defaultValid, isValidConfirmPassword: true });
      registerFail();
      return false;
    }
    return true;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const check = checkValid();
    if (check) {
      const res = await signUp(userData);
      console.log(res);
      if (res.EC !== -1) {
        toast.success(res.EM);
        dispatch(logInSuccess(res.DT));
        navigates("/main");
      } else {
        toast.warning(res.EM);
        registerFail();
        setValid({ ...defaultValid, isValidEmail: true });
      }
    }
  };

  const handleBackHome = () => {
    navigates("/");
  };

  const handleChange = (e) => {
    setuserData({ ...userData, [e.target.id]: e.target.value });
  };

  return (
    <>
      <div className="body">
        <div className="overlay"></div>
        <div className="main_form d-flex justify-content-center align-items-center container">
          <div className="form_total">
            <form>
              <div className="title">
                <h1>Register</h1>
              </div>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  onChange={(e) => handleChange(e)}
                  type="email"
                  className={
                    valid.isValidEmail
                      ? "form-control form-control-lg is-invalid   "
                      : "form-control form-control-lg "
                  }
                  id="email"
                />
                <div
                  id="validationServer04Feedback"
                  className="invalid-feedback"
                >
                  Please enter an email.
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  onChange={(e) => handleChange(e)}
                  type="password"
                  className={
                    valid.isValidPassword
                      ? "form-control form-control-lg is-invalid"
                      : "form-control form-control-lg "
                  }
                  id="password"
                />
                <div
                  id="validationServer04Feedback"
                  className="invalid-feedback"
                >
                  Please enter a password.
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                  onChange={(e) => handleChange(e)}
                  type="password"
                  className={
                    valid.isValidConfirmPassword
                      ? "form-control form-control-lg is-invalid"
                      : "form-control form-control-lg "
                  }
                  id="confirmpassword"
                />
                <div
                  id="validationServer04Feedback"
                  className="invalid-feedback"
                >
                  Please enter a right confirm password.
                </div>
              </div>
              <div className="form_footer d-flex justify-content-center">
                <button
                  disabled={loading}
                  onClick={(e) => handleSignUp(e)}
                  type="submit"
                  className="btn login_btn me-5"
                >
                  {loading ? "Loading" : "Create Account"}
                </button>
                <button
                  onClick={(e) => handleBackHome(e)}
                  type="submit"
                  className="btn home_btn"
                >
                  HOME
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default RegisterPage;
