import "./_header.scss";
import logo from "./../../assets/geniearabia.webp";
import { CgMenuMotion } from "react-icons/cg";
import { CgMenuLeftAlt } from "react-icons/cg";
import { Button } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCollapse } from "../../store/Slices/SettingSlice";
import { CiLogin } from "react-icons/ci";
import { userLogout } from "../../store/Slices/UserSlice";
import { useNavigate } from "react-router-dom";
import { currentPage, formatText } from "../../helpers/helpers";
import Cookies from "js-cookie";
function Header() {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const handleCollapse = () => {
    dispatch(setCollapse(!collapsed));
    setCollapsed(() => !collapsed);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("token");
    dispatch(userLogout());
    navigate("/");
  };

  return (
    <div className="header">
      <div className="sidebar-head">
        <div className="side-left">
          <img src={logo} alt="" />
        </div>
        <Button type="primary" onClick={handleCollapse}>
          {collapsed ? <CgMenuMotion /> : <CgMenuLeftAlt />}
        </Button>
      </div>
      <div className="page-name">
        <h2>{formatText(currentPage())}</h2>
      </div>
      <div className="logout-cont" onClick={handleLogout}>
        <p>Logout</p>
        <CiLogin />
      </div>
    </div>
  );
}

export default Header;
