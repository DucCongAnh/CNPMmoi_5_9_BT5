import {
  notification,
  Table
} from "antd";
import React, {
  useEffect,
  useState
} from "react";
import {
  getUserApi
} from "../../util/api";

const UserPage = () => {
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUserApi();
      if (res) {
        setDataSource(res);
      } else {
        notification.error({
          message: "Unauthorized",
          description: res.message
        });
      }
    };
    fetchUser();
  }, []);

  const columns = [{
    title: 'id',
    dataIndex: '_id',
  }, {
    title: 'Email',
    dataIndex: 'email',
  }, {
    title: 'Name',
    dataIndex: 'name',
  }, {
    title: 'Role',
    dataIndex: 'role',
  }, ];

  return (
    <div style={{
      padding: 30
    }}>
      <Table
        bordered
        dataSource={dataSource}
        columns={columns}
        rowKey={"_id"}
      />
    </div>
  );
};

export default UserPage;