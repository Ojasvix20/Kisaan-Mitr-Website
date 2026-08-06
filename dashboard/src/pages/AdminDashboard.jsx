import { Box, Typography, Button } from "@mui/material";
import MarketRatesTable from "../components/admin/MarketRatesTable";
import { useState } from "react";
import AddCropDialog from "../components/admin/AddCropDialog";


function AdminDashboard() {
  const [open, setOpen] = useState(false);
  
  return (
    <Box
      sx={{
        p: 4,
        mt: 12,
        mx: 6,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h3" color="white" sx={{ fontWeight: "bold" }}>
          🌱 Kisaan Mitr Admin Dashboard
        </Typography>
        <Button
          variant="contained"
          color="success"
          onClick={() => setOpen(true)}
        >
          + Add Crop
        </Button>
      </Box>

      <MarketRatesTable />
      <AddCropDialog
        open={open}
        handleClose={() => setOpen(false)}
        onCropAdded={() => {
          // We'll connect this next
        }}
      />
    </Box>
  );
}

export default AdminDashboard;
