import { atom, selector } from "recoil";
import { SettingsData } from "../types/settings.type";

export const settingsState = atom<SettingsData[]>({
  key: "settingsState",
  default: [],
});

export const settingsTriggerState = atom({
  key: "settingsTriggerState",
  default: false,
});

export const notificationSettingState = selector({
  key: "notificationSettingState",
  get: ({ get }) => {
    const keys = ["vpn-reminder"];
    return get(settingsState).filter((f) => keys.includes(f.key));
  },
});
