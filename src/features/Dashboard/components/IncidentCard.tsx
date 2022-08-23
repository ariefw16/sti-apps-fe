import { Paper, Table, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { io } from "socket.io-client";
import { activeIncidentState } from "../utils/store";

export default function DashboardIncidentCard() {
  const [incident, setIncident] = useRecoilState(activeIncidentState);
  const socket = io(`ws://localhost:3400`);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.io.engine.transport.name);
    });
    socket.on("incident", (data) => {
      console.log("ok");
      console.log(data);
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
