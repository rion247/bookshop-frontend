import { Link } from "react-router-dom";
import Container from "../../components/Shared/Container";
import { Button } from "antd";

const ErrorPage = () => {
  return (
    <Container>
      <section className="flex items-center p-16 justify-between h-screen">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="max-w-lg text-center">
            <h2 className="mb-8 font-extrabold text-9xl text-blue-500">
              <span className="sr-only">Error</span>404
            </h2>
            <p className="text-2xl font-semibold md:text-3xl">
              Sorry, we couldn't find this page.
            </p>
            <p className="mt-4 mb-8 text-gray-400">
              But dont worry, you can find plenty of other things on our
              homepage.
            </p>
            <Link to={"/"}>
              <Button type="primary" size="large" className="capitalize">
                Back to homepage
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default ErrorPage;
