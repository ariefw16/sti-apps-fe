import axios from "axios";
import { SettingsData } from "../types/settings.type";

export async function fetchSettings() {
  try {
    const result = await axios.get<SettingsData[]>("settings");
    return result.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function saveSettings(data: SettingsData) {
  try {
    const result = await axios.patch<SettingsData>(
      `settings/${data.key}`,
      data
    );
    return result.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function findSettings(key: string): Promise<SettingsData> {
  try {
    const result = await axios.get(`settings/key/${key}`);
    return result.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
