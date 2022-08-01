import { Modal, Table } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { fetchSingleGroup } from "../../utils/service";
import { groupManageMemberState } from "../../utils/store";
import { Group } from "../../utils/type";

export default function GroupManageMemberModal() {
  const manage = useRecoilValue(groupManageMemberState);
  const resetManage = useResetRecoilState(groupManageMemberState);
  const [group, setGroup] = useState<Group>();
  const [loading, setLoading] = useState(false);
  const rowHeaderStyle = { color: "GrayText", fontWeight: 500 };

  useEffect(() => {
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
        });
    }
  }, [manage.showModal]);

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
            </tr>
          ))}
        </tbody>
      </Table>
    </Modal>
  );
}
