// src/components/SuccessMessage.tsx
import React from "react";
import { Typography } from "antd";

const { Text } = Typography;

const SuccessMessage: React.FC = () => (
  <div>
    <Text strong>Registration Successful!</Text>
  </div>
);

export default SuccessMessage;
