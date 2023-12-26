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
import detect1 from "../../assets/756ab701-3f0c-465a-89d2-e21d02bb7446.jpg"
import detect2 from "../../assets/4328654e-9a84-4343-9e80-cacf76bbe0f3.jpg"
import detect3 from "../../assets/code1.jpg"
import detect4 from "../../assets/code2.jpg"
import detect5 from "../../assets/mophong1.jpg"
import detect6 from "../../assets/mophong2.jpg"
import detect7 from "../../assets/code3.jpg"
import detect8 from "../../assets/code4.jpg"
import loc from "../../assets/Screenshot 2023-12-08 002221.png"
import lam from "../../assets/BaoLam_21207177.jpg"
import quan from "../../assets/MinhQuan_21207205.jpg"

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
            <span>Just simple a Circuit Designer</span>
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
            <h1>Dien Tu Vien Thong</h1>
            <span>Just simple a Circuit Designer</span>
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
                    <img src={detect5} alt="picture_portfolio"></img>
                    <img src={detect4} alt="picture_portfolio"></img>
                    <img src={detect6} alt="picture_portfolio"></img>
                    <img src={detect6} alt="picture_portfolio"></img>
                    <img src={detect8} alt="picture_portfolio"></img>
                  </div>
                  <div className="picture_half d-flex flex-column gap-3 mx-0 col-sm-6 mt-3 mt-sm-0">
                    <img src={detect3} alt="picture_portfolio"></img>
                    <img src={detect1} alt="picture_portfolio"></img>
                    <img src={detect7} alt="picture_portfolio"></img>
                    <img src={detect2} alt="picture_portfolio"></img>
                  </div>
                </div>
              </div>
              <div className="about mt-5">
                <h1>About</h1>
                <span className="descript">
                  I'm a student at University of Science and just want to know how people out there can build a website, so I just make it for the purpose of studying and posting the electronic knowledge that has been learned as a personal memory. Sumary you can consider this website as my personal little blog.
                  And welcome aboard !!!
                </span>
              </div>
              <div className="my_skill mt-5">
                <h1>My skill</h1>
                <div className="percent_skill">
                  <div>Basic/Digital Electronic</div>
                  <div className="skill_total mb-5">
                    <div className="skill_1">70%</div>
                  </div>
                  <div>C/C++</div>
                  <div className="skill_total mb-5">
                    <div className="skill_2">85%</div>
                  </div>
                  <div>Verilog</div>
                  <div className="skill_total mb-5">
                    <div className="skill_3">50%</div>
                  </div>
                </div>
              </div>
              <div className="my_reputation mt-5">
                <h1>My Team</h1>
                <div className="person d-flex align-items-center mb-3">
                  <div className="avatar">
                    <img src={loc} alt="avatar"></img>
                  </div>
                  <div className="bio">
                    <div className="name_person">Nguyen Tan Loc </div>
                    <p>Leader</p>
                    <p>HCMUS_TPHCM</p>
                  </div>
                </div>
                <div className="person d-flex align-items-center mb-3">
                  <div className="avatar">
                    <img src={quan} alt="avatar"></img>
                  </div>
                  <div className="bio">
                    <div className="name_person">Nguyen Ngoc Minh Quan </div>
                    <p>Member</p>
                    <p>HCMUS_TPHCM</p>
                  </div>
                </div>
                <div className="person d-flex align-items-center">
                  <div className="avatar">
                    <img src={lam} alt="avatar"></img>
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
                  Phone: +84 704620854
                </div>
                <div className="information">
                  <i className="fa-solid fa-envelope"></i>
                  Email: tanlocnguyen2410@gmail.com
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
