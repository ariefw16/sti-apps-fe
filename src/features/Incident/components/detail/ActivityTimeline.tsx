import { Timeline, Text } from "@mantine/core";
import moment from "moment";
import { MessageDots } from "tabler-icons-react";
import { IncidentActivity } from "../../utils/type";

export default function ActivityTimeline(props: {
  activity: IncidentActivity[] | undefined;
}) {
  const { activity } = props;

  return (
    <Timeline
      active={activity?.length}
      bulletSize={24}
      lineWidth={2}
      ml={20}
      mt={20}
    >
      {activity?.map((dt) => (
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
  );
}
