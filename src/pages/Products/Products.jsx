import React, { useEffect, useState } from "react";
import "./_products.scss";
import { useSelector } from "react-redux";
import Tables from "../../components/BaseComponents/Table/Tables";
import { Card, Flex, Tag } from "antd";
import { getApiCall } from "../../helpers/apiServices";
import { getAEDPrice, getParams } from "../../helpers/helpers";

function Products() {
  const { settings } = useSelector((state) => state.settings);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [Category, setCategory] = useState([]);
  const [filters, setFilters] = useState({
    type: [],
  });
  useEffect(() => {
    const listFilters = async () => {
      const response = await getApiCall("products/list_filters");
      let temp = [];
      response.data.map((item) => {
        temp.push({
          text: item.category_level1,
          value: item.category_level1,
        });
      });
      setCategory(() => temp);
    };
    listFilters();
  }, []);

  useEffect(() => {
    setPage(() => 1);
    const params = getParams(filters);
    const getProducts = async () => {
      const ProductResponse = await getApiCall(
        "products?" + params + `page=${page}&limit=${limit}`
      );
      const productCount = await getApiCall(`products/count?` + params);

      setTotal(() => productCount.data.count);
      getProductData(ProductResponse.data);
    };
    getProducts();
  }, [filters]);
  useEffect(() => {
    const getProducts = async () => {
      const ProductResponse = await getApiCall(
        "products?" + getParams(filters) + `page=${page}&limit=${limit}`
      );
      getProductData(ProductResponse.data);
    };
    getProducts();
  }, [page, limit]);

  const getProductData = (data) => {
    let res = [];
    data.map((item, index) => {
      res.push({
        key: index,
        master_code: item.master_code,
        name: item.product_name,
        category: item.variants[0],
        stock: item.variants,
        price: item.variants[0].price,
        variants: item.variants,
      });
    });
    setProducts(() => res);
  };

  const columns = [
    {
      title: "Master code",
      dataIndex: "master_code",
      key: "master_code",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      filters: Category,
      width: "35%",
      render: (data) => {
        return (
          <div className="cat-tag">
            <Tag>{data.category_level1}</Tag>
            <Tag>{data.category_level2}</Tag>
            <Tag>{data.category_level3}</Tag>
          </div>
        );
      },
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      render: (data) => {
        let stock = 0;
        data.map((item) => {
          stock += item.qty;
        });
        return <div className="">{stock}</div>;
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (data) => {
        return `${data} (AED)`;
      },
    },
    {
      title: "Variants",
      dataIndex: "variants",
      key: "variants",
      render: (data) => {
        const uniqueItems = Array.from(
          new Set(data.map((item) => item.color_group))
        ).map((colorGroup) =>
          data.find((item) => item.color_group === colorGroup)
        );

        return (
          <div className="variant-cont">
            {uniqueItems.map((item, index) => {
              return index < 7 ? (
                <span
                  key={index}
                  className="variants"
                  style={{
                    background: `${item?.color_group}`,
                  }}
                ></span>
              ) : (
                index === 7 && (
                  <span
                    key={index}
                    className="variants"
                    style={{
                      // width: "auto",
                      // height: "auto",
                      fontSize: "9px",
                      // padding: "5px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    +{uniqueItems.length - 7}
                  </span>
                )
              );
            })}
          </div>
        );
      },
    },
  ];
  const onChangeFilter = (pagination, filters, sorter, extra) => {
    setFilters(() => filters);
  };

  return (
    <div
      className="products"
      style={{
        marginLeft: settings.collapsed ? "8%" : "15%",
        // width: settings.collapsed ? "calc(100vw - 20%)" : "calc(100vw - 40%)",
      }}
    >
      <Card style={{ width: "100%" }}>
        <Tables
          column={columns}
          data={products}
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
    </div>
  );
}

export default Products;
