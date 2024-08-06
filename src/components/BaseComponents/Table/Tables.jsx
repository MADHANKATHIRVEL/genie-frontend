import React from "react";
import "./_table.scss";
import { Pagination, Table } from "antd";

function Tables({ column, data, actions, pagination = {} }) {
  return (
    <div className="table">
      <Table
        columns={column}
        dataSource={data}
        onChange={actions}
        pagination={false}
      />
      <Pagination
        total={pagination?.total}
        defaultCurrent={pagination?.current}
        showSizeChanger
        onChange={pagination?.onchange}
        onShowSizeChange={pagination?.onsizechange}
        style={{ float: "right", margin: "20px" }}
      />
    </div>
  );
}

export default Tables;
