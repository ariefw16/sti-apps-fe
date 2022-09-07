import { Button, Loader, Modal, Table, TextInput } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { Download } from "tabler-icons-react";
import { getDownloadLinkRecording } from "../../utils/service";
import {
  zoomAccountDetailState,
  zoomAccountDownloadDialogState,
} from "../../utils/store";
import { ZoomAccountRecordDownload } from "../../utils/type";

export default function ZoomAccountRecordDownloadModal() {
  const props = useRecoilValue(zoomAccountDownloadDialogState);
  const resetProps = useResetRecoilState(zoomAccountDownloadDialogState);
  const account = useRecoilValue(zoomAccountDetailState);
  const [download, setDownload] = useState<ZoomAccountRecordDownload>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.showModal) {
      setLoading(true);
      getDownloadLinkRecording({
        id: account.id!,
        meetingId: props.meetingId!,
      })
        .then((res) => {
          setDownload(res);
        })
        .catch((e) => {
          showNotification({
            title: "Fetch Download Link",
            message: `Error! ${e.message}`,
            color: "red",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setDownload(undefined);
    }
  }, [props.meetingId]);

  return (
    <Modal
      size={"lg"}
      opened={props.showModal}
      onClose={resetProps}
      radius="lg"
      title="Download Recordings"
    >
      <TextInput
        readOnly
        variant="filled"
        label="Topic"
        description="Meeting Topic / Agenda / Title"
        value={download?.topic ?? ""}
        my="md"
        rightSection={loading && <Loader size={"sm"} />}
      />
      <TextInput
        readOnly
        variant="filled"
        label="Share URL"
        description="URL used to share with other"
        value={download?.share_url ?? ""}
        my="md"
        rightSection={loading && <Loader size={"sm"} />}
      />
      <TextInput
        readOnly
        variant="filled"
        label="Share Password"
        description="Password to access Shared URL above"
        value={download?.password ?? ""}
        my="md"
        rightSection={loading && <Loader size={"sm"} />}
      />
      <Table>
        <thead>
          <tr>
            <th style={{ width: "20%" }}>File Type</th>
            <th style={{ width: "50%" }}>Recording Type</th>
            <th>Download Link</th>
          </tr>
        </thead>
        <tbody>
          {download?.recording_files?.map((r) => (
            <tr key={r.id}>
              <td>{r.file_type}</td>
              <td>{r.recording_type}</td>
              <td>
                <Button
                  variant="outline"
                  leftIcon={<Download />}
                  size="xs"
                  onClick={() => {
                    window.open(
                      r.download_url,
                      "_blank",
                      "noopener,noreferrer"
                    );
                  }}
                >
                  Download
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Modal>
  );
}
