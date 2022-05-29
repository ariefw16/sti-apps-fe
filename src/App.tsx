import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import AppLayout from "./components/layout/AppLayout";
import { NothingFoundBackground } from "./components/layout/AppLayout/error-404";
import DashboardPage from "./features/Dashboard";
import SettingPage from "./features/Settings";
import UnitPage from "./features/Unit";
import UserPage from "./features/Users";
import VPNPage from "./features/Vpn";
import { fetchSettings } from "./services/settings.service";
import { settingsState, settingsTriggerState } from "./stores/settings.store";

function App() {
  axios.defaults.baseURL = "http://localhost:3400/";
  const settingsTrigger = useRecoilValue(settingsTriggerState);
  const setSettings = useSetRecoilState(settingsState);

  useEffect(() => {
    fetchSettings()
      .then((res) => {
        setSettings(res);
      })
      .catch((e) => {
        showNotification({
          title: "Fetch Global Settings",
          message: `Error! ${e.message}`,
          color: "red",
        });
      });
  }, [settingsTrigger]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/unit" element={<UnitPage />} />
          <Route path="/settings" element={<SettingPage />} />
          <Route path="/vpn" element={<VPNPage />} />
        </Route>
        <Route path="*" element={<NothingFoundBackground />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
