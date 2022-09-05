import { Table } from "@mantine/core";
import moment from "moment";
import { useRecoilValue } from "recoil";
import { accessDoorListState } from "../utils/store";

export default function AccessDoorListTable() {
  const rowHeaderStyle = { color: "GrayText", fontWeight: 500 };
  const data = useRecoilValue(accessDoorListState);

  return (
    <Table>
      <thead>
        <tr>
          <th style={rowHeaderStyle}>Time</th>
          <th style={rowHeaderStyle}>User</th>
        </tr>
      </thead>
      <tbody>
        {data.map((log, idx) => (
          <tr key={idx}>
            <td>{moment(log.logDate).format("ddd, DD-MMM-YYYY HH:mm")}</td>
            <td>{log.user}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
