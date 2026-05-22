import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { authStore } from "../store/AuthStore";
import UserProfile from "../components/ui/UserProfile";

export default function DashboardLayout() {
  const logout = authStore((state) => state.logout);
  const isAuthenticated = authStore((state) => state.isAuthenticated);
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  if (!isAuthenticated) {
    return <Navigate to="/login-form" />;
  }

  // List menu untuk memudahkan rendering
  const menus = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Biodata", path: "/mybiograph" },
    { name: "Category", path: "/category" },
    { name: "Pembicara", path: "/pembicara" },
    { name: "Event", path: "/event" },
  ];

  return (
    <div className="flex w-full min-h-screen bg-gray-100">
      <div className="bg-[#0084FF] w-80 flex flex-col justify-between p-8 shadow-xl">
        <div className="flex flex-col gap-26">
          <Link to="/mybiograph">
            <UserProfile
              name="Gezsyx"
              Url="https://res.cloudinary.com/dnyw0exi5/image/upload/v1779475130/Tak_berjudul424_20260523013706_jzwyqb.png"
            />
          </Link>

          {/* Menu Navigasi */}
          <nav>
            <ul className="flex flex-col gap-4 text-center">
              {menus.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`block py-2 text-xl font-medium transition-all ${
                      location.pathname === item.path
                        ? "text-white underline decoration-2 underline-offset-8"
                        : "text-blue-100 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Tombol Logout - Menggunakan warna kuning spesifik */}
        <div className="mt-auto">
          <button
            type="button"
            className="w-full py-3 bg-[#FFB800] text-white text-xl font-bold rounded-2xl shadow-md hover:bg-amber-500 transition-colors cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="bg-white min-h-full p-8 shadow-sm">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
