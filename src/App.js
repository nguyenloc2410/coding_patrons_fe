import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import AppRoutes from "./routes/appRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "./components/navbar/navbar";
import { useSelector } from "react-redux/es/hooks/useSelector";

function App() {
  const { is_Authentic } = useSelector((state) => state.user);
  return (
    <>
      <BrowserRouter>
        {is_Authentic ? <Nav></Nav> : <></>}
        <AppRoutes></AppRoutes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
