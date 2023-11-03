import { Routes, Route } from "react-router-dom";
import WelcomePage from "../components/welcomePage/welcomePage";
import LoginPage from "../components/loginPage/loginPage";
import RegisterPage from "../components/registerPage/registerPage";
import MainPage from "../components/mainPage/mainPage";
import PrivateRoute from "../components/privateRoute/privateRoute";
import Profile from "../components/profile/profile";
import UpLoadStatus from "../components/upLoadStatus/upLoadStatus";

const AppRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<WelcomePage></WelcomePage>}></Route>
      <Route exact path="/login" element={<LoginPage></LoginPage>}></Route>
      <Route
        exact
        path="/register"
        element={<RegisterPage></RegisterPage>}
      ></Route>
      <Route element={<PrivateRoute />}>
        <Route exact path="/main" element={<MainPage></MainPage>}></Route>
        <Route exact path="/profile" element={<Profile></Profile>}></Route>
        <Route
          exact
          path="/uploadstatus"
          element={<UpLoadStatus></UpLoadStatus>}
        ></Route>
      </Route>
      <Route exact path="*" element={"404 NOT FOUND"}></Route>
    </Routes>
  );
};
export default AppRoutes;
