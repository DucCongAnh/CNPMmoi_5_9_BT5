import {
  CrownOutlined
} from '@ant-design/icons';
import {
  Result
} from 'antd';
import React from 'react';

const HomePage = () => {
  return (
    <div style={{
      padding: 20
    }}>
      <Result
        icon={<CrownOutlined />}
        title="JSON Web Token (React/Node.js) - Iotstar.vn"
      />
    </div>
  );
};

export default HomePage;