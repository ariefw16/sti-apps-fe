import { Paper, Table } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import moment from "moment";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { fetchActiveIncident } from "../../Incident/utils/service";
import { Incident } from "../../Incident/utils/type";

export default function DashboardIncidentCard() {
  const [incident, setIncident] = useState<Incident[]>([]);
  const socket = io(`ws://localhost:3400`);

  useEffect(() => {
    const fetchIncident = () => {
      fetchActiveIncident()
        .then((res) => {
          console.log(res);
          setIncident(res);
        })
        .catch((e) => {
          showNotification({
            title: "Fetch Active Incident",
            message: `Error! ${e.message}`,
            color: "red",
          });
        });
    };
    socket.on("connect", () => {
      fetchIncident();
      console.log("websocket connected!");
    });
    //Type result callback
    //data : {type:'down'|'up', id:number}
    socket.on("incident", (data) => {
      fetchIncident();
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
          {incident.length < 1 && (
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>
                <i>No Data Found.</i>
              </td>
            </tr>
          )}
          {incident.map((i, idx) => (
            <tr key={idx}>
              <td>
                {i.unit?.name} ({i.device?.ipAddress})
              </td>
              <td>{moment(i.eventDate).format("DD-MMM-YYYY HH:mm")}</td>
              <td>123</td>
              <td>123</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Paper>
  );
}
