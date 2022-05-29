import { Button, Group, Popover, TextInput } from "@mantine/core";
import { useState } from "react";
import { Filter, Search } from "tabler-icons-react";

export default function ListHeaderCard(props: {
  search?: string;
  setSearch?: any;
  filterForm?: JSX.Element;
  addButton?: JSX.Element;
  refreshButton?: JSX.Element;
}) {
  const { search, setSearch, filterForm, addButton, refreshButton } = props;
  const [openFilter, setOpenFilter] = useState(false);

  const popoverBtn = (
    <Button
      size="md"
      sx={(theme) => ({
        fontWeight: 400,
        fontFamily: theme.fontFamily,
        paddingLeft: 6,
        paddingRight: 10,
      })}
      leftIcon={<Filter />}
      variant="outline"
      onClick={() => {
        setOpenFilter((x) => !x);
      }}
      radius="md"
    >
      Filter
    </Button>
  );

  return (
    <Group sx={{ marginTop: 10, marginBottom: 20 }} position="apart">
      <TextInput
        placeholder="Quick Search"
        variant="filled"
        radius={"lg"}
        icon={<Search />}
        sx={{ width: 300 }}
        size="md"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        value={search}
      />
      <Group>
        <Popover
          target={popoverBtn}
          opened={openFilter}
          onClose={() => {
            setOpenFilter(false);
          }}
          position="bottom"
          title="Filter Options"
          withCloseButton
          transition="pop-top-right"
          placement="end"
          shadow={"xl"}
          radius="md"
        >
          {filterForm}
        </Popover>
        {addButton}
        {refreshButton}
      </Group>
    </Group>
  );
}
