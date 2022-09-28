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
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { DeviceFloppy, X } from "tabler-icons-react";
import { updateChecklistInspectionTemplate } from "../utils/service";
import {
  inspectionTemplateState,
  inspectionTemplateTriggerState,
} from "../utils/store";
import { InspectionTemplateDetail } from "../utils/type";

export default function UpdateInspectionTemplateChecklistModal(props: {
  opened: boolean;
  onClose: any;
  data: InspectionTemplateDetail;
}) {
  const { opened, onClose, data } = props;
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [inputType, setInputType] = useState("");
  const template = useRecoilValue(inspectionTemplateState);
  const setTrigger = useSetRecoilState(inspectionTemplateTriggerState);

  useEffect(() => {
    if (!opened) resetForm();
    else {
      setName(data.name || "");
      setDescription(data.description || "");
      setInputType(data.inputType || "");
    }
  }, [opened]);

  const resetForm = () => {
    setName("");
    setDescription("");
    setInputType("");
  };
  const saveButtonHandler = () => {
    setLoading(true);
    updateChecklistInspectionTemplate({
      name,
      description,
      inputType,
      templateId: template.id!,
      id: data.id,
    })
      .then(() => {
        setTrigger((t) => !t);
        resetForm();
        onClose();
        showNotification({
          title: "Update Checklist Item",
          message: "Checklist Item updated successfully!",
          color: "green",
        });
      })
      .catch((e) => {
        showNotification({
          title: "Update Checklist Item",
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
