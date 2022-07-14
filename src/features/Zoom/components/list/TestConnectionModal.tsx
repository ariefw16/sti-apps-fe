import { Button, Group, Modal, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { testZoomAccountConnection } from "../../utils/service";
import { zoomAccountTestConnectState } from "../../utils/store";

export default function TestConnectionModal() {
  const data = useRecoilValue(zoomAccountTestConnectState)
  const resetData = useResetRecoilState(zoomAccountTestConnectState)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState("")

  useEffect(() => {
    if (data.id) {
      setLoading(true)
      testZoomAccountConnection(data.id)
        .then(() => {
          setResult('Connection established! Success!')
        })
        .catch(e => {
          setResult(`Failed! ${e.message}`)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [data.id])

  return <Modal opened={data.showModal} size={"md"} withCloseButton={false} onClose={resetData}>
    <Title order={3}>{loading ? "Connecting to Zoom...." : result}</Title>
    <Group position="right">
      <Button radius={"md"} onClick={resetData}>OK</Button>
    </Group>
  </Modal>
}
