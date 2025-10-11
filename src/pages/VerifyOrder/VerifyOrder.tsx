import { useSearchParams } from "react-router-dom";
import Container from "../../components/Shared/Container";
import { FaShippingFast } from "react-icons/fa";
import { Col, Form, Input, Row } from "antd";
import { useVerifyOrderQuery } from "../../redux/features/order/orderManagementApi";
import type { TProduct, TUser } from "../../types";
import Loading from "../Loading/Loading";
import { FaBook } from "react-icons/fa6";

type TransactionInfo = {
  id: string;
  transactionStatus: string;
};

type OrderData = {
  _id: string;
  user: TUser;
  product: TProduct;
  orderQuantity: number;
  totalPrice: number;
  paymentStatus: string;
  orderStatus: string;
  transactionInfo: TransactionInfo;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const VerifyOrder = () => {
  const [params] = useSearchParams();

  const { data, isLoading, isFetching } = useVerifyOrderQuery(
    params.get("order_id"),
    {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  // console.log(data);
  // console.log(params.get("order_id"));

  if (isLoading || isFetching) {
    return <Loading />;
  }

  const orderData: OrderData = data?.data;

  // console.log(orderData);
  const userID = orderData?.user?._id;
  const userEmail = orderData?.user?.email;
  const userName = orderData?.user?.name;
  const productName = orderData?.product?.title;
  const productCategory = orderData?.product?.category;
  const productAuthor = orderData?.product?.author;
  const transactionInfo = orderData?.transactionInfo?.id;
  const orderStatus = orderData?.orderStatus;
  const orderQuantity = orderData?.orderQuantity;
  const totalPrice = orderData?.totalPrice;

  return (
    <Container>
      <section className="p-4 lg:p-6 my-8 md:my-10  lg:my-12 xl:my-16 font-poppins">
        <div>
          <div className="text-base md:text-lg lg:text-xl xl:text-2xl flex items-center justify-center gap-2 bg-blue-500 text-white p-2 rounded mb-6">
            <FaShippingFast />
            <h2>Shipping Details</h2>
          </div>
          <Form layout="vertical">
            <Row gutter={12}>
              <Col span={24} lg={{ span: 12 }}>
                <Form.Item label="User ID">
                  <Input
                    defaultValue={userID}
                    disabled={true}
                    style={{
                      color: "black",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={24} lg={{ span: 12 }}>
                <Form.Item label="Email">
                  <Input
                    defaultValue={userEmail}
                    disabled={true}
                    style={{
                      color: "black",
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={24}>
                <Form.Item label="Full Name">
                  <Input
                    defaultValue={userName}
                    disabled={true}
                    style={{
                      color: "black",
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
        <div className="my-6 md:my-8 lg:my-10 xl:my-12">
          <div className="text-base md:text-lg lg:text-xl xl:text-2xl flex items-center justify-center gap-2 bg-blue-500 text-white p-2 rounded mb-6">
            <FaBook />
            <h2>Product Details</h2>
          </div>
          <Form layout="vertical">
            <Row gutter={12}>
              <Col span={24} lg={{ span: 12 }}>
                <Form.Item label="Book Title">
                  <Input
                    defaultValue={productName}
                    disabled={true}
                    style={{
                      color: "black",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={24} lg={{ span: 12 }}>
                <Form.Item label="Category">
                  <Input
                    defaultValue={productCategory}
                    disabled={true}
                    style={{
                      color: "black",
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={24}>
                <Form.Item label="Author">
                  <Input
                    defaultValue={productAuthor}
                    disabled={true}
                    style={{
                      color: "black",
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
        <div className="">
          <div className="text-base md:text-lg lg:text-xl xl:text-2xl flex items-center justify-center gap-2 bg-blue-500 text-white p-2 rounded mb-6">
            <FaBook />
            <h2>Order Details</h2>
          </div>
          <Form layout="vertical">
            <Row gutter={12}>
              <Col span={24} lg={{ span: 12 }}>
                <Form.Item label="Transaction Info">
                  <Input
                    defaultValue={transactionInfo}
                    disabled={true}
                    style={{
                      color: "black",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={24} lg={{ span: 12 }}>
                <Form.Item label="Status">
                  <Input
                    defaultValue={orderStatus}
                    disabled={true}
                    style={{
                      color: "black",
                      textTransform: "capitalize",
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={24} lg={{ span: 12 }}>
                <Form.Item label="Order Quantity">
                  <Input
                    defaultValue={orderQuantity}
                    disabled={true}
                    style={{
                      color: "black",
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={24} lg={{ span: 12 }}>
                <Form.Item label="Total Price (BDT)">
                  <Input
                    defaultValue={totalPrice}
                    disabled={true}
                    style={{
                      color: "black",
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </section>
    </Container>
  );
};

export default VerifyOrder;
