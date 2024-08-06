import React, { useEffect, useState } from "react";
import "./_login.scss";
import { Button, Card, Input } from "antd";
import { IoMailOutline } from "react-icons/io5";
import { LuKeyRound } from "react-icons/lu";
import { postApiCall } from "../../helpers/apiServices";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import logo from "./../../assets/genie-arabia-light-version.png";
import { userlogin } from "../../store/Slices/UserSlice";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    Cookies.get("token") && navigate("/dashboard");
  }, []);
  const SubmitLogin = async () => {
    const response = await postApiCall("users/admin_login", {
      email: email,
      password: password,
    });
    if (response?.data?.status) {
      toast.success("Login Successfully");
      dispatch(userlogin(response?.data?.data));
      Cookies.set("token", response.data.token, { expires: 1 });
      navigate("/dashboard");
    }
  };
  return (
    <div className="login">
      <Card className="login-card">
        <div className="logo-section">
          <img src={logo} />
        </div>
        <Input
          value={email}
          placeholder={"Username"}
          onChange={(e) => setEmail(e.target.value)}
          prefix={
            <IoMailOutline style={{ fontSize: "18px", marginRight: "5px" }} />
          }
        />
        <Input.Password
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          prefix={
            <LuKeyRound style={{ fontSize: "18px", marginRight: "5px" }} />
          }
        />
        <Button onClick={SubmitLogin}>Login</Button>
      </Card>
    </div>
  );
}

export default Login;
