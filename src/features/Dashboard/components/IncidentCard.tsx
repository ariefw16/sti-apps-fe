import { Paper, Table, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { io } from "socket.io-client";
import { fetchActiveIncident } from "../../Incident/utils/service";
import { activeIncidentState } from "../utils/store";

export default function DashboardIncidentCard() {
  const [incident, setIncident] = useRecoilState(activeIncidentState);
  const socket = io(`http://localhost:3400/dashboard`);

  useEffect(() => {
    socket.on("incident", (args) => {
      console.log("ok");
      console.log(args);
    });
    socket.on("connect_error", () => {
      console.log("err");
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
