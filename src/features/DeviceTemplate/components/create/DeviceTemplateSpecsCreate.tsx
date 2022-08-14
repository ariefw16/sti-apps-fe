import { Paper, Title, Divider, TextInput } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { fetchSingleDeviceType } from "../../../DeviceType/utils/service";
import {
  deviceTemplateCreateState,
  deviceTemplateSpecCreateState,
} from "../../utils/store";

export default function DeviceTemplateSpecsCreate() {
  const typeId = useRecoilValue(deviceTemplateCreateState).deviceTypeId;
  const [spec, setSpec] = useRecoilState(deviceTemplateSpecCreateState);

  useEffect(() => {
    if (typeId)
      fetchSingleDeviceType(+typeId)
        .then((res) => {
          if (res.DeviceTypeSpec)
            setSpec(
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
  }, [typeId]);

  const specsOnChangeHandler = (vals: string, id: number) => {
    setSpec((sp) => {
      const ret = sp.map((s) => ({ ...s }));
      const idx = ret.findIndex((s) => s.deviceTypeSpec?.id === id);
      ret[idx].value = vals;
      return ret;
    });
  };

  return (
    <Paper p={20} radius="lg">
      <Title order={5}>Specifications</Title>
      <Divider my={"md"} variant="dotted" />
      {spec &&
        spec.map((sp) => (
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
  );
}
