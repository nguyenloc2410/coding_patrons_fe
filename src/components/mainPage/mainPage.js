import "../mainPage/mainPage.scss";
import { useSelector } from "react-redux/es/hooks/useSelector";
const MainPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      <div className="body_mainpage">
        <div className="body_intro">
          <div className="main_wallpaper"></div>
          <div className="main_introduction">
            <h1>Check this out</h1>
          </div>
        </div>
        <div className="main_content"></div>
      </div>
    </>
  );
};
export default MainPage;
