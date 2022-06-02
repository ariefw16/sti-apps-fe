import {
  Box,
  Button,
  createStyles,
  Divider,
  Group,
  LoadingOverlay,
  Modal,
  Select,
  TextInput,
} from "@mantine/core";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  unitEditModalState,
  unitFilterState,
  unitListState,
} from "../utils/store";
import { z } from "zod";
import { CreateUnit, Unit } from "../utils/type";
import { zodResolver, useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { updateUnit } from "../utils/service";
import { showNotification } from "@mantine/notifications";

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
  },

  input: {
    height: "auto",
    paddingTop: 18,
  },

  label: {
    position: "absolute",
    pointerEvents: "none",
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: theme.spacing.sm / 2,
    zIndex: 1,
  },
}));
const schema = z.object({
  name: z.string().min(2),
  parentId: z.string().optional(),
});

export default function UnitEditModal() {
  const { classes } = useStyles();
  const [edit, setEdit] = useRecoilState(unitEditModalState);
  const unit = useRecoilValue(unitListState);
  const setToggle = useSetRecoilState(unitFilterState);
  const form = useForm<CreateUnit>({
    initialValues: {
      name: "",
      parentId: undefined,
    },
    schema: zodResolver(schema),
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.setFieldValue("name", edit.data!.name);
    form.setFieldValue("id", edit.data!.id);
    if (edit.data!.parent)
      form.setFieldValue("parentId", edit.data!.parent.id?.toString());
    else form.setFieldValue("parentId", undefined);
  }, [edit]);

  const onSubmitHandler = (data: CreateUnit) => {
    setLoading(true);
    updateUnit(data)
      .then(() => {
        setToggle((x) => ({ ...x, toggleRefresh: !x.toggleRefresh }));
        setEdit((x) => ({ ...x, showModal: false }));
      })
      .catch((e) => {
        showNotification({
          title: "Update Error",
          message: `Error : ${e.message}`,
          color: "red",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal
      opened={edit.showModal}
      onClose={() => {
        setEdit((x) => ({ ...x, showModal: false }));
      }}
      title="Edit Unit"
      withCloseButton={!loading}
      closeOnClickOutside={!loading}
      closeOnEscape={!loading}
    >
      <Box>
        <LoadingOverlay visible={loading} />
        <form onSubmit={form.onSubmit(onSubmitHandler)}>
          <Box p={30}>
            <TextInput
              variant="filled"
              label="Unit Name"
              required
              placeholder="Input unit name here..."
              classNames={classes}
              {...form.getInputProps("name")}
            />
            <Select
              style={{ marginTop: 20, zIndex: 2 }}
              data={
                unit
                  ?.filter((f) => f.id !== edit.data?.id)
                  .map((x) => ({
                    value: x.id!.toString(),
                    label: x.name!,
                  })) || []
              }
              placeholder="Pick one"
              label="Choose Unit Parent"
              classNames={classes}
              searchable
              filter={(val, item) =>
                item.label?.toLowerCase().includes(val.toLowerCase().trim()) ||
                false
              }
              nothingFound="No data found"
              {...form.getInputProps("parentId")}
            />
          </Box>
          <Divider mb={10} mx={30} />
          <Group position="apart" px={30} pt={10}>
            <Button
              variant="light"
              color={"gray"}
              onClick={() => {
                form.reset();
                setEdit((x) => ({ ...x, showModal: false }));
              }}
            >
              Discard
            </Button>
            <Button sx={{ paddingLeft: 20, paddingRight: 20 }} type="submit">
              Update
            </Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
}
