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
import DetailIncidentPage from "./features/Incident/detail";
import ZoomAccountPage from "./features/Zoom";
import CreateZoomAccountPage from "./features/Zoom/create";
import DetailZoomAccount from "./features/Zoom/detail";
import EditZoomAccountPage from "./features/Zoom/edit";
import MeetingPage from "./features/Meeting";
import CreateMeetingPage from "./features/Meeting/create";
import DetailMeetingPage from "./features/Meeting/detail";
import EditMeetingPage from "./features/Meeting/edit";
import GroupPage from "./features/Group";
import DetailDeviceTemplate from "./features/DeviceTemplate/detail";
import EditDeviceTemplate from "./features/DeviceTemplate/edit";
import CreateDeviceTemplate from "./features/DeviceTemplate/create";
import AccessDoorPage from "./features/AccessDoor";
import RequestMeetingPage from "./features/Meeting/request";
import InspectionTemplatePage from "./features/InspectionTemplate";
import DetailInspectionTemplatePage from "./features/InspectionTemplate/detail";
import EditInspectionTemplatePage from "./features/InspectionTemplate/edit";
import InspectionPage from "./features/Inspection";

function App() {
  axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;
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
          <Route path="/incident/:id" element={<DetailIncidentPage />} />
          <Route path="/zoom-account" element={<ZoomAccountPage />} />
          <Route
            path="/zoom-account/create"
            element={<CreateZoomAccountPage />}
          />
          <Route
            path="/zoom-account/:id/edit"
            element={<EditZoomAccountPage />}
          />
          <Route path="/zoom-account/:id" element={<DetailZoomAccount />} />
          <Route path="/meetings" element={<MeetingPage />} />
          <Route path="/meetings/create" element={<CreateMeetingPage />} />
          <Route path="/meetings/:id/edit" element={<EditMeetingPage />} />
          <Route path="/meetings/:id" element={<DetailMeetingPage />} />
          <Route path="/groups" element={<GroupPage />} />
          <Route
            path="/device-template/create"
            element={<CreateDeviceTemplate />}
          />
          <Route
            path="/device-template/:id/edit"
            element={<EditDeviceTemplate />}
          />
          <Route
            path="/device-template/:id"
            element={<DetailDeviceTemplate />}
          />
          <Route path="/access-door" element={<AccessDoorPage />} />
          <Route
            path="/inspection-template"
            element={<InspectionTemplatePage />}
          />
          <Route
            path="/inspection-template/:id/edit"
            element={<EditInspectionTemplatePage />}
          />
          <Route
            path="/inspection-template/:id"
            element={<DetailInspectionTemplatePage />}
          />
          <Route path="/inspection" element={<InspectionPage />} />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<LoginPage />} />
        </Route>
        <Route path="*" element={<NothingFoundBackground />} />
        <Route path="/meeting-request" element={<RequestMeetingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
