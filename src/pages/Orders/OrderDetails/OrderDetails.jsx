import React, { useEffect, useState } from "react";
import "./_order_details.scss";
import { Card, Descriptions, Dropdown, Select, Table, Tag } from "antd";
import { FaUserAlt } from "react-icons/fa";
import { getApiCall, putApiCall } from "../../../helpers/apiServices";
import { useParams } from "react-router-dom";
import {
  capitalizeFirstLetter,
  colors,
  getAEDPrice,
} from "../../../helpers/helpers";
import { useSelector } from "react-redux";

function OrderDetails() {
  const [Order, setOrder] = useState({});
  const [status, setStatus] = useState("");
  const { settings } = useSelector((state) => state.settings);
  const { id } = useParams();
  useEffect(() => {
    const getOrder = async () => {
      const orderData = await getApiCall("orders/" + id);
      console.log(orderData.data.data, "orderData");
      setOrder(orderData.data.data);
      setStatus(orderData.data.data.status);
    };
    getOrder();
  }, []);
  let productColumn = [
    {
      title: "Product Details",
      dataIndex: "product_row",
      key: "product_row",
      render: (data) => {
        return (
          <div className="product-row">
            <div className="image-cont">
              <img
                src={
                  data.product_id.variants.find(
                    (item) => item.variant_id === data.variant_id
                  ).digital_assets[0].url
                }
                alt=""
              />
            </div>
            <div className="name-cont">
              {console.log(data, "data")}
              {data.modified && <Tag>Customized Product</Tag>}
              <h3>{data.product_id.master_code}</h3>
              <h5>{data.product_id.product_name}</h5>
              <p>{data._id}</p>
              <a href={data.modified[0].modified_image} target="_blank" download={true}>View Personalized Product</a>        
            </div>
          </div>
        );
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Product Unit Price",
      dataIndex: "unit_price",
      key: "unit_price",
    },
    {
      title: "Product Total Price",
      dataIndex: "total_price",
      key: "total_price",
    },
  ];
  const ProductRow = ({ product }) => {
    const [productDetails, setProductDetails] = useState([]);

    useEffect(() => {
      async function getDetails() {
        const response = await getApiCall(`/products/${product.master_id}`);
        setProductDetails((prevState) => response[0]);
      }
      getDetails();
    }, []);

    let productColumn = [
      {
        title: "Product",
        dataIndex: "product_image",
        key: "product_image",
      },
      {
        title: "Master Code",
        dataIndex: "master_code",
        key: "master_code",
      },
      {
        title: "Product Unit Price",
        dataIndex: "unit_price",
        key: "unit_price",
      },
      {
        title: "Product Total Price",
        dataIndex: "total_price",
        key: "total_price",
      },
    ];

    return (
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <a href={`/product/${productDetails.master_id}`} target="_blank">
          <img
            src={
              productDetails?.variants?.filter(
                (variant) => variant.variant_id == product.variant_id
              )[0].digital_assets[0].url
            }
            height={50}
            width={50}
          />
        </a>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: "5px",
          }}
        >
          {product?.modified?.length > 0 && (
            <Tag className="personalized-product">Personalized Product</Tag>
          )}
          <a
            className="prod-name"
            href={`/product/${productDetails.master_id}`}
            target="_blank"
          >
            {productDetails.product_name}
          </a>
          <a
            className="prod-mc"
            href={`/product/${productDetails.master_id}`}
            target="_blank"
          >
            {productDetails.master_code}
          </a>
          <a
            className="prod-sd"
            href={`/product/${productDetails.master_id}`}
            target="_blank"
          >
            {productDetails.short_description}
          </a>
        </div>
      </div>
    );
  };
  let dataSource = [
    {
      // product: (

      // ),
      total: (
        <span>
          {parseFloat(Order?.total).toFixed(2)} AED
          <br />
          {Order?.products?.map((item) => {
            if (item?.modified) {
              return `(Setup Cost + Printing Cost + Product Price)`;
            }
          })}
        </span>
      ),
      status: (
        <Tag color={colors[Order?.status?.toLowerCase()]}>
          {capitalizeFirstLetter(Order?.status)}
        </Tag>
      ),
      modified: (
        <div>
          {Order?.products?.map((item) => {
            if (item?.modified) {
              return item?.modified?.map((modifiedItem, index) => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <span>
                    Printing Position : {modifiedItem.printing_position}
                  </span>
                  <span>Setup Cost : {modifiedItem.setup_cost} (AED)</span>
                  <span>Priting Cost : {modifiedItem.priting_cost} (AED)</span>
                  {index < item.modified.length - 1 && <br />}
                </div>
              ));
            }
          })}
        </div>
      ),
    },
  ];

  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Total Price",
      dataIndex: "total",
      key: "total",
    },
  ];

  // useEffect(() => {
  //   if (Order?.products[0]?.modified) {
  //     columns.splice(1, 0, {
  //       title: "Printing Position Details",
  //       dataIndex: "modified",
  //       key: "modified",
  //     });
  //   }
  // }, []);
  const onChangeStatus = async (value) => {
    console.log(value, "e");
    setStatus(value);
    const res = await putApiCall("orders/update_status/" + Order._id, {
      status: value,
    });
  };
  return (
    <div
      className="order-detail"
      style={{
        marginLeft: settings.collapsed ? "8%" : "15%",
        // width: settings.collapsed ? "calc(100vw - 20%)" : "calc(100vw - 40%)",
      }}
    >
      <h1>#{Order?._id}</h1>
      {/* <Table dataSource={dataSource} columns={columns} pagination={false} /> */}
      <div className="desc-row">
        <Card className="desc">
          <Descriptions title="User Info" bordered>
            <Descriptions.Item label={`UserName`} span={12}>
              {Order?.user_id?.firstname + " " + Order?.user_id?.lastname}
            </Descriptions.Item>
            <Descriptions.Item label="Mobile Number" span={12}>
              {Order?.user_id?.mobile}
            </Descriptions.Item>
            <Descriptions.Item label="Email" span={12}>
              {Order?.user_id?.email}
            </Descriptions.Item>
            <Descriptions.Item label="Company" span={12}>
              {Order?.user_id?.companyname}
            </Descriptions.Item>
            <Descriptions.Item label="License" span={12}>
              {Order?.user_id?.tradinglicense}
            </Descriptions.Item>
            {/* <Descriptions.Item label="Address" span={12}>
              No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
            </Descriptions.Item> */}
          </Descriptions>
          <div className="status-div">
            <p>Order Status:</p>
            <Select
              value={capitalizeFirstLetter(status)}
              onChange={onChangeStatus}
              style={{
                width: 120,
              }}
              options={[
                {
                  label: "Pending",
                  value: "pending",
                },
                {
                  label: "Contacted",
                  value: "contacted",
                },
                {
                  label: "Shipped",
                  value: "shipped",
                },
                {
                  label: "Cancelled",
                  value: "Cancelled",
                },
              ]}
            />
          </div>
        </Card>
        {/* <Card className="address">
          <Descriptions title="Address" bordered>
            <Descriptions.Item label="Address" span={12}>
              {`${Order?.address?.address1}, ${Order?.address?.address2}, ${Order?.address?.address3}`}
            </Descriptions.Item>
            <Descriptions.Item label="City" span={12}>
              {Order?.address?.city}
            </Descriptions.Item>
            <Descriptions.Item label="State" span={12}>
              {Order?.address?.state}
            </Descriptions.Item>
          </Descriptions>

          
        </Card> */}
      </div>
      <Card>
        <Table
          columns={productColumn}
          dataSource={Order?.products?.map((item) => ({
            product_row: item,
            quantity: item?.quantity,
            unit_price: (
              <span>{parseFloat(item.unit_price).toFixed(2)} AED</span>
            ),
            total_price: (
              <span>{parseFloat(item.total_price).toFixed(2)} AED</span>
            ),
          }))}
          pagination={false}
        />
        <div className="total">
          <Descriptions bordered>
            <Descriptions.Item label="Payment Method" span={12}>
              {Order?.payment_method}
            </Descriptions.Item>
            <Descriptions.Item label="Total" span={12}>
              {Order?.total}
            </Descriptions.Item>

            {/* <Descriptions.Item label="Address" span={12}>
              No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
            </Descriptions.Item> */}
          </Descriptions>
        </div>
      </Card>
    </div>
  );
}

export default OrderDetails;
