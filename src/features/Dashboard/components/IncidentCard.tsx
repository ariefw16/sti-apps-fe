import { Paper, Table, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { fetchActiveIncident } from "../../Incident/utils/service";
import { activeIncidentState } from "../utils/store";

export default function DashboardIncidentCard() {
  const [incident, setIncident] = useRecoilState(activeIncidentState);

  useEffect(() => {
    fetchActiveIncident()
      .then((res) => {
        setIncident(res);
      })
      .catch((e) => {
        showNotification({
          title: "Fetch Incident",
          message: `Error! ${e.message}`,
          color: "red",
        });
      });
  }, []);

  return (
    <Paper radius={"lg"} p={20}>
      <Table verticalSpacing={"sm"}>
        <thead>
          <tr>
            <th style={{ width: "40%" }}>Unit</th>
            <th style={{ width: "20%" }}>Downtime</th>
            <th style={{ width: "20%" }}>Last Update</th>
            <th style={{ width: "10%" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {incident.map((i, idx) => (
            <tr key={idx}>
              <td>
                {i.unit?.name} ({i.device?.ipAddress})
              </td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
            </tr>
          ))}
          <tr>
            <td>123</td>
            <td>123</td>
            <td>123</td>
            <td>123</td>
          </tr>
          <tr>
            <td>123</td>
            <td>123</td>
            <td>123</td>
            <td>123</td>
          </tr>
        </tbody>
      </Table>
    </Paper>
  );
}
