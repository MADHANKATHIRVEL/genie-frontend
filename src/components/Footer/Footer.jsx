import { useDispatch, useSelector } from "react-redux";
import "./_footer.scss";

function Footer() {
  const { settings } = useSelector((state) => state.settings);
  return (
    <div className="footer">
      <div
        className="content"
        style={{
          width: settings.collapsed ? "90%" : "80%",
          // width: settings.collapsed ? "calc(100vw - 20%)" : "calc(100vw - 40%)",
        }}
      >
        <p>&copy;2023-2024 Genie Arabia, All rights Reserved - </p>
        <p>Powered By AVANEXA</p>
      </div>
    </div>
  );
}

export default Footer;
