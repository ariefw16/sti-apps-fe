import {
  Autocomplete,
  Button,
  Divider,
  Grid,
  Modal,
  Table,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { DeviceFloppy, TrashX, UserPlus } from "tabler-icons-react";
import { SelectOptions } from "../../../../types/common";
import { quickFetchUser } from "../../../Users/utils/service";
import { fetchSingleGroup } from "../../utils/service";
import { groupManageMemberState } from "../../utils/store";
import { Group } from "../../utils/type";

export default function GroupManageMemberModal() {
  const manage = useRecoilValue(groupManageMemberState);
  const resetManage = useResetRecoilState(groupManageMemberState);
  const [group, setGroup] = useState<Group>();
  const [loading, setLoading] = useState(false);
  const rowHeaderStyle = { color: "GrayText", fontWeight: 500 };
  const [userOptions, setUserOptions] = useState<SelectOptions[]>([]);
  const [userSearch, setUserSearch] = useState("");
  const [qUser] = useDebouncedValue(userSearch, 300);

  useEffect(() => {
    setLoading(true);
    if (manage.showModal) {
      fetchSingleGroup(manage.id)
        .then((res) => {
          setGroup(res);
        })
        .catch((e) => {
          showNotification({
            title: "Fetch Single Group",
            message: `Error! ${e.message}`,
            color: "red",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [manage.showModal]);

  useEffect(() => {
    if (qUser === "") setUserOptions([]);
    else {
      console.log("masuk");
      quickFetchUser(qUser)
        .then((res) => {
          setUserOptions(
            res.map((r) => ({ value: r.id!.toString(), label: r.name! }))
          );
        })
        .catch((e) => {
          showNotification({
            title: "Fetch User",
            message: `Error! ${e.message}`,
            color: "red",
          });
        });
    }
    console.log("skip");
  }, [qUser]);

  const userSearchHandle = (val: string) => {
    setUserSearch(val);
  };

  return (
    <Modal
      opened={manage.showModal}
      onClose={resetManage}
      title={`Manage Members of ${group?.name} Group`}
      radius="lg"
      size={"lg"}
      withCloseButton={!loading}
      closeOnClickOutside={!loading}
      closeOnEscape={!loading}
    >
      <Table>
        <thead>
          <tr>
            <th style={rowHeaderStyle}>Name</th>
            <th style={rowHeaderStyle}>NIK</th>
            <th style={rowHeaderStyle}>Email</th>
            <th style={rowHeaderStyle}>Unit</th>
            <th style={{ width: 60, ...rowHeaderStyle }}>Remove</th>
          </tr>
        </thead>
        <tbody>
          {group?.users?.map((item) => (
            <tr>
              <td>{item.user.name}</td>
              <td>{item.user.nik}</td>
              <td>{item.user.email}</td>
              <td>{item.user.unit?.name}</td>
              <td>
                <Button
                  size="xs"
                  color={"red"}
                  py={1}
                  variant="light"
                  radius={"lg"}
                >
                  <TrashX />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Divider my="xl" variant="dotted" />
      <Grid>
        <Grid.Col span={8}>
          <Autocomplete
            icon={<UserPlus />}
            data={userOptions}
            nothingFound="No User found"
            placeholder="Search User (NIK / Nama / Email)"
            onChange={userSearchHandle}
            autoFocus={false}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <Button py={1} leftIcon={<DeviceFloppy />} radius={"md"}>
            Add Members
          </Button>
        </Grid.Col>
      </Grid>
    </Modal>
  );
}
