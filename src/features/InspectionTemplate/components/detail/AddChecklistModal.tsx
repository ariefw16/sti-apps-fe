import {
  Button,
  Divider,
  Group,
  Loader,
  Modal,
  Select,
  TextInput,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { DeviceFloppy, X } from "tabler-icons-react";
import { saveChecklistInspection } from "../../utils/service";
import {
  inspectionTemplateState,
  inspectionTemplateTriggerState,
} from "../../utils/store";

export default function AddChecklistInspectionModal(props: {
  opened: boolean;
  onClose: any;
}) {
  const { opened, onClose } = props;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [inputType, setInputType] = useState("");
  const [loading, setLoading] = useState(false);
  const template = useRecoilValue(inspectionTemplateState);
  const setTrigger = useSetRecoilState(inspectionTemplateTriggerState);

  const resetForm = () => {
    setName("");
    setDescription("");
    setInputType("");
  };
  const saveButtonHandler = () => {
    setLoading(true);
    saveChecklistInspection({
      name,
      description,
      inputType,
      templateId: template.id!,
    })
      .then(() => {
        setTrigger((t) => !t);
        resetForm();
        onClose();
        showNotification({
          title: "Add Checklist Item",
          message: "Checklist Item created successfully!",
          color: "green",
        });
      })
      .catch((e) => {
        showNotification({
          title: "Add Checklist Item",
          message: `Error! ${e.meesage}`,
          color: "red",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="md"
      radius={"lg"}
      title="Add Checklist to Inspection Template"
      closeOnEscape={!loading}
      closeOnClickOutside={!loading}
      withCloseButton={!loading}
    >
      <TextInput
        label="Checklist label"
        description="Title for checklist item to show"
        my="md"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        rightSection={loading && <Loader size={"md"} />}
      />
      <TextInput
        label="Description"
        description="Description / notes for checklist Item"
        my="md"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        rightSection={loading && <Loader size={"md"} />}
      />
      <Select
        data={["TEXT", "YES/NO", "CHOICES"]}
        placeholder="Select Options"
        description="Input type for checklist item"
        label="Input Type"
        sx={{ width: 300 }}
        radius="md"
        my="md"
        value={inputType}
        onChange={(v) => {
          setInputType(v);
        }}
      />
      <Divider variant="dotted" my="md" />
      <Group position="apart">
        <Button
          radius={"md"}
          variant="subtle"
          color={"orange"}
          leftIcon={<X />}
          onClick={onClose}
          loading={loading}
        >
          Discard
        </Button>
        <Button
          radius={"md"}
          rightIcon={<DeviceFloppy />}
          type="submit"
          onClick={saveButtonHandler}
          loading={loading}
        >
          Save
        </Button>
      </Group>
    </Modal>
  );
}
