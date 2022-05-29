import { Grid } from "@mantine/core";

import VpnNotifications from "./VpnNotifications";

export default function Notifications() {
  return (
    <Grid>
      <Grid.Col span={4}>
        <VpnNotifications />
      </Grid.Col>
    </Grid>
  );
}
