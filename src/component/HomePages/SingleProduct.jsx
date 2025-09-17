import { Info, CheckCircle, XCircle } from "lucide-react";

const SingleProduct = ({ item }) => {
  const { category, title, inStock, image, price, weight, cal } = item;

  return (
    <div className="w-full flex flex-col justify-between gap-4 bg-white shadow border border-black/10 rounded-xl p-4 hover:shadow-lg transition bangl">
      
      {/* Details Column */}
      <div className="flex flex-col">
        <p className="text-sm text-gray-500">{category}</p>
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <div className="flex items-center gap-2 mt-1">
          {inStock ? (
            <CheckCircle className="w-4 h-4 text-green-500" />
          ) : (
            <XCircle className="w-4 h-4 text-red-500" />
          )}
          <span className={`text-sm ${inStock ? "text-green-600" : "text-red-600"}`}>
            {inStock ? "স্টকে আছে" : "স্টকে নেই"}
          </span>
        </div>
      </div>

      {/* Image */}
      <div className="w-10/12 flex justify-center flex-shrink-0 mx-auto">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover drop-shadow-xl drop-shadow-black/30 hover:drop-shadow-black/40"
        />
      </div>

      <div className="flex justify-between items-center">
        {/* Price & Weight/Cal */}
      <div className="flex flex-col justify-center">
        <p className="text-base font-bold text-gray-900">{price} টাকা</p>
        <p className="text-sm text-gray-500">{weight} / {cal}</p>
      </div>

      {/* Details Button */}
      <button
        className="p-2 rounded-full size-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition"
      >
        <Info className="w-5 h-5 text-gray-600" />
      </button>
      </div>
    </div>
  );
};

export default SingleProduct;
