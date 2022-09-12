import {
  Paper,
  Title,
  Divider,
  TextInput,
  Box,
  LoadingOverlay,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { fetchSingleDeviceType } from "../../../DeviceType/utils/service";
import {
  deviceTemplateCreateState,
  deviceTemplateLoadingCreateState,
  deviceTemplateSpecCreateState,
} from "../../utils/store";

export default function DeviceTemplateSpecsCreate() {
  const typeId = useRecoilValue(deviceTemplateCreateState).deviceTypeId;
  const [spec, setSpec] = useRecoilState(deviceTemplateSpecCreateState);
  const loading = useRecoilValue(deviceTemplateLoadingCreateState);
  const [specLoading, setSpecLoading] = useState(false);

  useEffect(() => {
    setSpecLoading(true);
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
        })
        .finally(() => {
          setSpecLoading(false);
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
    <Box style={{ position: "relative" }}>
      <LoadingOverlay visible={specLoading} />
      <Paper p={20} radius="lg">
        <Title order={5}>Specifications</Title>
        <Divider my={"md"} variant="dotted" />
        {spec &&
          spec.map((sp) => (
            <TextInput
              disabled={loading}
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
    </Box>
  );
}
