import { NavLink } from "react-router-dom";
import "../navbar/navbar.scss";
import logo from "../../assets/logo.png";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useEffect, useRef } from "react";
import $ from "jquery";

const Navbar = () => {
  const refOut = useRef(null);
  const refProfile = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (refOut.current != null) {
        if (!refOut.current.contains(e.target)) {
          const _opened = $(".navbar-collapse").hasClass(
            "navbar-collapse collapse show"
          );
          if (_opened === true) {
            $(".navbar-toggler").trigger("click");
          }
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg container" ref={refOut}>
      <div className="container">
        <NavLink to="/main" className="navbar-brand mx-0">
          <div className="logo_coding">
            <img className="logo_home" src={logo} alt="logo"></img>
          </div>
          <span>Coding Patrons </span>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMain"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarMain">
          <ul className="nav navbar-nav">
            <li className="nav-item">
              <NavLink to="/profile" className="nav-link" ref={refProfile}>
                Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/project" className="nav-link">
                Project
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className="nav-link">
                About
              </NavLink>
            </li>
          </ul>
          <div className="user_detail show1">
            <span>Hi {currentUser.username}</span>
            <img id="avatar_user" src={currentUser.avatar} alt="avatar"></img>
          </div>
        </div>
        <div className="user_detail show2">
          <span>Hi {currentUser.username} </span>
          <img
            id="avatar_user"
            src={currentUser.avatar}
            alt="avatar"
            onClick={() => refProfile.current.click()}
          ></img>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
