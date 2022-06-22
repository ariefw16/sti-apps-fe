import { Paper, Table } from "@mantine/core";
import moment from "moment";
import { IncidentLog } from "../../utils/type";

export default function LogDetail(props: { log?: IncidentLog[] }) {
  const { log } = props;
  return (
    <Paper radius={"lg"} p={20}>
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>No.</th>
            <th>Log Date</th>
            <th>Logs</th>
          </tr>
        </thead>
        <tbody>
          {log?.map((l, i) => (
            <tr key={l.id}>
              <td>{i + 1}.</td>
              <td>{moment(l.logDate).format("DD-MMM-YYYY HH:mm:ss")}</td>
              <td>{l.value}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Paper>
  );
}
