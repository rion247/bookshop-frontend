import { Flex, Spin } from "antd";

const Loading = () => {
  return (
    <div className="w-full h-full flex justify-between items-center">
      <Flex align="center" gap="middle">
        <Spin size="large" />
      </Flex>
    </div>
  );
};

export default Loading;
