import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>
      <main className="container mx-auto p-6 pt-24 max-w-7xl">
        <Outlet />
      </main>

      <Footer />

      {/* <footer className="bg-red-950 text-center p-4 text-white">
        &copy; 2024 My Web Project. All rights reserved.
      </footer> */}
    </div>
  );
}
