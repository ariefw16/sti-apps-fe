import { Modal, Timeline, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import moment from "moment";
import { useEffect } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { MessageDots } from "tabler-icons-react";
import { fetchActivity } from "../../utils/service";
import { activityListModalState } from "../../utils/store";
import ActivityTimeline from "../detail/ActivityTimeline";

export default function ActivityListModal() {
  const [modal, setModal] = useRecoilState(activityListModalState);
  const resetModal = useResetRecoilState(activityListModalState);

  useEffect(() => {
    if (modal.showModal) {
      fetchActivity(modal.incidentId!)
        .then((res) => {
          setModal((m) => ({ ...m, data: res }));
        })
        .catch((e) => {
          showNotification({
            title: "Fetch Activity",
            message: `Error! ${e.message}`,
            color: "red",
          });
        })
        .finally(() => {});
    }
  }, [modal.showModal]);

  return (
    <Modal
      opened={modal.showModal}
      onClose={resetModal}
      title="Incident Activity List"
      size="lg"
    >
      <ActivityTimeline activity={modal.data} />
    </Modal>
  );
}
