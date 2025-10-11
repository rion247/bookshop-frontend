import { useEffect, useState } from "react";
import { useGetAllProductQuery } from "../../redux/features/product/productManagementApi";
import {
  Button,
  Pagination,
  Table,
  type TableColumnsType,
  type TableProps,
} from "antd";
import Loading from "../Loading/Loading";
import Container from "../../components/Shared/Container";
import { Link } from "react-router-dom";
import type { TQueryParam } from "../../types";

export type TTableDataForViewAllProduct = {
  key: string;
  title: string;
  description: string;
  author: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
  status: string;
};

const ViewAllBooks: React.FC = () => {
  const [scrollX, setScrollX] = useState<number | undefined>(undefined);
  const [page, setPage] = useState<number>(1);
  const [params, setParams] = useState<TQueryParam[]>([
    { name: "sort", value: "price" },
  ]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 375) {
        setScrollX(600);
      } else if (window.innerWidth <= 768) {
        setScrollX(800);
      } else {
        setScrollX(undefined);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const {
    data: productData,
    isFetching,
    isLoading,
  } = useGetAllProductQuery(params, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const metaData = productData?.meta;

  const titleFilter = productData?.data?.map((element) => ({
    text: element?.title,
    value: element?.title,
  }));

  const authorFilter = productData?.data?.map((element) => ({
    text: element?.author,
    value: element?.author,
  }));

  const categoryFilter = productData?.data?.map((element) => ({
    text: element?.category,
    value: element?.category,
  }));

  const tableData = productData?.data?.map(
    ({
      _id,
      title,
      description,
      author,
      category,
      price,
      quantity,
      image,
      status,
    }) => ({
      key: _id,
      title,
      description,
      author,
      category,
      price,
      quantity,
      image,
      status,
    })
  );

  const columns: TableColumnsType<TTableDataForViewAllProduct> = [
    {
      key: "title",
      title: "Book Title",
      dataIndex: "title",
      filters: titleFilter,
    },
    {
      key: "author",
      title: "Author Name",
      dataIndex: "author",
      filters: authorFilter,
    },
    {
      key: "category",
      title: "Category",
      dataIndex: "category",
      filters: categoryFilter,
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "status",
      filters: [
        { text: "Available", value: "available" },
        { text: "Out of Stock", value: "out-of-stock" },
      ],
    },
    {
      key: "price",
      title: "Price",
      dataIndex: "price",
      sorter: {
        compare: (a, b) => a.price - b.price,
        multiple: 3,
      },
    },
    {
      key: "quantity",
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Link to={`/book-details/${item?.key}`}>
            <Button>View Details</Button>
          </Link>
        );
      },
      width: "1%",
    },
  ];

  if (isLoading) {
    <Loading />;
  }

  const onChange: TableProps<TTableDataForViewAllProduct>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    // console.log({ filters }, { extra });
    // console.log(sorter);
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];
      filters.title?.forEach((item) =>
        queryParams.push({ name: "title", value: item })
      );
      filters?.status?.forEach((item) =>
        queryParams.push({ name: "status", value: item })
      );
      filters?.author?.forEach((item) =>
        queryParams.push({ name: "author", value: item })
      );
      filters?.category?.forEach((item) =>
        queryParams.push({ name: "category", value: item })
      );
      setParams(queryParams);
    }
  };

  return (
    <Container>
      <div className="my-6 md:my-8 lg:my-12">
        <Table<TTableDataForViewAllProduct>
          loading={isFetching}
          onChange={onChange}
          columns={columns}
          dataSource={tableData}
          showSorterTooltip={{ target: "sorter-icon" }}
          scroll={{ x: scrollX }}
          pagination={false}
          footer={() => (
            <div className="w-full flex justify-center">
              <Pagination
                current={page}
                onChange={(value) => setPage(value)}
                pageSize={metaData?.limit}
                total={metaData?.total}
              />
            </div>
          )}
        />
      </div>
    </Container>
  );
};

export default ViewAllBooks;
