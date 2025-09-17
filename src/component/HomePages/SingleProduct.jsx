import { Info, CheckCircle, XCircle } from "lucide-react";

const SingleProduct = ({ item }) => {
  const { category, title, inStock, image, price, weightOrCal } = item;

  return (
    <div className="w-full flex flex-col items-center justify-between gap-4 bg-white shadow rounded-xl p-4 hover:shadow-lg transition">
      
      {/* Details Column */}
      <div className="flex-1 flex flex-col">
        <p className="text-sm text-gray-500">{category}</p>
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <div className="flex items-center gap-2 mt-1">
          {inStock ? (
            <CheckCircle className="w-4 h-4 text-green-500" />
          ) : (
            <XCircle className="w-4 h-4 text-red-500" />
          )}
          <span className={`text-sm ${inStock ? "text-green-600" : "text-red-600"}`}>
            {inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>

      {/* Image */}
      <div className="w-20 h-20 flex-shrink-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Price & Weight/Cal */}
      <div className="text-right flex flex-col items-end justify-center">
        <p className="text-base font-bold text-gray-900">${price.toFixed(2)}</p>
        <p className="text-sm text-gray-500">{weightOrCal}</p>
      </div>

      {/* Details Button */}
      <button
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
      >
        <Info className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
};

export default SingleProduct;
