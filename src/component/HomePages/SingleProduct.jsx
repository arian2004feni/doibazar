import { Info, CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router";

const SingleProduct = ({ item }) => {
  const { category, title, inStock, image, price, weight, cal, _id } = item;

  return (
    <div className="w-full flex flex-col justify-between gap-4 bg-white shadow border border-black/10 rounded-xl p-4 hover:shadow-lg transition bangla group">
      {/* Details Column */}
      <div className="flex flex-col">
        <p className="text-sm text-gray-500">
          <Link to={`/${category}`} className=" link-hover">{category}</Link>
        </p>
        <h2 className="text-lg font-semibold text-gray-800">
          <Link to={`/${category}/${_id}`} className="link-hover">
            {title}
          </Link>
        </h2>
        <div className="flex items-center gap-2 mt-1">
          {inStock ? (
            <CheckCircle className="w-4 h-4 text-green-500" />
          ) : (
            <XCircle className="w-4 h-4 text-red-500" />
          )}
          <span
            className={`text-sm ${inStock ? "text-green-600" : "text-red-600"}`}
          >
            {inStock ? "স্টকে আছে" : "স্টকে নেই"}
          </span>
        </div>
      </div>

      {/* Image */}
      <Link
        to={`/${category}/${_id}`}
        className="w-10/12 flex justify-center flex-shrink-0 mx-auto"
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover drop-shadow-xl drop-shadow-black/30 group-hover:drop-shadow-black/45 transition-all duration-200"
        />
      </Link>

      <div className="flex justify-between items-center">
        {/* Price & Weight/Cal */}
        <div className="flex flex-col justify-center">
          <p className="text-base font-bold text-gray-900">{price} টাকা</p>
          <p className="text-sm text-gray-500">
            {weight} / {cal}
          </p>
        </div>

        {/* Details Button */}
        <Link
          to={`/${category}/${_id}`}
          className="p-2 rounded-full size-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition"
        >
          <Info className="w-5 h-5 text-gray-600" />
        </Link>
      </div>
    </div>
  );
};

export default SingleProduct;
