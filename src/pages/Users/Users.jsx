import { useEffect, useState } from "react";
import "./_users.scss";
import { useSelector } from "react-redux";
import Tables from "../../components/BaseComponents/Table/Tables";
import { Button, Card, Form, Input, Modal, Tag } from "antd";
import { getApiCall } from "../../helpers/apiServices";
import { getParams } from "../../helpers/helpers";

function Users() {
  const { settings } = useSelector((state) => state.settings);
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({
    type: [],
  });
  const [form] = Form?.useForm();
  const [registerFormData, setRegisterFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    password: "",
    companyname: "",
    tradinglicense: "",
  });
  async function handleRegister() {
    const registerResponse = await apiCallWithoutHeader(
      `/users/register`,
      registerFormData
    );
  }
  function handleChangeInput(e) {
    setRegisterFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }
  useEffect(() => {
    setPage(() => 1);
    const params = getParams(filters);
    const getUsers = async () => {
      const userResponse = await getApiCall(
        "users?" + params + `page=${page}&limit=${limit}`
      );
      const userCount = await getApiCall("users/count?" + params);
      setTotal(userCount.data.count);
      getUserData(userResponse.data);
    };
    getUsers();
  }, [filters]);
  useEffect(() => {
    const params = getParams(filters);
    const getUsers = async () => {
      const userResponse = await getApiCall(
        "users?" + params + `page=${page}&limit=${limit}`
      );
      getUserData(userResponse.data);
    };
    getUsers();
  }, [page, limit]);

  const getUserData = (data) => {
    let res = [];
    data.map((item, index) => {
      res.push({
        key: index,
        name: {
          name: item.firstname + " " + item.lastname,
          image: item.profile,
        },
        mobile: item.mobile,
        email: item.email,
        state: item.state,
        type: item.type,
      });
    });
    setUserData(() => res);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (data) => {
        return (
          <div className="user-cont">
            <div className="profile">
              <img src={data.profile} alt="" />
            </div>
            <div className="name">{data.name}</div>
          </div>
        );
      },
    },
    {
      title: "Role",
      dataIndex: "type",
      key: "type",
      filters: [
        {
          text: "Admin",
          value: "admin",
        },
        {
          text: "User",
          value: "user",
        },
      ],
      render: (data) => {
        return <Tag color={data === "admin" ? "blue" : "green"}>{data}</Tag>;
      },
      // onFilter: (value, record) => {
      //   console.log(value, record, "user");
      //   const role = filters.role;
      //   role.push(value);
      //   setFilters((prevState) => ({ ...prevState, role: role }));
      // },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },

    {
      title: "State",
      dataIndex: "state",
      key: "state",
    },
  ];

  const onChangeFilter = (pagination, filters, sorter, extra) => {
    setFilters(() => filters);
  };

  return (
    <div
      className="users"
      style={{
        marginLeft: settings.collapsed ? "8%" : "15%",
        // width: settings.collapsed ? "calc(100vw - 20%)" : "calc(100vw - 40%)",
      }}
    >
      <Card style={{ width: "100%" }}>
        <Tables
          column={columns}
          data={userData}
          actions={onChangeFilter}
          pagination={{
            total: total,
            current: page,
            onchange: (page_number) => setPage(() => page_number),
            onsizechange: (page, size) => {
              setLimit(() => size);
              setPage(() => 1);
            },
          }}
        />
      </Card>
      {/* <Modal open={true} onCancel={handleCancel}>
        <Form
          form={form}
          onFinish={handleRegister}
          style={{
            gap: "0px",
          }}
        >
          <Form.Item
            name="firstname"
            rules={[
              {
                required: true,
                message: "Please Enter Your First Name",
              },
            ]}
          >
            <Input
              placeholder="First Name"
              name="firstname"
              onChange={handleChangeInput}
            />
          </Form.Item>
          <Form.Item name="lastname">
            <Input
              placeholder="Last Name"
              name="lastname"
              onChange={handleChangeInput}
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please Enter Your Email",
              },
            ]}
          >
            <Input
              placeholder="Email"
              name="email"
              onChange={handleChangeInput}
            />
          </Form.Item>
          <Form.Item
            name="mobile"
            rules={[
              {
                required: true,
                message: "Please Enter Your Mobile Number",
              },
            ]}
          >
            <Input
              placeholder="Mobile Number"
              name="mobile"
              onChange={handleChangeInput}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please Enter Your Password",
              },
            ]}
          >
            <Input.Password
              placeholder="Password"
              name="password"
              onChange={handleChangeInput}
            />
          </Form.Item>
          <Form.Item
            name="companyname"
            rules={[
              {
                required: true,
                message: "Please Enter Your Company Name",
              },
            ]}
          >
            <Input
              placeholder="Company Name"
              name="companyname"
              onChange={handleChangeInput}
            />
          </Form.Item>
          <Form.Item name="tradinglicense">
            <Input
              placeholder="Trading License"
              name="tradinglicense"
              onChange={handleChangeInput}
            />
          </Form.Item>
          <div className="register-btn-container">
            <Button
              type="primary"
              htmlType="submit"
              className="register-btn"
              // loading={apiCall}
            >
              Register
            </Button>
          </div>
        </Form>
      </Modal> */}
    </div>
  );
}

export default Users;
