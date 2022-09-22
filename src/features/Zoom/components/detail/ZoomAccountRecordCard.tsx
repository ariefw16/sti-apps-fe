import {
  Box,
  Button,
  Group,
  LoadingOverlay,
  Menu,
  Paper,
  Select,
  Table,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import moment from "moment";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ChevronDown, Download, Video } from "tabler-icons-react";
import { MONTH, SelectOptions } from "../../../../types/common";
import { fetchZoomAccountRecording } from "../../utils/service";
import {
  zoomAccountDetailState,
  zoomAccountDownloadDialogState,
} from "../../utils/store";
import { ZoomAccountRecord } from "../../utils/type";
import ZoomAccountRecordDownloadModal from "./ZoomAccountRecordDownloadModal";

export default function ZoomAccountRecordCard() {
  const year: SelectOptions[] = [];
  const [monthSelected, setMonthSelected] = useState("");
  const [yearSelected, setYearSelected] = useState("");
  const [record, setRecord] = useState<ZoomAccountRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const account = useRecoilValue(zoomAccountDetailState);
  const setShowDownload = useSetRecoilState(zoomAccountDownloadDialogState);

  for (let i = 2022; i <= new Date().getFullYear(); i++) {
    year.push({
      label: i.toString(),
      value: i.toString(),
    });
  }

  const viewButtonHandler = () => {
    setLoading(true);
    fetchZoomAccountRecording({
      year: yearSelected,
      month: monthSelected,
      id: account.id!,
    })
      .then((res) => {
        setRecord(res);
      })
      .catch((e) => {
        showNotification({
          title: "Fetch Recording",
          message: `Error! ${e.message}`,
          color: "red",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const monthSelectHandler = (vals: string) => {
    setMonthSelected(vals);
  };
  const yearSelectHandler = (vals: string) => {
    setYearSelected(vals);
  };
  const downloadRecordingHandler = (uuid: string) => {
    setShowDownload({
      showModal: true,
      meetingId: uuid,
      accountId: account.id!,
    });
  };

  return (
    <>
      <Paper mt={10} radius="lg" p="lg">
        <Group position="apart">
          <Group>
            <Select
              data={MONTH}
              label="Select Month"
              onChange={monthSelectHandler}
            />
            <Select
              data={year}
              label="Select Year"
              onChange={yearSelectHandler}
            />
          </Group>
          <Button
            rightIcon={<Video />}
            radius="lg"
            variant="light"
            color={"teal"}
            onClick={viewButtonHandler}
          >
            View Records
          </Button>
        </Group>
      </Paper>
      <Box style={{ position: "relative" }}>
        <LoadingOverlay visible={loading} />
        <Paper mt={10} radius="lg" p="lg">
          <Table>
            <thead>
              <tr>
                <th>Agenda / Title / Topic</th>
                <th>Start Time</th>
                <th>Duration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {record.length < 1 ? (
                <tr>
                  <td colSpan={4} align="center">
                    No Data Found.
                  </td>
                </tr>
              ) : (
                record
                  .filter((r) => r.duration && r.duration > 5)
                  .map((r, idx) => (
                    <tr key={idx}>
                      <td>{r.topic}</td>
                      <td>{moment(r.start_time).format("DD/MM/YYYY HH:mm")}</td>
                      <td>{r.duration} min</td>
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
                            icon={<Download size={14} />}
                            onClick={() => {
                              downloadRecordingHandler(r.uuid!);
                            }}
                          >
                            Download Recording
                          </Menu.Item>
                        </Menu>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </Table>
        </Paper>
      </Box>
      <ZoomAccountRecordDownloadModal />
    </>
  );
}
