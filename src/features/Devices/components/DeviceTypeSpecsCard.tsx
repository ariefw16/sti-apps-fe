import { Paper, Title, Divider, Select, TextInput } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useState, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  fetchDeviceType,
  fetchSingleDeviceType,
} from "../../DeviceType/utils/service";
import { deviceSpecCreateState, deviceTypeIdCreateState } from "../utils/store";

export default function DeviceTypeSpecsCard() {
  const [typeOptions, setTypeOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [specs, setSpecs] = useRecoilState(deviceSpecCreateState);
  const setDeviceTypeId = useSetRecoilState(deviceTypeIdCreateState);

  useEffect(() => {
    fetchDeviceType({}).then((res) => {
      setTypeOptions(
        res.data.map((dt) => ({
          value: dt.id?.toString() || "",
          label: dt.name || "",
        }))
      );
    });
  }, []);

  const typeChangeHandler = (value: string) => {
    fetchSingleDeviceType(+value)
      .then((res) => {
        if (res.DeviceTypeSpec)
          setSpecs(
            res.DeviceTypeSpec?.map((sp) => ({
              value: "",
              specType: sp.specType,
              name: sp.name,
              deviceTypeSpec: sp,
            }))
          );
        setDeviceTypeId(+value);
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

  return (
    <>
      <Paper p={20} radius="lg">
        <Title order={5}>Device Type</Title>
        <Divider variant="dotted" my={"md"} />
        <Select
          data={typeOptions}
          placeholder="Select one Device Type"
          clearable
          onChange={typeChangeHandler}
        />
      </Paper>
      <Paper p={20} radius="lg" mt={15}>
        <Title order={5}>Specifications</Title>
        <Divider variant="dotted" my={"md"} />
        {specs &&
          specs.map((sp) => (
            <TextInput
              label={sp.name}
              key={sp.deviceTypeSpec?.id}
              my={"md"}
              placeholder={"Enter " + sp.name + " here ..."}
              required={sp.deviceTypeSpec?.isMandatory}
              value={sp.value || ""}
              onChange={(e) => {
                specsOnChangeHandler(e.target.value, sp.deviceTypeSpec?.id!);
              }}
            />
          ))}
      </Paper>
    </>
  );
}
