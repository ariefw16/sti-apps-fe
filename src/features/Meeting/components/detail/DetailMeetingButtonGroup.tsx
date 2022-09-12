import { Button, Group, Paper } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ArrowLeft, Check, Pencil, X } from "tabler-icons-react";
import { meetingDetailState } from "../../utils/store";

export default function DetailMeetingButtonGroup(props: { loading: boolean }) {
  const { loading } = props;
  const navigate = useNavigate();
  const { id } = useParams();
  const detail = useRecoilValue(meetingDetailState);

  const backButtonHandler = () => {
    navigate(`/meetings`);
  };
  const updateButtonHandler = () => {
    navigate(`/meetings/${id}/edit`);
  };

  return (
    <Paper p={20} radius="lg">
      <Group position="apart">
        <Button
          onClick={backButtonHandler}
          color="orange"
          leftIcon={<ArrowLeft />}
          radius="md"
          loading={loading}
        >
          Back
        </Button>
        {detail.status === 1 && (
          <Button variant="subtle" leftIcon={<X />} loading={loading}>
            Cancel Meeting
          </Button>
        )}
        {detail.status === 0 && (
          <Group>
            <Button variant="subtle" leftIcon={<Check />} loading={loading}>
              Approve
            </Button>
            <Button
              loading={loading}
              rightIcon={<Pencil />}
              onClick={updateButtonHandler}
              radius={"md"}
              variant="outline"
              color={"green"}
            >
              Update
            </Button>
          </Group>
        )}
      </Group>
    </Paper>
  );
}
