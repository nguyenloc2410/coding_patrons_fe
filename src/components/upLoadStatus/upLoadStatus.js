import { useEffect, useRef, useState } from "react";
import "./upLoadStatus.scss";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../firebase";

const UpLoadStatus = () => {
  const [upLoading, setUpLoading] = useState(false);
  const [errorLoading, setErrorLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [file, setFile] = useState([]);
  const [precent, setPrecent] = useState(0);
  const [formData, setformData] = useState({
    describe: "",
    imageURLS: [],
  });
  const handleImageUpLoad = (e) => {
    setErrorLoading(false);
    e.preventDefault();
    if (file.length > 0 && file.length < 7) {
      setUpLoading(true);
      const promises = [];
      for (let i = 0; i < file.length; i++) {
        promises.push(storeImage(file[i]));
      }

      Promise.all(promises).then((url) => {
        setformData({ ...formData, imageURLS: formData.imageURLS.concat(url) });
        setUpLoading(false);
      });
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPrecent(Math.round(progress));
        },
        (error) => {
          setErrorLoading(true);
          setUpLoading(false);
          setErrorMessage("Your image or video is oversize");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleChange = (e) => {
    setformData({ ...formData, describe: e.target.value });
  };

  const handleDelteImage = (indexImage) => {
    setformData({
      ...formData,
      imageURLS: formData.imageURLS.filter((url, index) => index != indexImage),
    });
  };
  useEffect(() => {
    const textArea = document.getElementById("describe");
    if (textArea !== null) {
      textArea.addEventListener("input", (e) => {
        textArea.style.height = "130px";
        textArea.style.height = textArea.scrollHeight + "px";
      });
    }
  }, []);
  return (
    <>
      <div id="body">
        <div className="container d-flex justify-content-center">
          <form id="main_form">
            <h1>Upload Status</h1>
            <hr></hr>
            <textarea
              onChange={(e) => handleChange(e)}
              value={formData.describe}
              required
              id="describe"
              resize="true"
            ></textarea>
            <hr></hr>
            {upLoading ? (
              <p style={{ color: "green" }}>Loading on {precent}%</p>
            ) : (
              <></>
            )}
            {errorLoading ? (
              <p style={{ color: "red" }}>{errorMessage}</p>
            ) : (
              <></>
            )}
            {formData.imageURLS.length ? (
              <div className="image_video_content mb-5 d-flex justify-content-center">
                {formData.imageURLS.map((url, index) => (
                  <div key={url}>
                    <div id="image_container">
                      <img key={url} className="image_items" src={url}></img>
                      <div className="close_btn_image my-3">
                        <button
                          onClick={() => handleDelteImage(index)}
                          type="button"
                          className="btn btn-danger"
                          style={{ borderRadius: "20px" }}
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <></>
            )}
            <div id="image_storage">
              <div className="row">
                <div className="btn mb-3 col-sm-6">
                  <input
                    onChange={(e) => setFile(e.target.files)}
                    type="file"
                    style={{ width: 250 + "px" }}
                    multiple
                  ></input>
                </div>
                <div className="col-sm-6">
                  <button
                    className="btn btn-primary mb-3"
                    type="button"
                    onClick={(e) => handleImageUpLoad(e)}
                  >
                    Add image or video into your posts
                  </button>
                </div>
              </div>
            </div>
            <div id="footer">
              <button className="btn btn-success">Upload</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default UpLoadStatus;
