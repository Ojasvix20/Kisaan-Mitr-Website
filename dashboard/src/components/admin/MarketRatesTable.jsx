import { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import EditCropDialog from "./EditCropDialog";

function MarketRatesTable() {
  const [rows, setRows] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);

  const [selectedCrop, setSelectedCrop] = useState(null);

  useEffect(() => {
    fetchRates();
  }, []);

  const handleEdit = (crop) => {
    setSelectedCrop(crop);
    setOpenEdit(true);
  };

  const deleteCrop = async (crop) => {
    const confirmDelete = window.confirm(`Delete ${crop}?`);

    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/api/market/${crop}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        alert("Failed to delete crop.");
        return;
      }

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRates = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/market");

      const data = await response.json();

      const formattedRows = data.map((item) => ({
        id: item._id,
        crop: item.crop,
        price: item.price,
        unit: item.unit,
      }));

      setRows(formattedRows);
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    {
      field: "crop",
      headerName: "Crop",
      flex: 1,
    },

    {
      field: "price",
      headerName: "Price (₹)",
      flex: 1,
    },

    {
      field: "unit",
      headerName: "Unit",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 140,

      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>

          <IconButton color="error" onClick={() => deleteCrop(params.row.crop)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Paper
      sx={{
        height: 500,
        width: "100%",
      }}
    >
      <DataGrid rows={rows} columns={columns} pageSizeOptions={[5, 10]} />
      <EditCropDialog
        open={openEdit}
        handleClose={() => setOpenEdit(false)}
        selectedCrop={selectedCrop}
      />
    </Paper>
  );
}

export default MarketRatesTable;
