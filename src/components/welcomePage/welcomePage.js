import "./welcomePage.scss";
import cheflogo from "../../assets/chef.jpg";
import hilllogo from "../../assets/hill.jpeg";
import p6logo from "../../assets/p6.jpg";
import rocklogo from "../../assets/rocks.jpg";
import sailboatlogo from "../../assets/sailboat.jpg";
import weddinglogo from "../../assets/wedding.jpg";
import sealogo from "../../assets/underwater.jpg";
import Slider from "../slider/slider";
import user1 from "../../assets/minhquan.jpg";
import user2 from "../../assets/baolam.jpg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const WelcomePage = () => {
  const navigates = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const directToLogin = () => {
    navigates("/login");
  };
  const directToRegister = () => {
    navigates("/register");
  };
  useEffect(() => {
    if (currentUser) {
      navigates("/main");
    }
  });
  return (
    <div>
      <div className="row mx-0 container_main">
        <div className="content_left px-0 col-md-5 ">
          <div className="description d-block d-sm-none ">
            <h1>Coding Patrons</h1>
            <span>Just simple a Developer</span>
          </div>
          <Slider></Slider>
          <button
            onClick={() => directToLogin()}
            className="Login_btn btn-secondary d-block d-sm-none"
          >
            Log In
          </button>
          <button
            onClick={() => directToRegister()}
            className="register_btn btn-secondary d-block d-sm-none"
          >
            Register
          </button>
        </div>
        <div className="content_right col-md-7 px-0">
          <div className="description_bg d-sm-flex align-items-center gap-3 flex-column d-none d-sm-block">
            <h1>Coding Patrons</h1>
            <span>Just simple a Developer</span>
            <div className="action_btn">
              <button
                onClick={() => directToLogin()}
                className="Login_btn btn-secondary me-5"
              >
                Log In
              </button>
              <button
                onClick={() => directToRegister()}
                className="register_btn btn-secondary"
              >
                Register
              </button>
            </div>
          </div>
          <div className="row mx-0 ">
            <div className="content_main col-11 mx-auto px-0">
              <h1>My Portfolio</h1>
              <div className="picture d-flex ">
                <div className="row picture_row">
                  <div className="picture_half d-flex flex-column gap-3 mx-0 col-sm-6">
                    <img src={weddinglogo} alt="picture_portfolio"></img>
                    <img src={rocklogo} alt="picture_portfolio"></img>
                    <img src={sailboatlogo} alt="picture_portfolio"></img>
                  </div>
                  <div className="picture_half d-flex flex-column gap-3 mx-0 col-sm-6 mt-3 mt-sm-0">
                    <img src={sealogo} alt="picture_portfolio"></img>
                    <img src={cheflogo} alt="picture_portfolio"></img>
                    <img src={hilllogo} alt="picture_portfolio"></img>
                    <img src={p6logo} alt="picture_portfolio"></img>
                  </div>
                </div>
              </div>
              <div className="about mt-5">
                <h1>About</h1>
                <span className="descript">
                  Some text about me. Some text about me. I am lorem ipsum
                  consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                  ea commodo consequat. Duis aute irure dolor in reprehenderit
                  in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                  in culpa qui officia deserunt mollit anim id est laborum
                  consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                  ea commodo consequat.
                </span>
              </div>
              <div className="my_skill mt-5">
                <h1>My skill</h1>
                <div className="percent_skill">
                  <div>Reactjs</div>
                  <div className="skill_total mb-5">
                    <div className="skill_1">90%</div>
                  </div>
                  <div>JavaScript</div>
                  <div className="skill_total mb-5">
                    <div className="skill_2">85%</div>
                  </div>
                  <div>Nodejs</div>
                  <div className="skill_total mb-5">
                    <div className="skill_3">70%</div>
                  </div>
                </div>
              </div>
              <div className="my_reputation mt-5">
                <h1>My Reputation</h1>
                <div className="person d-flex align-items-center mb-3">
                  <div className="avatar">
                    <img src={sealogo} alt="avatar"></img>
                  </div>
                  <div className="bio">
                    <div className="name_person">Nguyen Tan Loc </div>
                    <p>Leader</p>
                    <p>HCMUS_TPHCM</p>
                  </div>
                </div>
                <div className="person d-flex align-items-center mb-3">
                  <div className="avatar">
                    <img src={user1} alt="avatar"></img>
                  </div>
                  <div className="bio">
                    <div className="name_person">Nguyen Ngoc Minh Quan </div>
                    <p>Member</p>
                    <p>HCMUS_TPHCM</p>
                  </div>
                </div>
                <div className="person d-flex align-items-center">
                  <div className="avatar">
                    <img src={user2} alt="avatar"></img>
                  </div>
                  <div className="bio">
                    <div className="name_person">Nguyen Ngoc Bao Lam</div>
                    <p>Member</p>
                    <p>HCMUS_TPHCM</p>
                  </div>
                </div>
              </div>
              <div className="contact_me mt-5 d-flex flex-column align-items-center">
                <h1>Contact Me</h1>
                <div className="information">
                  <i className="fa-solid fa-location-dot"></i>
                  HO CHI MINH CITY
                </div>
                <div className="information">
                  <i className="fa-solid fa-phone"></i>
                  Phone: +84 07777777
                </div>
                <div className="information">
                  <i className="fa-solid fa-envelope"></i>
                  Email: codingpatrons@mail.com
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WelcomePage;
