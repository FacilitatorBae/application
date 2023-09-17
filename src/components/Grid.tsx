import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Chip,
  Avatar,
  Input,
  Spinner,
} from "@material-tailwind/react";

interface GridProps<T> {
  columnDefs: {
    field: string;
    headerName: string;
    width?: number;
    withAvatar?: boolean;
  }[];
  rowData?: T[];
  onRowClick?: (rowData: {
    amount: string;
    status: string;
    date: string;
  }) => void;
  withSearchBar?: boolean;
  isLoading?: boolean;
  gridTitle?: string;
}

const Grid: React.FC<GridProps<any>> = ({
  columnDefs,
  rowData: initialRowData,
  onRowClick,
  withSearchBar,
  isLoading,
  gridTitle,
}) => {
  const [rowData, setRowData] = useState(initialRowData);
  const [searchTerm, setSearchTerm] = useState("");
  const [chipIsOpen, setChipIsOpen] = useState(false);

  useEffect(() => {
    if (initialRowData) {
      setRowData(initialRowData);
    }
  }, [initialRowData]);

  const onSearch = (term: string) => {
    if (rowData) {
      setRowData(
        rowData.filter((obj) =>
          Object.values(obj).some((value) => value.toString().includes(term))
        )
      );
    }
  };

  const removeFilters = () => {
    setSearchTerm("");
    setChipIsOpen(false);
    setRowData(initialRowData);
  };

  return isLoading ? (
    <div className="flex h-full min-h-[60vh] w-full items-center justify-center">
      <Spinner className="absolute h-16 w-16 p-0" />
    </div>
  ) : (
    <div className="flex h-full w-[70%] flex-col justify-between bg-gray-300 p-5">
      <div className="pb-5 font-poppins text-3xl font-bold">{gridTitle}</div>
      <div className="flex w-full flex-col justify-between pb-5">
        <div className="flex justify-between bg-gray-100 p-2">
          <Card className="w-full rounded-none">
            <CardHeader
              floated={false}
              shadow={false}
              className="m-0 rounded-none"
            >
              {withSearchBar && (
                <>
                  <div className="flex flex-col justify-between gap-8 p-4 md:flex-row md:items-center">
                    <div>
                      <Typography variant="h5" color="blue-gray">
                        Recent Transactions
                      </Typography>
                      <Typography color="gray" className="mt-1 font-normal">
                        These are details about the last transactions
                      </Typography>
                    </div>
                    <div className="flex w-full shrink-0 gap-2 md:w-max">
                      <div className="w-full md:w-72">
                        <Input
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              onSearch(e.target.value);
                              setSearchTerm(e.target.value);
                              setChipIsOpen(true);
                            }
                          }}
                          label="Search"
                        />
                      </div>
                    </div>
                  </div>
                  <Chip
                    className="m-2 mt-0 max-w-max"
                    open={chipIsOpen}
                    value={searchTerm}
                    size="sm"
                    onClose={() => removeFilters()}
                  />
                </>
              )}
            </CardHeader>
            <CardBody className="max-h-[300px] overflow-auto p-0">
              <table className="w-full table-auto text-left">
                <thead>
                  <tr>
                    {columnDefs.map((def) => {
                      const colWidth = def.width || 50;
                      return (
                        <th
                          key={def.field}
                          className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                          style={{ width: colWidth }}
                        >
                          <Typography
                            color="blue-gray"
                            className="text-xs font-normal leading-none opacity-70"
                          >
                            {def.headerName}
                          </Typography>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {rowData?.map((item, index) => {
                    const isLast = index === rowData.length - 1;
                    const classes = isLast
                      ? "p-2"
                      : "p-2 border-b border-blue-gray-50";

                    return (
                      <tr
                        onClick={() => {
                          onRowClick(rowData[index]);
                        }}
                        key={rowData.indexOf(item)}
                        className="cursor-pointer"
                      >
                        {columnDefs.map((colDef) => {
                          return (
                            <td className={classes}>
                              <div className="flex items-center gap-3">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="text-xs"
                                >
                                  {item[colDef.field]}
                                </Typography>
                                {colDef.withAvatar && (
                                  <Avatar
                                    size="xs"
                                    src={item[`${colDef.field}Avatar`]}
                                    alt="avatar"
                                    variant="rounded"
                                  />
                                )}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Grid;
