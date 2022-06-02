import {
  Box,
  Button,
  createStyles,
  Divider,
  Group,
  Modal,
  Select,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useRecoilState } from "recoil";
import { unitListState } from "../utils/store";
import { z } from "zod";
import { CreateUnit } from "../utils/type";
import { saveUnit } from "../utils/service";
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

export default function UnitCreateModal(props: {
  open: boolean;
  onClose: any;
}) {
  const { classes } = useStyles();
  const { open, onClose } = props;
  const [unit, setUnit] = useRecoilState(unitListState);
  const form = useForm<CreateUnit>({
    initialValues: {
      name: "",
      parentId: "",
    },
    schema: zodResolver(schema),
  });

  const onSubmitHandler = (data: CreateUnit) => {
    saveUnit({ ...data })
      .then((x) => {
        if (x.parentId) {
          const parent = unit.filter((u) => u.id === x.parentId)[0];
          x.parent = parent;
        }
        setUnit((un) => [...un, x]);
        showNotification({
          message: "Unit Creation Success!",
          title: "Unit Creation",
          color: "green",
        });
        onClose();
        form.reset();
      })
      .catch((e) => {
        showNotification({
          message: `Unit Creation Failed! ${e.message}`,
          title: "Unit Creation",
          color: "red",
        });
      });
  };

  return (
    <Modal
      opened={open}
      onClose={onClose}
      title="Create new Unit"
      size={"lg"}
      overlayBlur={2}
      overlayOpacity={0.4}
      overflow="inside"
    >
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
              unit?.map((x) => ({ value: x.id!.toString(), label: x.name! })) ||
              []
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
          <Button variant="light" color={"gray"} onClick={onClose}>
            Discard
          </Button>
          <Button sx={{ paddingLeft: 20, paddingRight: 20 }} type="submit">
            Submit
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
