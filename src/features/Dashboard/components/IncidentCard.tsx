import { Badge, Button, Menu, Paper, Table } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { ChevronDown, Eye } from "tabler-icons-react";
import { fetchActiveIncident } from "../../Incident/utils/service";
import { Incident } from "../../Incident/utils/type";

export default function DashboardIncidentCard() {
  const [incident, setIncident] = useState<Incident[]>([]);
  const socket = io(`ws://localhost:3400`);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIncident = () => {
      fetchActiveIncident()
        .then((res) => {
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
            <th style={{ width: "35%" }}>Unit</th>
            <th style={{ width: "25%" }}>Downtime</th>
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
          {incident.map((i, idx) => {
            const diff = moment().diff(
              moment(i.eventDate).format("DD-MMM-YYYY HH:mm"),
              "seconds"
            );
            const diffDay = diff / (3600 * 24);
            const diffHours = (diff % (3600 * 24)) / 3600;
            const diffMinutes = (diff % 3600) / 60;
            return (
              <tr key={idx}>
                <td>
                  {i.unit?.name} ({i.device?.ipAddress})
                </td>
                <td>
                  <Badge color={"red"}>
                    {diffDay > 1 ? `${Math.floor(diffDay)} Hari` : ""}{" "}
                    {diffHours > 1 ? `${Math.floor(diffHours)} Jam` : ""}{" "}
                    {diffMinutes > 1 ? `${Math.floor(diffMinutes)} Menit` : ""}
                  </Badge>
                </td>
                <td>{moment(i.lastUpdate).format("DD-MMM-YYYY HH:mm")}</td>
                <td>
                  <Menu
                    control={
                      <Button
                        size="xs"
                        variant="light"
                        rightIcon={<ChevronDown size={14} />}
                      >
                        Actions
                      </Button>
                    }
                  >
                    <Menu.Item
                      icon={<Eye size={14} />}
                      onClick={() => {
                        navigate(`/incident/${i.id}`);
                      }}
                    >
                      View
                    </Menu.Item>
                  </Menu>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Paper>
  );
}
