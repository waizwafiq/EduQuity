import * as React from "react";
import { useState, useEffect } from "react";
import supabaseClient from "../pages/utils/supabase";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import CircleIcon from "@mui/icons-material/Circle";
import Box from "@mui/material/Box";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

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
  const [dataRows, setDataRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    //Get resource table
    const { data: resourceType, error: err } = await supabaseClient
      .from("resource_type")
      .select("*");

    if (err) {
      console.error("Error fetching requests:", err);
      return;
    }

    //Get school table
    const { data: schoolNameObj, error: errSchool } = await supabaseClient
      .from("school")
      .select("*");

    if (errSchool) {
      console.error("Error fetching requests:", errSchool);
      return;
    }

    //Get school_id associated with user
    const { data: userData } = await supabaseClient.auth.getUser();

    const schoolId = userData?.user.id;

    const totalRows = [];

    //Get request_log for user (from_school)
    const { data: requestData, error: requestError } = await supabaseClient
      .from("request_log")
      .select("*")
      .eq("from_school", schoolId);

    if (requestError) {
      console.error("Error fetching requests:", requestError);
      return;
    }

    totalRows.push(...requestData);

    //Get request_log for user (to_school)
    const { data: requestData2, error: requestError2 } = await supabaseClient
      .from("request_log")
      .select("*")
      .eq("to_school", schoolId);

    if (requestError2) {
      console.error("Error fetching requests:", requestError2);
      return;
    }

    totalRows.push(...requestData2);

    const fetchedRows = [];

    totalRows.forEach((row) => {
      const resource = resourceType.find((item) => item.id === row.resource);
      const getSchoolName = (schoolID) => {
        return schoolNameObj.find((item) => item.real_uuid === schoolID).name;
      };

      const schoolName = () => {
        return schoolId === row.from_school
          ? getSchoolName(row.to_school)
          : getSchoolName(row.from_school);
      };

      const getType = schoolId === row.from_school ? "Export" : "Import";

      fetchedRows.push({
        id: row.id,
        school: schoolName(),
        resource: resource.name,
        type: getType,
        status: row.status,
        quantity: row.quantity,
        requestdate: row.request_date,
        lastupdated: row.last_updated,
      });

      // Sort fetchedRows by lastupdated in descending order (latest to oldest)
      fetchedRows.sort(
        (a, b) => new Date(b.lastupdated) - new Date(a.lastupdated)
      );
    });
    setDataRows(fetchedRows);
    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateRequest = async (row, status) => {
    const { error } = await supabaseClient
      .from("request_log")
      .update({ status: status })
      .eq("id", row.id);

    if (error) {
      console.error("Error updating data:", error);
      return;
    }
  };

  const handleDoneIconClick = (row) => {
    if (row.status === "Pending") {
      // Update from Pending to Processing
      updateRequest(row, "Processing");
      row.status = "Processing";
    } else if (row.status === "Processing") {
      // Update from Processing to Transporting
      updateRequest(row, "Transporting");
      row.status = "Transporting";
    } else if (row.status === "Transporting") {
      // Update from Transporting to Completed
      updateRequest(row, "Completed");
      row.status = "Completed";
    }
    // Create a copy of the dataRows to trigger a state update
    const updatedDataRows = [...dataRows];
    setDataRows(updatedDataRows);
  };

  const handleCloseIconClick = (row) => {
    // Always update to Rejected
    updateRequest(row, "Rejected");
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
        rows={dataRows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
        slots={{ toolbar: QuickSearchToolbar }}
        loading={loading}
      />
    </div>
  );
}
