import useAuth from "../../hooks/useAuth";

export default function Profile() {
  const { user } = useAuth();

  // const { data: userData = {}, refetch } = useQuery({
  //   queryKey: ["userInfo"],
  //   queryFn: async () => {
  //     const res = await axiosSecure.get(`/users/${user?.email}`);
  //     return res.data;
  //   },
  // });

  const userData = {
    firstName: user?.email === "admin@doibazar.com" ? "admin" : "user",
    lastName: user?.email === "admin@doibazar.com" ? "admin" : "user",
    email: user?.email,
    photo: user?.photoUrl || 'https://i.ibb.co.com/JX3zV4J/pngtree-vector-avatar-icon-png-image-889567-removebg-preview.png',
    phoneNumber: '01654789654',
    dateOfBirth: '17/17/1717',
    role: user?.email === "admin@doibazar.com" ? "admin" : "user",
  };
  return (
    <div className="p-6 max-w-4xl mx-auto bg-base-200 rounded-2xl shadow-md my-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome, {userData.firstName || "User"}!</h1>
      </div>

      <div className="grid gap-4">
        <img
          src={userData.photo}
          alt={userData.firstName}
          className="size-20 object-cover rounded-full border"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://i.ibb.co/JX3zV4J/pngtree-vector-avatar-icon-png-image-889567-removebg-preview.png";
          }}
        />
        <p>
          <span className="font-semibold">Name:</span> {userData.firstName} {userData.lastName}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {userData.email}
        </p>
        <p>
          <span className="font-semibold">Phone:</span> {userData.phoneNumber || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Date of Birth:</span>{" "}
          {userData.dateOfBirth || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Role:</span>{" "}
          <span className="badge badge-accent">{`${
            (userData.role === "user" && "User") ||
            (userData.role === "admin" && "Admin") ||
            "N/A"
          }`}</span>
        </p>
      </div>
    </div>
  );
}
