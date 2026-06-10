import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Competition from "./pages/Competition";
import Homepage from "./pages/HomePage";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import Seminar from "./pages/Seminar";
import TalkShow from "./pages/TalkShow";
import Workshop from "./pages/Workshop";
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import DashboardIndex from "./pages/dashboard/dashboardIndex";
import RouteGuard from "./routes/RouteGuard";
import DashboardLayout from "./layout/DashboardLayout";
import CategoryIndex from "./pages/dashboard/category/CategoryIndex";
import PembicaraIndex from "./pages/dashboard/pembicara/PembicaraIndex";
import EventIndex from "./pages/dashboard/event/EventIndex";
import CategoryCreate from "./pages/dashboard/category/CreateCetegory";
import CreatePembicara from "./pages/dashboard/pembicara/CreatePembicara";
import CreateEvent from "./pages/dashboard/event/CreateEvent";
import EditEvent from "./pages/dashboard/event/EditEvent";
import EditCategory from "./pages/dashboard/category/EditCategory";
import EditPembicara from "./pages/dashboard/pembicara/EditPembicara";
import MyBiograph from "./pages/dashboard/MyBiograph";
import UserIndex from "./pages/dashboard/user/UserIndex";
import EditUser from "./pages/dashboard/user/EditUser";
import CreateUser from "./pages/dashboard/user/CreateUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/seminar" element={<Seminar />} />
          <Route path="/talkshow" element={<TalkShow />} />
          <Route path="/competition" element={<Competition />} />
          <Route path="/workshop" element={<Workshop />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login-form" element={<LoginForm />} />
          <Route path="/daftar-form" element={<RegisterForm />} />
        </Route>

        <Route element={<RouteGuard />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardIndex />} />
            <Route path="/mybiograph" element={<MyBiograph />} />
            <Route path="/user" element={<UserIndex/>}/>
            <Route path="/user/create-user" element={<CreateUser/>}/>
            <Route path="/user/edit-user/:id" element={<EditUser/>}/>
            <Route path="/category" element={<CategoryIndex />} />
            <Route
              path="/category/create-category"
              element={<CategoryCreate />}
            />
            <Route path="/category/edit/:id" element={<EditCategory />} />
            <Route path="/pembicara" element={<PembicaraIndex />} />
            <Route
              path="/pembicara/create-pembicara"
              element={<CreatePembicara />}
            />
            <Route path="/pembicara/edit/:id" element={<EditPembicara />} />
            <Route path="/event" element={<EventIndex />} />
            <Route path="/event/create-event" element={<CreateEvent />} />
            <Route path="/events/edit/:id" element={<EditEvent />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
