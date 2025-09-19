import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

/*
  CreateProductPage component
  - React + react-hook-form
  - DaisyUI / Tailwind classes used for styling
  - Upload images (max 6) with preview and remove
  - On submit: convert images to base64 and upload to imgbb (REACT_APP_IMGBB_KEY env var)
  - Dynamic ingredients & nutrition lists (name + number)
  - Discount toggle with minimum quantity
  - Shipping & return selects (24,48,72,96...)
  - Loading state disables form and shows spinner

  IMPORTANT: Always use title and descriptions in Bangla (UI shows instruction).
*/

const IMGBB_KEY = import.meta.env.VITE_IMGBB_API_KEY || "key";

export default function CreateProductPage() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const [images, setImages] = useState([]); // { file, preview }
  const [loading, setLoading] = useState(false);
  const [shipToDhaka, setShipToDhaka] = useState(true);
  const [shipToOutside, setShipToOutside] = useState(false);

  // discount UI
  const [showDiscount, setShowDiscount] = useState(false);

  // ingredient and nutrition
  const [ingName, setIngName] = useState("");
  const [ingQty, setIngQty] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const [nutName, setNutName] = useState("");
  const [nutQty, setNutQty] = useState("");
  const [nutrition, setNutrition] = useState([]);

  // helper: add image (from input files)
  function handleImageFiles(files) {
    const fileList = Array.from(files);
    const combined = [
      ...images,
      ...fileList.map((f) => ({ file: f, preview: URL.createObjectURL(f) })),
    ];
    if (combined.length > 6) {
      Swal.fire(
        "সর্বোচ্চ ৬ টি ছবি নিতে পারবেন",
        "প্রতি প্রোডাক্ট সর্বোচ্চ ৬ টি ছবি আপলোড করা যাবে।",
        "warning"
      );
      return;
    }
    setImages(combined);
  }

  function removeImage(index) {
    const next = [...images];
    const removed = next.splice(index, 1);
    // revoke url
    if (removed[0] && removed[0].preview)
      URL.revokeObjectURL(removed[0].preview);
    setImages(next);
  }

  function addIngredient() {
    if (!ingName.trim()) {
      Swal.fire("নাম লিখুন", "উপাদানের নাম খালি রাখবেন না", "warning");
      return;
    }
    if (!ingQty) {
      Swal.fire("সঠিক মান দিন", "উদাহরণ: 100g বা 500kcal", "warning");
      return;
    }
    setIngredients((s) => [...s, { name: ingName.trim(), quantity: ingQty }]);
    setIngName("");
    setIngQty("");
  }

  function removeIngredient(i) {
    setIngredients((s) => s.filter((_, idx) => idx !== i));
  }

  function addNutrition() {
    if (!nutName.trim()) {
      Swal.fire("নাম লিখুন", "পুষ্টি উপাদানের নাম খালি রাখবেন না", "warning");
      return;
    }
    if (!nutQty) {
      Swal.fire("সঠিক মান দিন", "উদাহরণ: 100g বা 500kcal", "warning");
      return;
    }
    setNutrition((s) => [...s, { name: nutName.trim(), quantity: nutQty }]);
    setNutName("");
    setNutQty("");
  }

  function removeNutrition(i) {
    setNutrition((s) => s.filter((_, idx) => idx !== i));
  }

  // convert file to base64
  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]); // remove data:*/*;base64,
      reader.onerror = (error) => reject(error);
    });
  }

  async function uploadImageToImgbb(file) {
    if (!IMGBB_KEY)
      throw new Error("IMGBB API key not set (REACT_APP_IMGBB_KEY)");
    const base64 = await fileToBase64(file);
    const form = new FormData();
    form.append("key", IMGBB_KEY);
    form.append("image", base64);

    const res = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: form,
    });
    const data = await res.json();
    if (!data || !data.success)
      throw new Error(data?.error?.message || "IMGBB upload failed");
    return data.data.url;
  }

  async function onSubmit(values) {
    // final payload will include uploaded image urls, ingredients, nutrition, shipping info etc.
    if (!/^[\u0980-\u09FF \-\d\w]+$/.test(values.title || "")) {
      // not strict check, just nudge to use Bengali; we also instruct user separately
      // don't block, just warn
    }

    if (images.length === 0) {
      Swal.fire(
        "কমপক্ষে একটি ছবি লাগবে",
        "প্রোডাক্টের জন্য একটি ছবি আপলোড করুন",
        "warning"
      );
      return;
    }

    setLoading(true);

    try {
      // upload images to imgbb sequentially (could be parallel)
      const uploaded = [];
      for (const img of images) {
        const url = await uploadImageToImgbb(img.file);
        uploaded.push(url);
      }

      const payload = {
        title: values.title,
        category: values.category,
        shortDescription: values.shortDescription,
        images: uploaded,
        pricing: {
          price: Number(values.price),
          qtyPerPrice: values.qtyPerPrice,
          qtyConversion: values.qtyConversion,
          discount: values.discount ? Number(values.discount) : 0,
          discountMinQty: values.discountMinQty
            ? Number(values.discountMinQty)
            : 0,
        },
        stockQty: Number(values.stockQty),
        longDetails: values.longDetails,
        ingredients: ingredients,
        nutrition: nutrition,
        shippingDhaka: {
          isShipping: !!values.isShippingDhaka,
          shippingDuration: Number(values.shipDurationDhaka),
          returnTime: Number(values.returnTimeDhaka),
        },
        shippingOutside: {
          isShipping: !!values.isShippingOutside,
          shippingDuration: Number(values.shipDurationOutside),
          returnTime: Number(values.returnTimeOutside),
        },
      };

      console.log(payload);

      // TODO: replace with API endpoint
      // const res = await fetch('/api/products', { method: 'POST', body: JSON.stringify(payload) })
      // simulate success
      await new Promise((r) => setTimeout(r, 800));

      setLoading(false);
      Swal.fire("সফল হয়েছে", "প্রোডাক্ট সফলভাবে ক্রিয়েট করা হয়েছে", "success");
      resetForm();
    } catch (err) {
      console.error(err);
      setLoading(false);
      Swal.fire("ব্যর্থ হয়েছে", err.message || "কোনো সমস্যা হয়েছে", "error");
    }
  }

  function resetForm() {
    reset();
    setImages([]);
    setIngredients([]);
    setNutrition([]);
    setShowDiscount(false);
    setShipToDhaka(true);
    setShipToOutside(false);
  }

  // small helper to show text length rule for short description
  const shortDesc = watch("shortDescription", "");

  return (
    <div className="max-w-4xl mx-auto p-6 bangla">
      <h2 className="text-2xl font-bold mb-4">নতুন প্রোডাক্ট যোগ করুন</h2>
      <p className="text-sm text-gray-600 mb-4">
        দয়া করে সব টাইটেল ও বর্ণনা <span className="font-black">বাংলা</span>{" "}
        ভাষায় দিন।
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="label">
              <span className="label-text">এবং বড় টাইটেল (বাংলা)</span>
            </label>
            <input
              {...register("title", { required: "শিরোনাম অবশ্যই লাগবে" })}
              placeholder="উদাহরণ: মিষ্টি দই (ক্লে পট)"
              className="input input-bordered w-full"
              disabled={loading}
            />
            {errors.title && (
              <p className="text-red-500 mt-1">{errors.title.message}</p>
            )}
          </div>
          <div>
            <label className="label">
              <span className="label-text">ক্যাটাগরি</span>
            </label>
            <input
              {...register("category", { required: "ক্যাটাগরি অবশ্যই লাগবে" })}
              placeholder="উদাহরণ: দই"
              className="input input-bordered w-full"
              disabled={loading}
            />
            {errors.category && (
              <p className="text-red-500 mt-1">{errors.category.message}</p>
            )}
          </div>
        </div>

        {/* Images */}
        <div>
          <label className="label">
            <span className="label-text">
              ছবিঃ ব্যাকগ্রাউন্ড রিমুভ করে দিবেন। (সর্বোচ্চ ৬)
            </span>
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleImageFiles(e.target.files)}
            className="file-input file-input-bordered w-full"
            disabled={loading}
          />

          <div className="flex gap-3 mt-3 flex-wrap">
            {images.map((img, idx) => (
              <div key={idx} className="relative">
                <img
                  src={img.preview}
                  alt={`preview-${idx}`}
                  className="w-28 h-28 object-cover rounded-lg shadow"
                />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Short details (min 40, max 150) */}
        <div>
          <label className="label">
            <span className="label-text">
              সংক্ষিপ্ত বিবরণ (কমপক্ষে ৪০ এবং সর্বোচ্চ ১৫০ অক্ষর)
            </span>
          </label>
          <textarea
            {...register("shortDescription", {
              required: "সংক্ষিপ্ত বিবরণ দিন (বাংলা)",
              minLength: { value: 40, message: "কমপক্ষে ৪০ অক্ষর দিন" },
              maxLength: {
                value: 150,
                message: "অধিকতর ১৫০ অক্ষরের বেশি হতে পারবেনা",
              },
            })}
            placeholder="সংক্ষিপ্তভাবে প্রোডাক্ট বর্ণনা লিখুন (বাংলা)"
            className="textarea textarea-bordered w-full"
            rows={3}
            disabled={loading}
          />
          <div className="text-sm text-gray-500 mt-1">
            অক্ষর: {shortDesc.length}
          </div>
          {errors.shortDescription && (
            <p className="text-red-500 mt-1">
              {errors.shortDescription.message}
            </p>
          )}
        </div>

        {/* Price, weight, discount toggle */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="label">
              <span className="label-text">মূল্য (BDT)</span>
            </label>
            <input
              type="number"
              step="1"
              min={0}
              {...register("price", { required: "মূল্য দিন", min: 0 })}
              className="input input-bordered w-full"
              placeholder="প্রতি ইউনিট/ওজনের দাম লিখুন (number)"
              disabled={loading}
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">ওজন / পরিমাণ</span>
            </label>

            <div className="join">
              <div>
                <div>
                  <input
                    {...register("qtyPerPrice", { required: "ওজন দিন" })}
                    className="input focus:outline-none join-item w-full"
                    type="number"
                    placeholder="উদাহরণ: 500g বা 1kg"
                    min={0}
                    disabled={loading}
                  />
                </div>
              </div>
              <select
                {...register("qtyConversion")}
                className="select join-item w-fit"
              >
                <option value="kg" selected>
                  Kg
                </option>
                <option value="gram">gram</option>
                <option value="pcs">pcs</option>
              </select>
            </div>
          </div>

          <div>
            <label className="label">
              <span className="label-text">স্টক - পরিমাণ (সংখ্যা)</span>
            </label>
            <input
              type="number"
              {...register("stockQty", {
                required: "স্টক পরিমান দিন",
                min: 0,
              })}
              min={0}
              className="input input-bordered w-full"
              placeholder="মোট স্টক আছে... (number)"
              disabled={loading}
            />
          </div>
        </div>

        {/* Discount section toggle */}
        <div className="border p-3 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">ডিসকাউন্ট প্রয়োগ করুন</h3>
              <p className="text-sm text-gray-500">
                প্রয়োজনে প্রোডাক্টে ডিসকাউন্ট যোগ করুন
              </p>
            </div>
            <div>
              <button
                type="button"
                className={`btn ${showDiscount ? "btn-active" : ""}`}
                onClick={() => setShowDiscount((s) => !s)}
                disabled={loading}
              >
                {showDiscount ? "ডিসকাউন্ট বন্ধ করুন" : "ডিসকাউন্ট প্রয়োগ"}
              </button>
            </div>
          </div>

          {showDiscount && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              <div>
                <label className="label">
                  <span className="label-text">ডিসকাউন্ট (%)</span>
                </label>
                <input
                  type="number"
                  step="1"
                  min={0}
                  {...register("discount", { min: 0, max: 100 })}
                  className="input input-bordered w-full"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">
                    ডিসকাউন্ট প্রয়োগের ন্যূনতম পরিমাণ (সংখ্যা)
                  </span>
                </label>
                <input
                  type="number"
                  step="1"
                  min={0}
                  {...register("discountMinQty", { min: 0 })}
                  className="input input-bordered w-full"
                  disabled={loading}
                />
              </div>
            </div>
          )}
        </div>

        {/* Long details */}
        <div>
          <label className="label">
            <span className="label-text">বিস্তারিত বিবরণ (বাংলা)</span>
          </label>
          <textarea
            {...register("longDetails")}
            rows={5}
            placeholder="আপনার প্রোডাক্টের বিস্তারিত বর্ণনা দিন"
            className="textarea textarea-bordered w-full"
            disabled={loading}
          />
        </div>

        {/* Ingredients dynamic */}
        <div className="border p-3 rounded-lg">
          <h3 className="font-semibold">উপাদান (ঐচ্ছিক)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3 items-end">
            <div>
              <label className="label">
                <span className="label-text">নাম</span>
              </label>
              <input
                value={ingName}
                onChange={(e) => setIngName(e.target.value)}
                className="input w-full"
                placeholder="উদাহরণ: ময়দা"
                disabled={loading}
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">পরিমাণ</span>
              </label>
              <input
                value={ingQty}
                onChange={(e) => setIngQty(e.target.value)}
                className="input input-bordered w-full"
                placeholder="উদাহরণ: 100g বা 500kcal"
                disabled={loading}
              />
            </div>
            <div>
              <button
                type="button"
                className="btn btn-primary w-full"
                onClick={addIngredient}
                disabled={loading}
              >
                Add
              </button>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap mt-3">
            {ingredients.map((it, i) => (
              <span
                key={i}
                className="badge badge-outline"
                style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
              >
                {it.name} — {it.quantity}
                <button
                  type="button"
                  onClick={() => removeIngredient(i)}
                  className="ml-2 text-red-500"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Nutrition dynamic */}
        <div className="border p-3 rounded-lg">
          <h3 className="font-semibold">পুষ্টি (ঐচ্ছিক)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3 items-end">
            <div>
              <label className="label">
                <span className="label-text">নাম</span>
              </label>
              <input
                value={nutName}
                onChange={(e) => setNutName(e.target.value)}
                placeholder="উদাহরণ: Protine বা প্রোটিন"
                className="input input-bordered w-full"
                disabled={loading}
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">মাণ</span>
              </label>
              <input
                value={nutQty}
                onChange={(e) => setNutQty(e.target.value)}
                type="text"
                placeholder="উদাহরণ: 100g বা 500kcal"
                className="input input-bordered w-full"
                disabled={loading}
              />
            </div>
            <div>
              <button
                type="button"
                className="btn btn-primary w-full"
                onClick={addNutrition}
                disabled={loading}
              >
                Add
              </button>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap mt-3">
            {nutrition.map((it, i) => (
              <span
                key={i}
                className="badge badge-outline"
                style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
              >
                {it.name} — {it.quantity}
                <button
                  type="button"
                  onClick={() => removeNutrition(i)}
                  className="ml-2 text-red-500"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Shipping & return */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
          <div>
            <input
              type="checkbox"
              {...register("isShippingDhaka")}
              className="checkbox"
              checked={shipToDhaka}
              onClick={() => setShipToDhaka(!shipToDhaka)}
              disabled={loading}
            />
            <label
              className="label"
              onClick={() => setShipToDhaka(!shipToDhaka)}
            >
              <span className="label-text ml-2">ঢাকায় শিপিং আছে?</span>
            </label>
          </div>

          {shipToDhaka && (
            <>
              <div>
                <input
                  type="number"
                  {...register("shipDurationDhaka")}
                  min={0}
                  className="input input-bordered w-full"
                  placeholder="ঢাকায় শিপিং ডিউরেশন (দিন)"
                  disabled={loading}
                />
              </div>

              <div>
                <input
                  type="number"
                  {...register("returnTimeDhaka")}
                  min={0}
                  className="input input-bordered w-full"
                  placeholder="ঢাকায় রিটার্ন সময় (দিন)"
                  disabled={loading}
                />
              </div>
            </>
          )}
        </div>

        {/* Shipping & return */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
          <div>
            <input
              type="checkbox"
              {...register("isShippingDhaka")}
              className="checkbox"
              checked={shipToOutside}
              onClick={() => setShipToOutside(!shipToOutside)}
              disabled={loading}
            />
            <label
              className="label"
              onClick={() => setShipToOutside(!shipToOutside)}
            >
              <span className="label-text ml-2">ঢাকার বাইরে শিপিং আছে?</span>
            </label>
          </div>

          {shipToOutside && (
            <>
              <div>
                <input
                  type="number"
                  {...register("shipDurationOutside")}
                  min={0}
                  className="input input-bordered w-full"
                  placeholder="ঢাকার বাইরে শিপিং ডিউরেশন (দিন)"
                  disabled={loading}
                />
              </div>

              <div>
                <input
                  type="number"
                  {...register("returnTimeOutside")}
                  min={0}
                  className="input input-bordered w-full"
                  placeholder="ঢাকার বাইরে রিটার্ন সময় (দিন)"
                  disabled={loading}
                />
              </div>
            </>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            className={`btn btn-primary ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? "অপেক্ষা করুন..." : "প্রোডাক্ট তৈরি করুন"}
          </button>

          <button
            type="button"
            className="btn"
            onClick={resetForm}
            disabled={loading}
          >
            ফর্ম রিসেট
          </button>
        </div>
      </form>

      <p className="text-xs text-gray-500 mt-4">
        নোট: শিরোনাম ও বর্ণনা **বাংলা** ভাষায় দেবেন। সংক্ষিপ্ত বর্ণনা অবশ্যই
        ৪০-১৫০ অক্ষরের মধ্যে হবে। ছবি আপলোডের পরে সাবমিট করলে ইমেজগুলো imgbb তে
        আপলোড হয়ে URL তৈরি হবে।
      </p>
    </div>
  );
}
