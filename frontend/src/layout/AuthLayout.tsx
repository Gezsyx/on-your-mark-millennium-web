import { Outlet } from "react-router-dom";
export default function AuthLayout() {
  return (
    <div className="grid grid-cols-2 items-center min-h-screen">
      <div className="bg-gray-50 h-screen flex flex-col items-center justify-center">
        <img
          src="https://res.cloudinary.com/dnyw0exi5/image/upload/v1779452387/bg-login_kj3sld.png"
          alt=""
          className="h-full object-cover"
        />
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
}
