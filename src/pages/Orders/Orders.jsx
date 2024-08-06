import React, { useEffect, useState } from "react";
import "./_orders.scss";
import { useSelector } from "react-redux";
import Tables from "../../components/BaseComponents/Table/Tables";
import { Button, Card, Modal, Tag } from "antd";
import { getApiCall, putApiCall } from "../../helpers/apiServices";
import { capitalize, getParams } from "../../helpers/helpers";
import { CiEdit } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Orders() {
  const { settings } = useSelector((state) => state.settings);
  const [orders, setOrders] = useState([]);
  const [filters, setFilters] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();
  const onchangeModal = async () => {
    setModalOpen(false);
    await putApiCall("orders/change_status/" + selectedOrder, {
      status: selectedStatus,
    });
  };
  useEffect(() => {
    setPage(() => 1);
    const params = getParams(filters);
    const getOrders = async () => {
      const response = await getApiCall("orders");
      const OrderCount = await getApiCall(
        "orders/count?" + params + `page=${page}&limit=${limit}`
      );
      setTotal(OrderCount.data.count);
      setOrders(() =>
        response?.data?.data?.map((item) => ({
          name: item?.user_id?.firstname + item?.user_id?.lastname,
          orderdata: item,
          order_id: item?._id,
          total: item?.total + "(AED)",
          payment_method: item?.payment_method,
          status: {
            tag: capitalize(item?.status),
            id: item._id,
          },
          action: item._id,
        }))
      );
    };
    getOrders();
  }, [filters]);
  useEffect(() => {
    const params = getParams(filters);
    console.log(filters, params);
    const getOrders = async () => {
      const response = await getApiCall(
        "orders?" + params + `page=${page}&limit=${limit}`
      );
      setOrders(() =>
        response?.data?.data?.map((item) => ({
          name: item?.user_id?.firstname + item?.user_id?.lastname,
          orderdata: item,
          order_id: item?._id,
          total: item?.total + "(AED)",
          payment_method: item?.payment_method,
          status: {
            tag: capitalize(item?.status),
            id: item._id,
          },
          action: item._id,
        }))
      );
    };
    getOrders();
  }, [page, limit]);

  const columns = [
    {
      title: "Order_ID",
      dataIndex: "order_id",
      key: "order_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Payment Method",
      dataIndex: "payment_method",
      key: "payment_method",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        {
          text: "Pending",
          value: "pending",
        },
        {
          text: "Shipped",
          value: "shipped",
        },
        {
          text: "Delivered",
          value: "delivered",
        },
        {
          text: "Cancelled",
          value: "cancelled",
        },
      ],
      render: (data) => {
        return (
          <>
            <Tag>{data.tag}</Tag>
            {/* <CiEdit onClick={() => setModalOpen(true)} /> */}
          </>
        );
      },
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (data) => {
        return (
          <>
            <Button
              className="view-btn"
              onClick={() => navigate("/order_detail/" + data)}
            >
              <FaEye />
            </Button>
            {/* <CiEdit onClick={() => setModalOpen(true)} /> */}
          </>
        );
      },
    },
  ];
  const onChangeFilter = (pagination, filters, sorter, extra) => {
    setFilters(() => filters);
  };
  return (
    <div
      className="orders"
      style={{
        marginLeft: settings.collapsed ? "8%" : "15%",
        // width: settings.collapsed ? "calc(100vw - 20%)" : "calc(100vw - 40%)",
      }}
    >
      <Card style={{ width: "100%" }}>
        <Tables
          column={columns}
          data={orders}
          actions={() => onChangeFilter()}
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
      <Modal
        title="Alert : Changes Might Affect Properties View Page "
        centered
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        okText={"Change Status"}
        onOk={() => onchangeModal()}
      >
        <div className="btn-grid">
          <Button
            className={selectedStatus == "pending" && "selected-status"}
            onClick={() => setSelectedStatus("pending")}
          >
            Pending
          </Button>

          <Button
            className={selectedStatus == "shipped" && "selected-status"}
            onClick={() => setSelectedStatus("shipped")}
          >
            Shipped
          </Button>
          <Button
            className={selectedStatus == "delivered" && "selected-status"}
            onClick={() => setSelectedStatus("delivered")}
          >
            Delivered
          </Button>
          <Button
            className={selectedStatus == "cancelled" && "selected-status"}
            onClick={() => setSelectedStatus("cancelled")}
          >
            cancelled
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default Orders;
