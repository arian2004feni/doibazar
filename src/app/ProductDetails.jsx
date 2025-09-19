import { Link, useParams } from "react-router";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { toBanglaNumber } from "../component/utils";

const ProductDetails = () => {
  const {category, id } = useParams();
  const product = {
    _id: "p1",
    title: "দই মিষ্টি",
    price: 1500,
    weight: 1500,
    brand: "Homemade",
    deliveryAvailable: true,
    images: [
      "/item1.png",
      "/item2.png",
      "/item3.png",
      "/item4.png",
      "/item5.png",
      "/item6.png",
      "/item7.png",
      "/item8.png",
    ],
    description:
      "তাজা দুধ থেকে তৈরি করা সুস্বাদু দই মিষ্টি। একদম ঘরের মতো স্বাদ। দই মিষ্টি একটি দুগ্ধজাত খাবার, যা দুধকে নির্দিষ্ট ব্যাকটেরিয়ার মাধ্যমে গাঁজন প্রক্রিয়ায় তৈরি করা হয়, যেখানে ল্যাক্টোজের গাঁজন প্রক্রিয়ায় ল্যাক্টিক অ্যাসিড উৎপন্ন হয় এবং এতে মিষ্টি স্বাদ যুক্ত হয়। এই পদ্ধতিতে দইয়ের স্বাদ ও গন্ধ তৈরি হয় এবং এর বৈশিষ্ট্যপূর্ণ মিষ্টি স্বাদ যুক্ত করা হয়। দই একটি প্রোটিন সমৃদ্ধ, পুষ্টিকর এবং প্রোবায়োটিকযুক্ত খাদ্য। সাধারণত সাদামাটা, মিষ্টি ছাড়া দই সবচেয়ে ভালো। অনেক ধরণের দইতে প্রচুর পরিমাণে চিনি থাকে, বিশেষ করে যেগুলিকে কম চর্বিযুক্ত বলা হয়। অতিরিক্ত চিনি গ্রহণ ডায়াবেটিস, স্থূলতা এবং দাঁতের গর্ত সহ বেশ কয়েকটি স্বাস্থ্য সমস্যার সাথে যুক্ত।",
  };
  // const { category, id } = useParams();
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [startIndex, setStartIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  // const [selectedWeight, setSelectedWeight] = useState(
  //   product.weightOptions[0]
  // );
  // navigate gallery
  const handlePrev = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };
  const handleNext = () => {
    if (startIndex + 4 < product.images.length) setStartIndex(startIndex + 1);
  };
  // price calculation

  return (
    <div className="max-w-5xl mx-auto p-4 bangla">
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={`/category/${category}`}>{category}</Link>
          </li>
          <li>{id}</li>
        </ul>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* LEFT - Image Gallery */}
        <div className="relative">
          <div className="grid grid-cols-3 grid-rows-2 gap-2">
            {/* Main Big Image */}
            <div className="col-span-3 row-span-2 w-full sm:h-96 h-[350px] flex justify-center">
              <div className="h-8/12 mt-6">
                <img
                  src={mainImage}
                  alt="product"
                  className="h-full object-cover drop-shadow-lg drop-shadow-black/30"
                />
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center items-center space-x-2">
              <button
                onClick={handlePrev}
                disabled={product.images.length <= 4}
                className="btn btn-sm btn-circle bg-white shadow"
              >
                <FaChevronLeft />
              </button>

              <div className="grid grid-cols-4 gap-2">
                {product.images
                  .slice(startIndex, startIndex + 4)
                  .map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setMainImage(img)}
                      className={`size-20 md:size-16 lg:size-20 max-[450px]:size-16 max-[360px]:size-14 bg-orange-50/50 p-1 border cursor-pointer flex items-center shadow-lg ${
                        img === mainImage
                          ? "border-orange-400"
                          : "border-gray-200"
                      }`}
                    >
                      <img
                        src={img || "/error-image.png"}
                        alt="thumb"
                        className="w-full object-cover rounded-md"
                      />
                    </div>
                  ))}
              </div>
              <button
                onClick={handleNext}
                disabled={product.images.length <= 4}
                className="btn btn-sm btn-circle bg-white shadow"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT - Product Details */}
        <div className="space-y-4">
          <h1 className="text-2xl lg:text-3xl font-bold">{product.title}</h1>

          {/* Price Section */}
          <div className="flex items-end">
            <span className="text-3xl font-bold mr-2 leading-7">
              {toBanglaNumber(product.price)} ৳
            </span>
          </div>

          {/* Price Per Unit */}
          <p className="text-sm text-gray-600">
            {product.weight === 1000
              ? `${product.price} ৳ প্রতি কেজি`
              : `প্রতি ${toBanglaNumber(product.weight)} গ্রাম ${toBanglaNumber(
                  product.price
                )} টাকা`}
          </p>

          {/* Delivery */}
          <p>
            <span className="font-semibold">ডেলিভারি:</span>{" "}
            {product.deliveryAvailable ? "হ্যাঁ" : "না"}
          </p>

          {/* Brand */}
          <p>
            <span className="font-semibold">ব্র্যান্ড:</span> {product.brand}
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="font-semibold">পরিমাণ:</span>
            <div className="flex items-center border border-amber-600 rounded-full english">
              <button
                className="px-3 py-1 rounded-full cursor-pointer"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </button>
              <p className="size-7 bg-warning flex items-center justify-center rounded-full">
                {toBanglaNumber(quantity)}
              </p>
              <button
                className="px-3 py-1 rounded-full cursor-pointer"
                onClick={() => setQuantity((q) => Math.min(5, q + 1))}
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="btn btn-primary">কার্টে যোগ করুন</button>
            <button
              onClick={() => setWishlist(!wishlist)}
              className="btn btn-outline"
            >
              {wishlist ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
            </button>
          </div>
        </div>
      </div>

      {/* Full Description */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-2">পণ্যের বিস্তারিত</h2>
        <p className="text-gray-700 text-justify">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
