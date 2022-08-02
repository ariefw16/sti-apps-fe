import {
  Autocomplete,
  Loader,
  Button,
  Divider,
  SelectItemProps,
  Grid,
  Modal,
  Table,
  Text,
  Group as GroupMantine,
  AutocompleteItem,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState, forwardRef } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { DeviceFloppy, TrashX, UserPlus } from "tabler-icons-react";
import { quickFetchUser } from "../../../Users/utils/service";
import { User } from "../../../Users/utils/type";
import {
  addMemberToGroup,
  fetchSingleGroup,
  removeMemberGroup,
} from "../../utils/service";
import { groupManageMemberState } from "../../utils/store";
import { Group } from "../../utils/type";

interface ItemProps extends SelectItemProps {
  name: string;
  nik?: string;
  email?: string;
  userId: number;
}
const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ value, name, nik, email, userId, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <GroupMantine noWrap>
        <div>
          <Text>{name}</Text>
          <Text size="xs" color="dimmed">
            NIK : {nik} ({email})
          </Text>
        </div>
      </GroupMantine>
    </div>
  )
);

export default function GroupManageMemberModal() {
  const manage = useRecoilValue(groupManageMemberState);
  const resetManage = useResetRecoilState(groupManageMemberState);
  const [group, setGroup] = useState<Group>();
  const [loading, setLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [refreshList, setRefreshList] = useState(false);
  const rowHeaderStyle = { color: "GrayText", fontWeight: 500 };
  const [userOptions, setUserOptions] = useState<User[]>([]);
  const [userSearch, setUserSearch] = useState("");
  const [qUser] = useDebouncedValue(userSearch, 300);
  const [selectedUserId, setSelectedUserId] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    if (userSearch !== "") setUserLoading(true);
  }, [userSearch]);

  useEffect(() => {
    if (manage.showModal) {
      setLoading(true);
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
  }, [manage.showModal, refreshList]);

  useEffect(() => {
    if (qUser === "") setUserOptions([]);
    else {
      quickFetchUser(qUser)
        .then((res) => {
          if (group && group._count && group?._count!.users! > 0) {
            const ids = group?.users?.map((m) => m.user.id);
            setUserOptions(res.filter((f) => !ids?.includes(f.id)));
          } else {
            setUserOptions(res);
          }
        })
        .catch((e) => {
          showNotification({
            title: "Fetch User",
            message: `Error! ${e.message}`,
            color: "red",
          });
        });
    }
    setUserLoading(false);
  }, [qUser]);

  const onSelectItemHandler = (item: AutocompleteItem) => {
    const { userId: id } = item;
    setSelectedUserId(id);
  };
  const addMemberButtonHandler = () => {
    if (selectedUserId)
      addMemberToGroup({ id: manage.id, userId: selectedUserId })
        .then(() => {
          setRefreshList((x) => !x);
          showNotification({
            title: "User Added!",
            message: "User added to A group Member",
            color: "green",
          });
          setUserSearch("");
        })
        .catch((e) => {
          showNotification({
            title: "Error Add Member",
            message: `Error! ${e.message}`,
            color: "red",
          });
        });
    else
      showNotification({
        title: "Error Add Member",
        message: "Select User to Add Member",
        color: "red",
      });
  };
  const removeMemberButtonHandler = (id: number) => {
    removeMemberGroup({ userId: id, id: 0 })
      .then(() => {
        setRefreshList((x) => !x);
        showNotification({
          title: "User Removed!",
          message: "User removed from A group Member",
          color: "green",
        });
      })
      .catch((e) => {
        showNotification({
          title: "Error Remove Member",
          message: `Error! ${e.message}`,
          color: "red",
        });
      });
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
            <tr key={item.user.id}>
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
                  onClick={() => {
                    removeMemberButtonHandler(item.id);
                  }}
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
            data={userOptions.map((us) => ({
              value: us.name!,
              name: us.name,
              nik: us.nik,
              email: us.email,
              userId: us.id,
            }))}
            placeholder="NIK / Nama / Email"
            rightSection={userLoading ? <Loader size={16} /> : null}
            value={userSearch}
            onChange={setUserSearch}
            itemComponent={AutoCompleteItem}
            nothingFound="No Data Found"
            filter={(value, item) =>
              item.name.toLowerCase().includes(value.toLowerCase().trim()) ||
              item.nik.toLowerCase().includes(value.toLowerCase().trim()) ||
              item.email.toLowerCase().includes(value.toLowerCase().trim())
            }
            onItemSubmit={onSelectItemHandler}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <Button
            py={1}
            leftIcon={<DeviceFloppy />}
            radius={"md"}
            onClick={addMemberButtonHandler}
          >
            Add Members
          </Button>
        </Grid.Col>
      </Grid>
    </Modal>
  );
}
