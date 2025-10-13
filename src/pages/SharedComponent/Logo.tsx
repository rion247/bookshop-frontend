import { Link } from "react-router-dom";
import LogoImg from "../../assets/images/book.png";

const Logo = () => {
  return (
    <div>
      <Link
        to={"/"}
        className="text-xl font-extrabold text-blue-500 tracking-wider hidden lg:flex justify-center gap-x-2 items-end"
      >
        <img className="w-10 h-10" src={LogoImg} alt="...Loading" />
        <h6>
          eBook<span className="text-gray-500">Nest</span>
        </h6>
      </Link>
    </div>
  );
};

export default Logo;
