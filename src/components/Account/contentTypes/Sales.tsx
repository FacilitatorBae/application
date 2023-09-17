import Grid from "~/components/Grid";
import { useState, useEffect } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { Spinner } from "@material-tailwind/react";

const columnDefs = [
  { field: "id", width: 5, headerName: "Id" },
  { field: "item", width: 50, headerName: "Item" },
  { field: "amount", width: 150, headerName: "Amount" },
  { field: "fees", width: 160, headerName: "Fees" },
  { field: "status", width: 160, headerName: "Status" },
  { field: "creationDate", width: 5, headerName: "Creation Date" },
  { field: "updateDate", width: 5, headerName: "Update Date" },
  { field: "facilitator", width: 5, headerName: "Facilitator" },
  { field: "buyer", width: 5, headerName: "Buyer" },
];

const Sales = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onRowClick = (e) => {
    router.push(`/items/${e.id}`);
  };

  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setIsLoading(true);
    const handleComplete = (url) =>
      url === router.asPath && setIsLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  const { data: rowData, isLoading: gridDataIsLoading } =
    api.placedOrders.getSaleOrdersByUserId.useQuery();

  return isLoading ? (
    <div className="flex h-full min-h-[60vh] w-full items-center justify-center">
      <Spinner className="absolute h-16 w-16 p-0" />
    </div>
  ) : (
    <Grid
      columnDefs={columnDefs}
      isLoading={gridDataIsLoading}
      rowData={rowData}
      onRowClick={onRowClick}
      withSearchBar
      gridTitle="Sales"
    />
  );
};

export default Sales;
