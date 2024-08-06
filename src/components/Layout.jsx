import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import { Flex } from "antd";
import { useEffect } from "react";
import Cookies from "js-cookie";

function Layout() {
  const navigate = useNavigate();
  useEffect(() => {
    !Cookies?.get('token') && navigate("/");
  }, []);

  return (
    <div>
      <Header />
      {/* <div
        className="main"
        style={{
          display: "flex",
          gap:"50px",
          width:"100vw"
          // justifyContent: "center",
        }}
      > */}
      <Sidebar />
      <Outlet />
      {/* </div> */}
      <Footer />
    </div>
  );
}

export default Layout;
