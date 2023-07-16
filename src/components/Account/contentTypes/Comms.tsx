import Grid from "~/components/Grid";

const columnDefs = [
  { field: "id", width: 5, headerName: "Id" },
  { field: "item", width: 50, headerName: "Item", withAvatar: true },
  { field: "amount", width: 150, headerName: "Amount" },
  { field: "fees", width: 160, headerName: "Fees" },
  { field: "status", width: 160, headerName: "Status" },
  { field: "date", width: 5, headerName: "Date" },
];
const rowData = [
  {
    item: "bike",
    itemAvatar:
      "https://media.wired.com/photos/63e569c9de59d567d5d7c66d/2:3/w_1200,h_1800,c_limit/Ride1Up-Cafe-Cruiser-Featured-Gear.jpg",
    fees: "412",
    amount: "4124142",
    status: "pending",
    date: "17/2/2020",
    id: 1,
  },
  {
    item: "bike",
    fees: "412",
    amount: "4124142",
    status: "pending",
    date: "17/2/2020",
    id: 1,
  },
  {
    item: "bike",
    fees: "412",
    amount: "4124142",
    status: "pending",
    date: "17/2/2020",
    id: 1,
  },
  {
    item: "bike",
    fees: "412",
    amount: "4124142",
    status: "pending",
    date: "17/2/2020",
    id: 1,
  },
  {
    item: "bike",
    fees: "412",
    amount: "4124142",
    status: "pending",
    date: "17/2/2020",
    id: 1,
  },
  {
    item: "phone",
    fees: "412",
    amount: "4124142",
    status: "pending",
    date: "17/2/2020",
    id: 1,
  },
  {
    item: "car",
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

const Comms = () => {
  return (
    <Grid
      columnDefs={columnDefs}
      rowData={rowData}
      onRowClick={onRowClick}
      withSearchBar
    />
  );
};

export default Comms;
