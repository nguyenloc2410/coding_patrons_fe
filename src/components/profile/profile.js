import "./profile.scss";
import { useSelector, useDispatch } from "react-redux";
import { Update, logOut } from "../../api/userApi";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  updateStart,
  updateSuccess,
  updateFail,
  logOutStart,
  logOutSuccess,
  logOutFail,
} from "../../redux/userRedux/userSlice";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";

const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const { googleAuth } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [percent, setPercent] = useState(0);
  const [progressTitle, setprogressTitle] = useState(false);
  const [errorProgressTitle, setErrorProgressTitle] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userDataChange, setuserDataChange] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: "",
    avatar: currentUser.avatar,
  });

  const handleFileUpload = (file) => {
    setprogressTitle(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPercent(Math.round(progress));
      },
      (error) => {
        setErrorProgressTitle(true);
        setprogressTitle(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setuserDataChange({ ...userDataChange, avatar: downloadURL });
          setprogressTitle(false);
          setErrorProgressTitle(false);
        });
      }
    );
  };

  const handleUpLoadStatus = (e) => {
    e.preventDefault();
    navigate("/uploadstatus");
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleChange = (e) => {
    setuserDataChange({ ...userDataChange, [e.target.id]: e.target.value });
    console.log(userDataChange);
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    dispatch(updateStart());
    const res = await Update(userDataChange);
    if (res.EC === 0) {
      toast.success(res.EM);
      dispatch(updateSuccess(res.DT));
    } else {
      toast.warning(res.EM);
      dispatch(updateFail(res.DT));
    }
  };

  const handleLogOut = async (e) => {
    e.preventDefault();
    dispatch(logOutStart());
    const res = await logOut();
    if (res.EC === 0) {
      dispatch(logOutSuccess());
      navigate("/");
    } else {
      dispatch(logOutFail());
    }
  };
  return (
    <>
      <div id="body">
        <div className="main_form d-flex justify-content-center align-items-center container">
          <div className="form_total">
            <form>
              <div className="title">
                <h1>Profile</h1>
                <input
                  onChange={(e) => setFile(e.target.files[0])}
                  type="file"
                  ref={fileRef}
                  hidden
                ></input>
                <img
                  onClick={() => fileRef.current.click()}
                  id="avatar"
                  src={userDataChange.avatar || currentUser.avatar}
                  alt="avatar"
                ></img>
                {progressTitle ? (
                  <p id="title_progress">Loading on {percent}</p>
                ) : errorProgressTitle ? (
                  <p id="title_progress_error">
                    Error loading picture oversize
                  </p>
                ) : (
                  <></>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control form-control-lg "
                  id="username"
                  value={userDataChange.username}
                  onChange={(e) => handleChange(e)}
                />
                <div
                  id="validationServer04Feedback"
                  className="invalid-feedback"
                >
                  Please enter a username.
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="text"
                  className="form-control form-control-lg "
                  id="email"
                  disabled
                  value={userDataChange.email}
                />
                <div
                  id="validationServer04Feedback"
                  className="invalid-feedback"
                >
                  Please enter an email.
                </div>
              </div>
              {googleAuth ? (
                <></>
              ) : (
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control form-control-lg "
                    id="password"
                    onChange={(e) => handleChange(e)}
                  />
                  <div
                    id="validationServer04Feedback"
                    className="invalid-feedback"
                  >
                    Please enter a right password.
                  </div>
                </div>
              )}
              <div className="form_footer d-flex justify-content-center">
                <button
                  onClick={(e) => handleUpdate(e)}
                  type="submit"
                  className="btn login_btn me-5"
                >
                  Update
                </button>
                <button
                  type="submit"
                  className="btn home_btn me-5"
                  onClick={(e) => handleLogOut(e)}
                >
                  Log Out
                </button>
                <button
                  type="submit"
                  className="btn upload_status_btn me-5"
                  onClick={(e) => handleUpLoadStatus(e)}
                >
                  UpLoad Status
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
