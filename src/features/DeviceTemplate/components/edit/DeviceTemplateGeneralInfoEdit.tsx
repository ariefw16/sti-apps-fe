import {
  Button,
  Divider,
  Grid,
  Group,
  Paper,
  Select,
  TextInput,
  Title,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ArrowLeft, DeviceFloppy } from "tabler-icons-react";
import { SelectOptions } from "../../../../types/common";
import { fetchSingleDeviceType } from "../../../DeviceType/utils/service";
import { updateDeviceTemplate } from "../../utils/service";
import {
  deviceTemplateDetailState,
  deviceTemplateQuickUpdateTriggreState,
} from "../../utils/store";
import { DeviceTemplateSpec } from "../../utils/type";

export default function DeviceTemplateGeneralInfoEdit(props: {
  typeOptions: SelectOptions[];
}) {
  const { typeOptions } = props;
  const navigate = useNavigate();
  const template = useRecoilValue(deviceTemplateDetailState);
  const setTrigger = useSetRecoilState(deviceTemplateQuickUpdateTriggreState);
  const [name, setName] = useState("");
  const [merk, setMerk] = useState("");
  const [merkType, setMerkType] = useState("");
  const [deviceTypeId, setDeviceTypeId] = useState<string>();
  const [specs, setSpecs] = useState<DeviceTemplateSpec[]>([]);

  useEffect(() => {
    setName(template.name ?? "");
    setMerk(template.merk ?? "");
    setMerkType(template.merkType ?? "");
    setDeviceTypeId(template.deviceType?.id?.toString());
    setSpecs(template.DeviceTemplateSpecs ?? []);
  }, [template]);

  const typeChangeHandler = (vals: string) => {
    setDeviceTypeId(vals);
    fetchSingleDeviceType(+vals)
      .then((res) => {
        if (res.DeviceTypeSpec)
          setSpecs(
            res.DeviceTypeSpec?.map((sp) => ({
              value: "",
              specType: sp.specType,
              name: sp.name,
              deviceTypeSpec: sp,
              deviceTypeSpecId: sp.id,
            }))
          );
      })
      .catch((e) => {
        showNotification({
          title: "Fetch Specification",
          message: `Error! ${e.message}`,
          color: "red",
        });
      });
  };

  const specsOnChangeHandler = (vals: string, id: number) => {
    setSpecs((sp) => {
      const ret = sp.map((s) => ({ ...s }));
      const idx = ret.findIndex((s) => s.deviceTypeSpec?.id === id);
      ret[idx].value = vals;
      return ret;
    });
  };

  const backButtonHandler = () => {
    navigate(-1);
  };

  const saveButtonHandler = () => {
    // console.log(specs);
    updateDeviceTemplate({
      id: template.id!,
      data: {
        merk,
        merkType,
        name,
        deviceTypeId,
        deviceTemplateSpecs: specs.map((s) => ({
          ...s,
          deviceTypeSpec: undefined,
        })),
      },
    })
      .then(() => {
        setTrigger((t) => !t);
        navigate(`/device-template/${template.id}`);
        showNotification({
          title: "Update Device Template",
          message: "Update Template Success!",
          color: "green",
        });
      })
      .catch((e) => {
        showNotification({
          title: "Update Device Template",
          message: `Error! ${e.message}`,
          color: "red",
        });
      });
  };

  return (
    <Grid>
      <Grid.Col sm={12} lg={8}>
        <Paper p={20} radius="lg" mt={20}>
          <Title order={5}>General Information</Title>
          <Divider my={"md"} variant="dotted" />
          <TextInput
            my={"sm"}
            label="Name"
            description="Device Template Name, applied to all device"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextInput
            my={"sm"}
            label="Merk"
            description="Device Brand"
            value={merk}
            onChange={(e) => {
              setMerk(e.target.value);
            }}
          />
          <TextInput
            my={"sm"}
            label="Merk Type"
            description="Device Brand Series / Type"
            value={merkType}
            onChange={(e) => {
              setMerkType(e.target.value);
            }}
          />
          <Select
            data={typeOptions}
            label="Device Type"
            description="Select to fill specifications"
            placeholder="Select one Device Type"
            clearable
            onChange={typeChangeHandler}
            value={deviceTypeId}
          />
          <Divider my={"md"} variant="dotted" />
          <Group position="apart">
            <Button
              onClick={backButtonHandler}
              color="orange"
              leftIcon={<ArrowLeft />}
              radius="md"
              variant="outline"
            >
              Back
            </Button>
            <Button
              rightIcon={<DeviceFloppy />}
              radius={"md"}
              onClick={saveButtonHandler}
              variant="gradient"
            >
              Save
            </Button>
          </Group>
        </Paper>
      </Grid.Col>
      <Grid.Col sm={12} lg={4}>
        <Paper p={20} radius="lg" mt={20}>
          <Title order={5}>Specifications</Title>
          <Divider my={"md"} variant="dotted" />
          {specs.map((x, idx) => (
            <TextInput
              key={idx}
              my={"sm"}
              label={x.name}
              value={x.value || ""}
              onChange={(e) => {
                specsOnChangeHandler(e.target.value, x.deviceTypeSpec?.id!);
              }}
            />
          ))}
        </Paper>
      </Grid.Col>
    </Grid>
  );
}
