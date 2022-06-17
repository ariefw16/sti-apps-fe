import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import { NothingFoundBackground } from "./components/layout/AppLayout/error-404";
import DashboardPage from "./features/Dashboard";
import DeviceTypePage from "./features/DeviceType";
import SettingPage from "./features/Settings";
import UnitPage from "./features/Unit";
import UserPage from "./features/Users";
import VPNPage from "./features/Vpn";
import DeviceTypeDetailPage from "./features/DeviceType/detail";
import DevicePage from "./features/Devices";
import CreateDevicePage from "./features/Devices/create";
import EditDevicePage from "./features/Devices/edit";
import DetailDevicePage from "./features/Devices/detail";
import IncidentPage from "./features/Incident";
import LoginPage from "./features/Auth/login";
import AuthLayout from "./components/layout/AuthLayout";

function App() {
  axios.defaults.baseURL = "http://localhost:3400/";
  const token = localStorage.getItem("accessToken");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/unit" element={<UnitPage />} />
          <Route path="/settings" element={<SettingPage />} />
          <Route path="/vpn" element={<VPNPage />} />
          <Route path="/device-type" element={<DeviceTypePage />} />
          <Route path="/device-type/:id" element={<DeviceTypeDetailPage />} />
          <Route path="/device" element={<DevicePage />} />
          <Route path="/device/create" element={<CreateDevicePage />} />
          <Route path="/device/:id/edit" element={<EditDevicePage />} />
          <Route path="/device/:id" element={<DetailDevicePage />} />
          <Route path="/incident" element={<IncidentPage />} />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<LoginPage />} />
        </Route>
        <Route path="*" element={<NothingFoundBackground />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
