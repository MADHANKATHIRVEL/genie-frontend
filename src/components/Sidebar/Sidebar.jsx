import "./_sidebar.scss";
import { Menu } from "antd";

import { CiUser } from "react-icons/ci";
import {
  ContainerOutlined,
  DesktopOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { currentPage, formatText } from "../../helpers/helpers";
function Sidebar() {
  const { settings } = useSelector((state) => state.settings);
  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState(1);
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem("Dashboard", "1", <PieChartOutlined />),
    getItem("Orders", "2", <DesktopOutlined />),
    getItem("Products", "3", <ContainerOutlined />),
    getItem("Users", "4", <CiUser />),
    // getItem("Navigation One", "sub1", <MailOutlined />, [
    //   getItem("Option 5", "5"),
    //   getItem("Option 6", "6"),
    //   getItem("Option 7", "7"),
    //   getItem("Option 8", "8"),
    // ]),
    // getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
    //   getItem("Option 9", "9"),
    //   getItem("Option 10", "10"),
    //   getItem("Submenu", "sub3", null, [
    //     getItem("Option 11", "11"),
    //     getItem("Option 12", "12"),
    //   ]),
    // ]),
  ];
  const handleClick = (e) => {
    const value = items.find((item) => item.key === e.key);
    setSelectedPage(() => e.key);
    navigate(`/${value.label.toLowerCase()}`);
  };

  useEffect(() => {
    const current_page = currentPage();
    let search = items.find((item) => {
      item.label === formatText(current_page);
    });
    let key;
    // console.log(search,"key")
    if (search === undefined) {
      console.log(current_page,"inif");
      if (current_page === "order_detail") {
        key = 2;
      }
    } else {
      key = search.key;
    }
    console.log(key);
    setSelectedPage(() => key);
  }, []);

  return (
    <div className="sidebar">
      <Menu
        defaultSelectedKeys={[selectedPage]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        inlineCollapsed={settings.collapsed}
        items={items}
        onClick={handleClick}
      />
    </div>
  );
}

export default Sidebar;
