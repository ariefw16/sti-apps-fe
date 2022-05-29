import { Group, Title, Pagination, Select, Box } from "@mantine/core";

export default function ListFooterCard(props: {
  onPageChange: any;
  onRowPerPageChange: any;
  rows: number;
  page?: number;
  rowsPerPage?: string;
}) {
  const {
    onPageChange,
    onRowPerPageChange,
    rows,
    page = 1,
    rowsPerPage = "15",
  } = props;
  const perPageOptions = [
    { value: "5", label: "5" },
    { value: "15", label: "15" },
    { value: "30", label: "30" },
    { value: "100", label: "100" },
  ];
  const totalPage = Math.ceil(rows / +rowsPerPage);

  return (
    <Group position="apart" sx={{ marginTop: 20 }}>
      <Group sx={{ verticalAlign: "middle" }}>
        <Title
          order={6}
          sx={(theme) => ({
            fontWeight: 400,
            fontFamily: theme.fontFamily,
            fontSize: 14,
            color: theme.colors.gray[6],
          })}
        >
          Showing
        </Title>
        <Select
          data={perPageOptions}
          sx={{ width: 70 }}
          value={rowsPerPage}
          onChange={onRowPerPageChange}
        />
        <Title
          order={6}
          sx={(theme) => ({
            fontWeight: 400,
            fontFamily: theme.fontFamily,
            fontSize: 14,
            color: theme.colors.gray[8],
          })}
        >
          of {rows} Data
        </Title>
      </Group>
      <Group>
        <Pagination
          total={totalPage}
          radius="md"
          page={page}
          onChange={onPageChange}
        />
      </Group>
    </Group>
  );
}
