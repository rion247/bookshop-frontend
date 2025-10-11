import { Flex, Spin } from "antd";

const Loading = () => {
  return (
    <Flex
      className="w-screen h-screen absolute top-0 bottom-0 left-0 right-0 justify-between items-center bg-neutral-200"
      align="center"
      justify="center"
    >
      <Spin size="large" />
    </Flex>
  );
};

export default Loading;
