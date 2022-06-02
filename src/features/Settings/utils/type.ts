export interface SettingsData {
  id?: number;
  key: string;
  value?: string;
  params?: string;
}

export interface VpnNotificationSetting {
  reminderInterval: string;
  reminderVals: string;
}
