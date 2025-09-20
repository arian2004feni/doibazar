import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Plus, Minus, X } from "lucide-react";
import { TiArrowLeftThick, TiArrowRightThick } from "react-icons/ti";

const CartPage = () => {
  const [step, setStep] = useState(1);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Cupcake Delights",
      category: "Cakes & Pastries",
      image: "/item1.png",
      price: 150,
      discount: 10,
      quantity: 1,
    },
    {
      id: 2,
      name: "Artisan Sourdough",
      category: "Breads",
      image: "/item2.png",
      price: 250,
      discount: 0,
      quantity: 2,
    },
  ]);
  const [shippingOption, setShippingOption] = useState(70);
  const [cashOnDelivery, setCashOnDelivery] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleTotalWithDiscount = (item) => {
    return item.price - (item.price * item.discount) / 100;
  };

  const handleQuantityChange = (id, change) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) => {
          if (item.id === id) {
            const newQuantity = item.quantity + change;
            return {
              ...item,
              quantity: newQuantity > 0 ? newQuantity : 1,
            };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) =>
        item.discount
          ? total + handleTotalWithDiscount(item) * item.quantity
          : total + item.price * item.quantity,
      0
    );
  };

  const calculateTotal = () => {
    return calculateSubtotal() + shippingOption;
  };

  const onError = (errors) => {
    if (errors) {
      Swal.fire({
        text: "Please fill the required field",
        icon: "error",
        width: "20em",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setStep(2);
  };

  const onSubmit = (data) => {
    Swal.fire({
      title: "Order Submitted!",
      text: "Your order has been placed successfully.",
      icon: "success",
      confirmButtonText: "Ok",
    });
    const payload = {
      ...data,
      totalTaka: calculateTotal(),
      cartItems,
      shippingOption,
      cashOnDelivery,
    };
    console.log(payload);
  };

  

  return (
    <div className="max-w-4xl mx-auto p-4">
      {cartItems.length > 0 ? (
        <>
          <div className="flex justify-center">
            <ul className="steps steps-vertical lg:steps-horizontal w-lg">
              <li
                onClick={() => setStep(1)}
                className={`step cursor-default ${
                  step >= 1 ? "step-primary" : ""
                }`}
              >
                Cart Items
              </li>
              <li
                onClick={() => setStep(2)}
                className={`step cursor-default ${
                  step >= 2 ? "step-primary" : ""
                }`}
              >
                Delivery Address
              </li>
              <li
                onClick={() => setStep(3)}
                className={`step cursor-default ${
                  step >= 3 ? "step-primary" : ""
                }`}
              >
                Billing Summary
              </li>
            </ul>
          </div>

          <div className="mt-8">
            {step === 1 && (
              <div className="bg-base-100 p-6">
                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead>
                      <tr className="bg-gray-50/60">
                        <th className="text-center">Product</th>
                        <th className="pl-9">Quantity</th>
                        <th className="text-center">Price</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <div className="flex items-center space-x-8">
                              <div
                                className={`${
                                  item.discount ? "indicator" : ""
                                } w-20`}
                              >
                                {item.discount ? (
                                  <span className="indicator-item indicator-top indicator-end badge badge-warning badge-xs">
                                    {item.discount}%
                                  </span>
                                ) : (
                                  ""
                                )}
                                <img src={item.image} alt={item.name} />
                              </div>
                              <div>
                                <div className="text-sm opacity-50">
                                  {item.category}
                                </div>
                                <div className="font-bold">{item.name}</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="flex items-center border border-amber-600 w-fit rounded-full p-[2px]">
                              <button
                                className="btn btn-circle hover:bg-transparent bg-transparent border-none btn-sm"
                                onClick={() =>
                                  handleQuantityChange(item.id, -1)
                                }
                              >
                                <Minus className="text-amber-600" size={16} />
                              </button>
                              <span className="font-bold size-8 flex justify-center items-center rounded-full bg-amber-500 text-white">
                                {item.quantity}
                              </span>
                              <button
                                className="btn btn-circle btn-sm hover:bg-transparent bg-transparent border-none"
                                onClick={() => handleQuantityChange(item.id, 1)}
                              >
                                <Plus className="text-amber-600" size={16} />
                              </button>
                            </div>
                          </td>
                          <td>
                            <div className="flex flex-col items-center">
                              {item.discount ? (
                                <span className="text-xs text-gray-500 line-through">
                                  ৳{item.price * item.quantity}
                                </span>
                              ) : (
                                ""
                              )}
                              {item.discount ? (
                                <span className="font-bold text-xl">
                                  ৳
                                  {handleTotalWithDiscount(item) *
                                    item.quantity}
                                  <span className="align-super text-xs">
                                    /kg
                                  </span>
                                </span>
                              ) : (
                                <span className="font-bold text-xl">
                                  ৳{item.price * item.quantity}
                                  <span className="align-super text-xs">
                                    /kg
                                  </span>
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="text-center">
                            <button
                              className="btn btn-circle btn-sm bg-transparent"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <X size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-gray-50">
                        <th className="text-center">Total</th>
                        <th></th>
                        <th className="text-center">৳{calculateSubtotal()}</th>
                        <th></th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                {/* <div className="font-bold text-xl flex gap-40 justify-center">
                  <span>Total</span><span>৳{calculateSubtotal().toFixed(2)}</span>
                </div> */}
              </div>
            )}

            <form
              className={`${step === 2 ? "" : "hidden"} bg-base-100 p-6`}
              onSubmit={handleSubmit(onSubmit, onError)}
            >
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="input input-bordered w-full"
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm">
                      Name is required
                    </span>
                  )}
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="input input-bordered w-full"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm">
                      Email is required
                    </span>
                  )}
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Contact Number</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your contact number"
                    className="input input-bordered w-full"
                    {...register("contactNumber", { required: true })}
                  />
                  {errors.contactNumber && (
                    <span className="text-red-500 text-sm">
                      Contact number is required
                    </span>
                  )}
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Division</span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    {...register("division", { required: true })}
                  >
                    <option value="Dhaka">Dhaka</option>
                    <option value="Coming Soon" disabled>
                      --Coming Soon--
                    </option>
                  </select>
                  {errors.division && (
                    <span className="text-red-500 text-sm">
                      Division is required
                    </span>
                  )}
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">District</span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    {...register("district", { required: true })}
                  >
                    <option value="Dhaka">Dhaka</option>
                    <option value="Coming Soon" disabled>
                      --Coming Soon--
                    </option>
                  </select>
                  {errors.district && (
                    <span className="text-red-500 text-sm">
                      District is required
                    </span>
                  )}
                </div>
                <div>
                  <label className="label">
                    <span className="label">Post Code (Optional)</span>
                  </label>
                  <input
                    className="input input-bordered w-full"
                    type="number"
                    {...register("postCode")}
                    placeholder="e.g., 1200"
                  />
                </div>
                <div className="col-span-3 grid grid-cols-2 gap-5">
                  <div>
                    <label className="label">
                      <span className="label-text">Address</span>
                    </label>
                    <input
                      className="input input-bordered w-full"
                      placeholder="Enter your detailed address"
                      {...register("address", { required: true })}
                    />
                    {errors.address && (
                      <span className="text-red-500 text-sm">
                        Address is required
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text">
                        Additional Notes (optional)
                      </span>
                    </label>
                    <input
                      className="input input-bordered w-full"
                      placeholder="e.g., specific delivery instructions"
                      {...register("notes")}
                    />
                  </div>
                </div>
              </div>
              {/* The form submission logic is handled by the buttons below */}
            </form>
            {step === 3 && (
              <div className="bg-base-100 p-6">
                <div className="space-y-4">
                  <div>
                    <div className="overflow-x-auto border border-base-content/5 font-bold bg-base-100">
                      <table className="table">
                        <tbody>
                          {/* row 1 */}
                          <tr>
                            <td>
                              <div className="form-control">
                                <label className="label cursor-pointer justify-start gap-4">
                                  <input
                                    type="radio"
                                    name="shipping"
                                    className="radio radio-primary"
                                    checked={shippingOption === 70}
                                    onChange={() => setShippingOption(70)}
                                  />
                                  <span className="label-text">
                                    Regular Home Delivery (1-3 days)
                                  </span>
                                </label>
                              </div>
                            </td>
                            <td className="text-black/60">৳70</td>
                          </tr>
                          {/* row 2 */}
                          <tr>
                            <td>
                              <div className="form-control">
                                <label className="label cursor-pointer justify-start gap-4">
                                  <input
                                    type="radio"
                                    name="shipping"
                                    className="radio checked:bg-blue-500"
                                    checked={shippingOption === 0}
                                    onChange={() => setShippingOption(0)}
                                  />
                                  <span className="label-text">
                                    Pick from Shop (1-3 days)
                                  </span>
                                </label>
                              </div>
                            </td>
                            <td className="text-black/60">৳0</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="overflow-x-auto bg-amber-50/40 rounded-none border border-base-content/5">
                    <table className="table">
                      <tbody>
                        {/* row 1 */}
                        <tr>
                          <td className="text-center">Subtotal</td>
                          <td>
                            <span>৳{calculateSubtotal()}</span>
                          </td>
                        </tr>
                        {/* row 2 */}
                        <tr>
                          <td className="text-center">Shipping</td>
                          <td>৳{shippingOption}</td>
                        </tr>
                        {/* row 3 */}
                        <tr>
                          <td className="text-center">Total</td>
                          <td>৳{calculateTotal()}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="form-control flex-row items-center justify-end mt-4">
                    <label className="label cursor-pointer gap-2">
                      <input
                        type="checkbox"
                        checked={cashOnDelivery}
                        onChange={(e) => setCashOnDelivery(e.target.checked)}
                        className="checkbox checkbox-primary"
                      />
                      <span className="label-text font-medium">
                        Cash on Delivery
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-end mt-8 gap-3">
            {step > 1 && (
              <button className="btn btn-lg btn-ghost" onClick={handlePrevStep}>
                <TiArrowLeftThick /> Back
              </button>
            )}
            <div></div>
            {step < 3 && (
              <button
                className="btn btn-lg btn-primary"
                onClick={handleNextStep}
              >
                Next <TiArrowRightThick />
              </button>
            )}
            {step === 3 && (
              <button
                className="btn btn-lg btn-primary"
                onClick={handleSubmit(onSubmit, onError)}
                type="submit"
              >
                Checkout
              </button>
            )}
          </div>
        </>
      ) : (
        <p className="text-center mt-20 text-2xl text-gray-500">
          Your cart is empty.
        </p>
      )}
    </div>
  );
};

export default CartPage;
