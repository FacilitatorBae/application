import Grid from "~/components/Grid";

const columnDefs = [
  { field: "id", width: 5, headerName: "Id" },
  { field: "item", width: 50, headerName: "Item" },
  { field: "amount", width: 150, headerName: "Amount" },
  { field: "fees", width: 160, headerName: "Fees" },
  { field: "status", width: 160, headerName: "Status" },
  { field: "date", width: 5, headerName: "Date" },
];
const rowData = [
  {
    item: "bike",
    fees: "412",
    amount: "4124142",
    status: "pending",
    date: "17/2/2020",
    id: 1,
  },
  {
    fees: "412",
    amount: "4124142",
    status: "pending",
    date: "17/2/2020",
    id: 1,
  },
  {
    fees: "412",
    amount: "4124142",
    status: "pending",
    date: "17/2/2020",
    id: 1,
  },
  {
    fees: "412",
    amount: "4124142",
    status: "pending",
    date: "17/2/2020",
    id: 1,
  },
];

const onRowClick = (e) => {
  alert(JSON.stringify(e));
};

const Purchases = () => {
  return (
    <Grid
      columnDefs={columnDefs}
      rowData={rowData}
      onRowClick={onRowClick}
      withSearchBar
    />
  );
};

export default Purchases;
