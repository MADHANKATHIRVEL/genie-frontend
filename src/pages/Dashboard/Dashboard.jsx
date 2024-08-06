import { Button, Card, Progress, notification } from "antd";
import Meta from "antd/es/card/Meta";
import { useCallback, useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import "./_dashboard.scss";
import { useSelector } from "react-redux";
import {
  MdOutlineProductionQuantityLimits,
  MdPendingActions,
  MdOutlineCancelScheduleSend,
} from "react-icons/md";
import { GrDeliver } from "react-icons/gr";
import { HiMiniUsers } from "react-icons/hi2";
import { IoSend } from "react-icons/io5";
import { getApiCall } from "../../helpers/apiServices";

function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [usersCount, setUsersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [shippedCount, setShippedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [deliveredCount, setDeliveredCount] = useState(0);
  const [cancelledCount, setCancelledCount] = useState(0);
  const { settings } = useSelector((state) => state.settings);
  const [progress, setProgress] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const cardItems = [
    {
      key: 1,
      title: pendingCount + "",
      desc: "Pending",
      icon: <MdPendingActions style={{ fontSize: "18px" }} />,
    },
    {
      key: 2,
      title: shippedCount + "",
      desc: "Shipped",
      icon: <IoSend style={{ fontSize: "18px" }} />,
    },
    {
      key: 3,
      title: deliveredCount + "",
      desc: "Delivered",
      icon: <GrDeliver style={{ fontSize: "18px" }} />,
    },
    {
      key: 4,
      title: cancelledCount + "",
      desc: "Cancelled",
      icon: <MdOutlineCancelScheduleSend style={{ fontSize: "18px" }} />,
    },
  ];
  // console.log(settings);
  const getCounts = useCallback(async () => {
    const userCount = await getApiCall("users/count");
    const productCount = await getApiCall("products/count");
    const sCount = await getApiCall("orders/count?status=shipped");
    const pCount = await getApiCall("orders/count?status=pending");
    const dCount = await getApiCall("orders/count?status=delivered");
    const cCount = await getApiCall("orders/count?status=cancelled");
    setUsersCount(() => userCount.data.count);
    setProductsCount(() => productCount.data.count);
    setShippedCount(() => sCount.data.count);
    setPendingCount(() => pCount.data.count);
    setDeliveredCount(() => dCount.data.count);
    setCancelledCount(() => cCount.data.count);
  }, [
    usersCount,
    productsCount,
    shippedCount,
    pendingCount,
    deliveredCount,
    cancelledCount,
  ]);
  useEffect(() => {
    getCounts();
  }, []);
  const handleImport = async () => {
    setProgress(true);
    localStorage.setItem("import_date", Date());
    const addProduct = await getApiCall("products/add_product");
    if (addProduct?.status) {
      setProgressPercent(30);
      const addPrice = await getApiCall("products/add_price");
      if (addPrice?.status) {
        setProgressPercent(50);
        const addStock = await getApiCall("products/add_stock");
        if (addStock?.status) {
          setProgressPercent(70);
          const addPrint = await getApiCall("products/add_print");
          if (addPrint?.status) {
            setProgressPercent(90);
            const addPrintPrice = await getApiCall("products/add_print_price");
            if (addPrintPrice.status) {
              setProgressPercent(100);
              notification.success({
                message: "Product Imported Successfully",
              });
              setProgress(false);
            } else {
              notification.error({
                message:
                  "Error while importing printing price. Please try again later",
              });
              setProgress(false);
            }
          } else {
            notification.error({
              message:
                "Error while importing Pinting Position. Please try again later",
            });
            setProgress(false);
          }
        } else {
          notification.error({
            message: "Error while importing Stocks. Please try again later",
          });
          setProgress(false);
        }
      } else {
        notification.error({
          message: "Error while importing Price. Please try again later",
        });
        setProgress(false);
      }
    } else {
      notification.error({
        message: "Error while importing Products. Please try again later",
      });
      setProgress(false);
    }
  };
  return (
    <div
      className="dashboard"
      style={{
        marginLeft: settings.collapsed ? "8%" : "15%",
        // width: settings.collapsed ? "calc(100vw - 20%)" : "calc(100vw - 40%)",
      }}
    >
      <div className="main-cards">
        <Card loading={loading}>
          <Meta
            avatar={
              <span className="card-avatar">
                <HiMiniUsers style={{ fontSize: "18px" }} />
              </span>
            }
            title="Users"
            description={usersCount + " active Users "}
          />
        </Card>
        <Card loading={loading}>
          <Meta
            avatar={
              <span className="card-avatar">
                <MdOutlineProductionQuantityLimits
                  style={{ fontSize: "18px" }}
                />
              </span>
            }
            title="Products"
            description={productsCount + " Products Available"}
          />
        </Card>
      </div>
      <div className="card-grid">
        {cardItems.map((item, index) => {
          return (
            <Card key={index} loading={loading}>
              <Meta
                avatar={<span className="card-avatar">{item.icon}</span>}
                title={item.title}
                description={item.desc}
              />
            </Card>
          );
        })}
      </div>
      <div className="import-products-grid">
        <Card>
          {!progress ? (
            <div className="sub-cont">
              <p>Last Imported: {localStorage.getItem("import_date")} </p>
            </div>
          ) : (
            <div className="progress-cont">
              <Progress
                type="circle"
                percent={progressPercent}
                status="active"
              />
            </div>
          )}
          {progress && <p>Don't refresh or make action while in progress</p>}
          <Button disabled={progress} onClick={handleImport}>
            Import Products
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
