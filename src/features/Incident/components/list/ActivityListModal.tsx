import { Modal, Timeline, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import moment from "moment";
import { useEffect } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { MessageDots } from "tabler-icons-react";
import { fetchActivity } from "../../utils/service";
import { activityListModalState } from "../../utils/store";

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
      <Timeline active={4} bulletSize={24} lineWidth={2}>
        {modal.data?.map((dt) => (
          <Timeline.Item
            title={dt.name}
            bullet={<MessageDots size={12} />}
            key={dt.id}
          >
            <Text color="dimmed" size="sm">
              Update From{" "}
              <Text variant="gradient" component="span" inherit>
                {dt.user?.name} :
              </Text>{" "}
              {dt.description || "(no detail information)"}
            </Text>
            <Text size="xs" mt={4}>
              {moment(dt.activityDate).fromNow()} (
              {moment(dt.activityDate).format("DD-MM-YYYY HH:mm:ss")})
            </Text>
          </Timeline.Item>
        ))}
      </Timeline>
    </Modal>
  );
}
