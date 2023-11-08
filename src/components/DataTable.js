import * as React from "react";
import { useState } from "react";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import CircleIcon from "@mui/icons-material/Circle";
import Box from "@mui/material/Box";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

const rows = [
  {
    id: 1,
    school: "Sekolah Kebangsaan Wawasan",
    resource: "Tablet",
    type: "Export",
    status: "Pending",
    quantity: 100,
    requestdate: "18/09/2023",
    lastupdated: "19/09/2023",
  },
  {
    id: 2,
    school: "Sekolah Kebangsaan Wawasan",
    resource: "Tablet",
    type: "Import",
    status: "Processing",
    quantity: 100,
    requestdate: "18/09/2023",
    lastupdated: "19/09/2023",
  },
  {
    id: 3,
    school: "Sekolah Kebangsaan Wawasan",
    resource: "Tablet",
    type: "Export",
    status: "Transporting",
    quantity: 100,
    requestdate: "18/09/2023",
    lastupdated: "19/09/2023",
  },
  {
    id: 4,
    school: "Sekolah Kebangsaan Wawasan",
    resource: "Tablet",
    type: "Import",
    status: "Completed",
    quantity: 100,
    requestdate: "18/09/2023",
    lastupdated: "19/09/2023",
  },
  {
    id: 5,
    school: "Sekolah Kebangsaan Wawasan",
    resource: "Tablet",
    type: "Import",
    status: "Rejected",
    quantity: 100,
    requestdate: "18/09/2023",
    lastupdated: "19/09/2023",
  },
];

const BoldHeader = ({ value }) => {
  return <strong className="text-gray-600">{value}</strong>;
};

function QuickSearchToolbar() {
  return (
    <Box
      className="border-solid border-2"
      sx={{
        m: "1rem auto",
        borderRadius: "4px",
        px: "20px",
        py: "5px",
      }}
    >
      <GridToolbarQuickFilter
        quickFilterParser={(searchInput) =>
          searchInput
            .split(",")
            .map((value) => value.trim())
            .filter((value) => value !== "")
        }
        sx={{
          width: "500px",
        }}
      />
    </Box>
  );
}

export default function DataTable() {
  const [dataRows, setDataRows] = useState(rows);

  const handleDoneIconClick = (row) => {
    if (row.status === "Pending") {
      // Update from Pending to Processing
      row.status = "Processing";
    } else if (row.status === "Processing") {
      // Update from Processing to Transporting
      row.status = "Transporting";
    } else if (row.status === "Transporting") {
      // Update from Transporting to Completed
      row.status = "Completed";
    }
    // Create a copy of the dataRows to trigger a state update
    const updatedDataRows = [...dataRows];
    setDataRows(updatedDataRows);
  };

  const handleCloseIconClick = (row) => {
    // Always update to Rejected
    row.status = "Rejected";
    // Create a copy of the dataRows to trigger a state update
    const updatedDataRows = [...dataRows];
    setDataRows(updatedDataRows);
  };

  const renderCellType = ({ row }) => {
    return (
      <span
        className={`py-1 w-[80px] rounded-[4.94px] text-center ${
          row.type === "Export"
            ? "text-[#FF2E9F] bg-[#FF7CCB]/[.47]"
            : "text-[#2E42FF] bg-[#7C89FF]/[.47]"
        }`}
      >
        {row.type}
      </span>
    );
  };

  const renderActionButton = ({ row }) => {
    return (
      <div className="flex gap-2">
        {/* <DoneIcon className="text-[#03A400] hover:bg-[#D0FFCF] hover:cursor-pointer rounded-[5px]" /> */}
        <DoneIcon
          className={`${
            row.status === "Rejected" || row.status === "Completed"
              ? "text-[#000000]/[.50]"
              : "text-[#03A400] hover:bg-[#D0FFCF] hover:cursor-pointer rounded-[5px]"
          }`}
          onClick={
            row.status === "Rejected" || row.status === "Completed"
              ? undefined
              : () => handleDoneIconClick(row)
          }
        />
        <CloseIcon
          className={`${
            row.status === "Rejected" || row.status === "Completed"
              ? "text-[#000000]/[.50]"
              : "text-[#C00000] hover:bg-[#FFCBCB] hover:cursor-pointer rounded-[5px]"
          }`}
          onClick={
            row.status === "Rejected" || row.status === "Completed"
              ? undefined
              : () => handleCloseIconClick(row)
          }
        />
      </div>
    );
  };

  const renderCellStatus = ({ row }) => {
    return (
      <span
        className={`flex justify-center items-center gap-2 py-1 px-4 rounded-[4.94px] text-center ${
          row.status === "Pending" ? "text-[#FF8A00] bg-[#FFC47E]/[.47]" : ""
        } ${
          row.status === "Processing" ? "text-[#FF5C00] bg-[#FFAB7C]/[.47]" : ""
        } ${
          row.status === "Transporting"
            ? "text-[#8F00FF] bg-[#C77EFF]/[.47]"
            : ""
        } ${
          row.status === "Completed" ? "text-[#00DE0A] bg-[#7CFF82]/[.47]" : ""
        } ${
          row.status === "Rejected" ? "text-[#FF0000] bg-[#FF7C7C]/[.47]" : ""
        }`}
      >
        <CircleIcon sx={{ fontSize: "8px" }} /> {row.status}
      </span>
    );
  };

  const columns = [
    {
      field: "school",
      headerName: "School",
      width: 400,
      // width: "25%",
      headerAlign: "center",
      // align: "center",
      renderHeader: () => <BoldHeader value="School" />,
    },
    {
      field: "resource",
      headerName: "Resource",
      width: 150,
      // width: "12.5%",
      headerAlign: "center",
      align: "center",
      renderHeader: () => <BoldHeader value="Resource" />,
    },
    {
      field: "type",
      headerName: "Type",
      width: 150,
      // width: "12.5%",
      headerAlign: "center",
      align: "center",
      renderHeader: () => <BoldHeader value="Type" />,
      renderCell: renderCellType,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      // width: "12.5%",
      headerAlign: "center",
      align: "center",
      renderHeader: () => <BoldHeader value="Status" />,
      renderCell: renderCellStatus,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      width: 130,
      // width: "12.5%",
      headerAlign: "center",
      align: "center",
      renderHeader: () => <BoldHeader value="Quantity" />,
    },
    {
      field: "requestdate",
      headerName: "Request Date",
      width: 150,
      // width: "12.5%",
      headerAlign: "center",
      align: "center",
      renderHeader: () => <BoldHeader value="Request Date" />,
    },
    {
      field: "lastupdated",
      headerName: "Last Updated",
      width: 150,
      // width: "12.5%",
      headerAlign: "center",
      align: "center",
      renderHeader: () => <BoldHeader value="Last Updated" />,
    },
    {
      field: "action",
      headerName: "Action",
      width: 130,
      // width: "12.5%",
      valueGetter: (params) => `${params.row.id || ""}`,
      headerAlign: "center",
      align: "center",
      renderHeader: () => <BoldHeader value="" />,
      renderCell: renderActionButton,
    },
  ];

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
        slots={{ toolbar: QuickSearchToolbar }}
      />
    </div>
  );
}
